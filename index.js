require('dotenv').config();
const express = require('express');
const { knex } = require('./db/knex');
const User = require('./models/User');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    // simple DB test using knex pool
    const [{ now }] = await knex.raw('SELECT now()');
    res.json({ status: 'ok', time: now });
  } catch (err) {
    res.status(500).json({ error: 'db connection failed', details: err.message });
  }
});

// Example: list conversations (basic)
app.get('/conversations', async (req, res) => {
  try {
    const items = await Conversation.query().withGraphFetched('members');
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
