const express = require('express');
const router = express.Router();
const House = require('../models/HouseModel');

router.get('/', async (req, res) => {
  const houses = await House.find();
  res.json(houses);
});

module.exports = router;
