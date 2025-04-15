# Question 1: Social Media Analytics Microservice

Backend APIs for social media analytics.

## Features
- GET /users: Top 5 users by comment count.
- GET /posts?type=popular|latest: Top or latest posts.
- Caches data to minimize server calls.

## Setup
1. `npm install`
2. Update `src/utils/apiClient.js` with auth token (currently uses mock data).
3. `npm start`

## Notes
- Uses mock data due to lost access token. Ready to integrate real token when available.

## Screenshots
- In `screenshots/`.