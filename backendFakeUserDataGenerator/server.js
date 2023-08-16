const express = require('express');
const cors = require('cors');
const userService = require('./user.service');


const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/generateUserData', (req, res) => {
  const lang = req.query.lang || 'en';
  const userData = userService.generateUserData(lang);
  res.json(userData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
