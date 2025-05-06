const cars = require("data/cars-data");
const getAllCars = (req, res) => {
    res.json(cars);

    const getCarById = (req, res) => {
     const id = parseInt(req.params.id);
     const car = cars.find((c) => c.id === id);
     if(!car){
        return res.status(404).json({message: "Coche no encontrado"});
     }
        res.json(car);
    };
}

module.exports = {
    getAllCars,
    getCarById
};