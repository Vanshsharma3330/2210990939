// question1/src/controllers/analyticsController.js
const { fetchTopUsers, fetchPosts } = require('../services/analyticsService');

/**
 * GET /users - Top 5 users by comment count
 */
async function getTopUsers(req, res) {
  try {
    const users = await fetchTopUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

/**
 * GET /posts - Posts by type
 */
async function getPosts(req, res) {
  const { type } = req.query;
  if (!['popular', 'latest'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type parameter' });
  }
  try {
    const posts = await fetchPosts(type);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

module.exports = { getTopUsers, getPosts };