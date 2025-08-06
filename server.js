const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Anita.html'));
});

// API routes for dynamic content
app.get('/api/content', (req, res) => {
  const content = [
    {
      type: 'message',
      text: 'My dearest love, every moment with you is a treasure I hold close to my heart.',
      image: null
    },
    {
      type: 'photo',
      text: 'Remember this beautiful sunset we watched together?',
      image: '/Anita/ph1.jpg'
    },
    {
      type: 'message',
      text: 'Your smile lights up my world like nothing else ever could.',
      image: null
    },
    {
      type: 'photo',
      text: 'This silly face you make always makes my day brighter!',
      image: '/Anita/ph2.jpg'
    },
    {
      type: 'message',
      text: 'I love how we can sit in silence and feel completely comfortable together.',
      image: null
    },
    {
      type: 'photo',
      text: 'Our mountain adventure - one of my favorite memories with you!',
      image: '/Anita/ph3.jpg'
    },
    {
      type: 'message',
      text: 'You are my everything, my today, my tomorrow, and my forever. ❤️',
      image: null
    }
  ];
  res.json(content);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
