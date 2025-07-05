const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
  try {
    const msg = req.body.message;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: msg }]
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('✅ Wasiq AI Proxy running...'));
