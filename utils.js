const axios = require('axios');

/**
 * Fetches posts from an external API based on the given limit and offset.
 * @param {number} limit - The number of posts to fetch.
 * @param {number} offset - The starting index for fetching posts.
 * @returns {Promise<Array>} A promise that resolves to an array of processed posts.
 */
async function fetchPosts(limit, offset) {
  try {
    // Validate input
    if (limit <= 0 || offset < 0) {
      throw new Error('Invalid limit or offset');
    }

    // Make API call to fetch all posts
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const allPosts = response.data;

    // Process posts to include only id, title, and body
    const processedPosts = allPosts.map(({ id, title, body }) => ({ id, title, body }));
    console.log(processedPosts);
    // Apply limit and offset
    const startIndex = offset;
    const endIndex = Math.min(offset + limit, processedPosts.length);
    const paginatedPosts = processedPosts.slice(startIndex, endIndex);

    return paginatedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    throw error;
  }
}

module.exports = { fetchPosts };