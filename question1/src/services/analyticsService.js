// question1/src/services/analyticsService.js
const { get } = require('../utils/apiClient');

let cache = {
  users: {}, // { userId: { id, name, totalComments, postCount } }
  posts: {}, // { postId: { id, userId, content, commentCount, timestamp } }
  lastUpdated: null
};

/**
 * Fetch and cache data
 */
async function fetchData() {
  try {
    // Fetch users
    const userData = await get('/users');
    const userMap = {};
    Object.entries(userData.users).forEach(([id, name]) => {
      userMap[id] = { id, name, totalComments: 0, postCount: 0 };
    });

    // Fetch posts
    const postMap = {};
    await Promise.all(
      Object.keys(userMap).map(async userId => {
        try {
          const posts = await get(`/users/${userId}/posts`);
          posts.posts.forEach(post => {
            postMap[post.id] = {
              id: post.id,
              userId: post.userid,
              content: post.content,
              commentCount: 0,
              timestamp: new Date() // Mock timestamp
            };
            userMap[userId].postCount += 1;
          });
        } catch (error) {
          console.error(`Error fetching posts for user ${userId}`);
        }
      })
    );

    // Fetch comments
    await Promise.all(
      Object.keys(postMap).map(async postId => {
        try {
          const comments = await get(`/posts/${postId}/comments`);
          const commentCount = comments.comments.length;
          postMap[postId].commentCount = commentCount;
          userMap[postMap[postId].userId].totalComments += commentCount;
        } catch (error) {
          console.error(`Error fetching comments for post ${postId}`);
        }
      })
    );

    cache = { users: userMap, posts: postMap, lastUpdated: Date.now() };
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

/**
 * Get top 5 users by comment count
 * @returns {Promise<Array>}
 */
async function fetchTopUsers() {
  if (!cache.lastUpdated || Date.now() - cache.lastUpdated > 60000) {
    await fetchData();
  }
  return Object.values(cache.users)
    .sort((a, b) => b.totalComments - a.totalComments)
    .slice(0, 5)
    .map(user => ({
      id: user.id,
      name: user.name,
      totalComments: user.totalComments,
      postCount: user.postCount
    }));
}

/**
 * Get posts by type
 * @param {string} type - 'popular' or 'latest'
 * @returns {Promise<Array>}
 */
async function fetchPosts(type) {
  if (!cache.lastUpdated || Date.now() - cache.lastUpdated > 60000) {
    await fetchData();
  }
  const posts = Object.values(cache.posts);
  if (type === 'popular') {
    const maxComments = Math.max(...posts.map(p => p.commentCount), 0);
    return posts
      .filter(p => p.commentCount === maxComments)
      .map(post => ({
        id: post.id,
        userId: post.userId,
        content: post.content,
        commentCount: post.commentCount,
        timestamp: post.timestamp
      }));
  }
  return posts
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
    .map(post => ({
      id: post.id,
      userId: post.userId,
      content: post.content,
      commentCount: post.commentCount,
      timestamp: post.timestamp
    }));
}

module.exports = { fetchTopUsers, fetchPosts };