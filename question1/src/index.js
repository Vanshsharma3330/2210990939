// question1/src/index.js
const express = require('express');
const { getTopUsers, getPosts } = require('./controllers/analyticsController');

const app = express();
app.use(express.json());

// Debug route for root
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Social Media Analytics API' });
});

app.get('/users', getTopUsers);
app.get('/posts', getPosts);

const PORT = process.env.PORT || 3001; // Changed to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});