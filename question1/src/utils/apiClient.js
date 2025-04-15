// question1/src/utils/apiClient.js

/**
 * Mock data simulating test server responses
 */
const mockUsers = {
    users: {
      "1": "John Doe",
      "2": "Jane Doe",
      "3": "Alice Smith",
      "4": "Bob Johnson",
      "5": "Charlie Brown",
      "6": "Diana White",
      "7": "Edward Davis",
      "8": "Fiona Miller",
      "9": "George Wilson",
      "10": "Helen Moore"
    }
  };
  
  const mockPosts = {
    "1": [
      { id: "101", userid: "1", content: "Exploring the mountains!" },
      { id: "102", userid: "1", content: "New tech trends" },
      { id: "103", userid: "1", content: "Coffee time" }
    ],
    "2": [
      { id: "201", userid: "2", content: "Beach vibes" },
      { id: "202", userid: "2", content: "Book review" }
    ],
    "3": [
      { id: "301", userid: "3", content: "City lights" },
      { id: "302", userid: "3", content: "Art gallery visit" },
      { id: "303", userid: "3", content: "Morning run" },
      { id: "304", userid: "3", content: "Coding session" }
    ],
    "4": [{ id: "401", userid: "4", content: "Gaming night" }],
    "5": [
      { id: "501", userid: "5", content: "Music festival" },
      { id: "502", userid: "5", content: "Travel plans" }
    ],
    "6": [{ id: "601", userid: "6", content: "Yoga retreat" }],
    "7": [
      { id: "701", userid: "7", content: "Science talk" },
      { id: "702", userid: "7", content: "Photography tips" }
    ],
    "8": [{ id: "801", userid: "8", content: "Foodie adventures" }],
    "9": [
      { id: "901", userid: "9", content: "Startup ideas" },
      { id: "902", userid: "9", content: "Nature hike" }
    ],
    "10": [{ id: "1001", userid: "10", content: "Movie night" }]
  };
  
  const mockComments = {
    "101": [
      { id: "c1011", postid: "101", content: "Amazing view!" },
      { id: "c1012", postid: "101", content: "Love this!" }
    ],
    "102": [
      { id: "c1021", postid: "102", content: "Interesting!" },
      { id: "c1022", postid: "102", content: "Thanks for sharing" },
      { id: "c1023", postid: "102", content: "Cool stuff" }
    ],
    "103": [{ id: "c1031", postid: "103", content: "Nice!" }],
    "201": [{ id: "c2011", postid: "201", content: "Looks fun!" }],
    "202": [],
    "301": [
      { id: "c3011", postid: "301", content: "Beautiful!" },
      { id: "c3012", postid: "301", content: "Wow!" },
      { id: "c3013", postid: "301", content: "Stunning" },
      { id: "c3014", postid: "301", content: "Great shot" }
    ],
    "302": [{ id: "c3021", postid: "302", content: "Inspiring" }],
    "303": [],
    "304": [{ id: "c3041", postid: "304", content: "Keep it up!" }],
    "401": [
      { id: "c4011", postid: "401", content: "Epic!" },
      { id: "c4012", postid: "401", content: "What game?" }
    ],
    "501": [
      { id: "c5011", postid: "501", content: "Awesome!" },
      { id: "c5012", postid: "501", content: "Wish I was there" }
    ],
    "502": [],
    "601": [{ id: "c6011", postid: "601", content: "So relaxing" }],
    "701": [
      { id: "c7011", postid: "701", content: "Mind-blowing!" },
      { id: "c7012", postid: "701", content: "Learned a lot" }
    ],
    "702": [],
    "801": [
      { id: "c8011", postid: "801", content: "Yummy!" },
      { id: "c8012", postid: "801", content: "Recipe please!" },
      { id: "c8013", postid: "801", content: "Looks delicious" }
    ],
    "901": [{ id: "c9011", postid: "901", content: "Great ideas!" }],
    "902": [],
    "1001": [
      { id: "c10011", postid: "1001", content: "What movie?" },
      { id: "c10012", postid: "1001", content: "Fun!" }
    ]
  };
  
  /**
   * Mock fetch data from test server
   * @param {string} endpoint - API endpoint
   * @returns {Promise<Object>} - Mock response data
   */
  async function get(endpoint) {
    try {
      if (endpoint === '/users') {
        return mockUsers;
      }
      const userMatch = endpoint.match(/\/users\/(\d+)\/posts/);
      if (userMatch) {
        const userId = userMatch[1];
        return { posts: mockPosts[userId] || [] };
      }
      const postMatch = endpoint.match(/\/posts\/(\d+)\/comments/);
      if (postMatch) {
        const postId = postMatch[1];
        return { comments: mockComments[postId] || [] };
      }
      throw new Error('Invalid endpoint');
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      throw new Error(`Failed to fetch ${endpoint}`);
    }
  }
  
  module.exports = { get };