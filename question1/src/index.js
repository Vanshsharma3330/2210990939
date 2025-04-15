// question1/src/index.js
const express = require('express');
const cors = require('cors');  // <--- Add this line
const { getTopUsers, getPosts } = require('./controllers/analyticsController');

const app = express();

app.use(cors());               // <--- Allow cross-origin requests
app.use(express.json());

// Root route for debugging
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Social Media Analytics API' });
});

app.get('/users', getTopUsers);
app.get('/posts', getPosts);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
