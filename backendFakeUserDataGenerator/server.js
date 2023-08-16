const express = require('express');
const cors = require('cors');
const userService = require('./user.service');


const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/generateUserData', (req, res) => {
  const { seed, lang,count } = req.query;
  const userData = userService.generateUserData(parseInt(seed), lang,parseInt(count));
  res.json(userData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
