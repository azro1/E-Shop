import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { listProducts, addToCart } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductsList() {
  const { user } = useOutletContext();
  const [data, setData] = useState({ items: [] });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDemographic, setSelectedDemographic] = useState('All');
  const [q, setQ] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const navigationCategories = {
    'All': ['All Products'],
    'Men': ['Clothing', 'Footwear', 'Accessories'],
    'Women': ['Clothing', 'Footwear', 'Accessories'],
    'Kids': ['Clothing', 'Footwear', 'Accessories'],
    'Electronics': ['Phones', 'Laptops', 'Headphones', 'TVs'],
    'Home & Garden': ['Furniture', 'Kitchen', 'Garden'],
    'Health & Beauty': ['Skincare', 'Makeup', 'Haircare', 'Fragrances'],
    'Sports & Outdoors': ['Fitness', 'Outdoor', 'Camping']
  };
  
  useEffect(() => { 
    listProducts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  
  useEffect(() => {
    if (data.items.length > 0) {
      filterProducts();
    }
  }, [data, selectedCategory, selectedDemographic, q]);
  
  const filterProducts = () => {
    let filtered = data.items;
    
    // Filter by product category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.productCategory === selectedCategory);
    }
    
    // Filter by demographic
    if (selectedDemographic !== 'All') {
      filtered = filtered.filter(product => product.demographic === selectedDemographic);
    }
    
    // Filter by search query
    if (q.trim()) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(q.toLowerCase()) ||
        product.description.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  const search = async (e) => { 
    e.preventDefault(); 
    if (!q.trim()) return;
    
    setSearchLoading(true);
    setHasSearched(true);
    try {
      const results = await listProducts(q);
      setData(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = async () => {
    setQ('');
    setHasSearched(false);
    setSearchLoading(true);
    try {
      const results = await listProducts();
      setData(results);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNavigationSelect = (demographic, category) => {
    if (demographic === 'All') {
      setSelectedDemographic('All');
      setSelectedCategory('All');
    } else if (['Electronics', 'Home & Garden', 'Health & Beauty', 'Sports & Outdoors'].includes(demographic)) {
      // For product categories, only filter by category, not demographic
      setSelectedDemographic('All');
      setSelectedCategory(category);
    } else {
      // For demographic categories (Men, Women, Kids), filter by both
      setSelectedDemographic(demographic);
      setSelectedCategory(category);
    }
    setHasSearched(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Browse our collection of premium products and great deals</p>
      </div>
      
      <div className="categories-filter">
        {Object.entries(navigationCategories).map(([demographic, categories]) => (
          <div key={demographic} className="category-group">
            {demographic === 'All' ? (
              <button
                onClick={() => handleNavigationSelect('All', 'All')}
                className={`category-btn-main ${selectedCategory === 'All' && selectedDemographic === 'All' ? 'active' : ''}`}
              >
                {demographic}
              </button>
            ) : (
              <>
                <h3 className={selectedDemographic === demographic ? 'active' : ''}>{demographic}</h3>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleNavigationSelect(demographic, category)}
                      className={`category-btn ${selectedCategory === category && selectedDemographic === demographic ? 'active' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={search} className="search">
        <div className="search-input-wrapper">
          <input 
            value={q} 
            onChange={e => setQ(e.target.value)} 
            placeholder="Search products..." 
          />
          {q && (
            <button 
              type="button" 
              onClick={clearSearch} 
              className="search-clear-btn"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit">
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {hasSearched && filteredProducts.length === 0 ? (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search terms or browse all products.</p>
          <button onClick={clearSearch} className="btn btn-primary">
            View All Products
          </button>
        </div>
      ) : hasSearched && filteredProducts.length > 0 ? (
        <>
          <div className="search-results">
            <p>Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{q}"</p>
          </div>
          <div className="grid">
            {filteredProducts.map(p => (
              <ProductCard key={p._id} p={p} onAdd={addToCart} user={user} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid products-grid">
          {filteredProducts.map(p => (
            <ProductCard key={p._id} p={p} onAdd={addToCart} user={user} />
          ))}
        </div>
      )}
    </>
  );
}
