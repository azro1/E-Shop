// Convert a string to a URL-friendly slug
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')          // Trim hyphens from start
    .replace(/-+$/, '');         // Trim hyphens from end
}

// Create a slug from product title and ID
export function createProductSlug(title, id) {
  const slug = slugify(title);
  return `${slug}-${id}`;
}

// Extract ID from slug
export function extractIdFromSlug(slug) {
  const parts = slug.split('-');
  return parts[parts.length - 1]; // Last part is the ID
}
