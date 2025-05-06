const express = require('express');
const router = express.Router();
const { getAllCars, getCarById } = require('../controllers/cars.controller.js');

router.get("/",getAllCars);
router.get("/:id",getCarById);

module.exports = router;


