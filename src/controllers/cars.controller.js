import Car from "../models/car.js";

// GET: Obtener todos los coches desde MongoDB
export const getAllCars = async (req, res) => {
  try {
    const allCars = await Car.find();
    res.json(allCars);
  } catch (error) {
    console.error("❌ Error al obtener coches:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// GET: Obtener coche por ID real desde MongoDB
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Coche no encontrado" });
    }
    res.json(car);
  } catch (error) {
    console.error("❌ Error al obtener coche por ID:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// POST: Crear coche sin imagen
export const createCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      mileage,
      fuel_type,
      transmission,
      location
    } = req.body;

    const seller_id = req.user.id;

    const newCar = new Car({
      brand,
      model,
      year,
      price,
      mileage,
      fuel_type,
      transmission,
      location,
      seller_id
    });

    await newCar.save();
    res.status(201).json({ message: "Coche creado correctamente", car: newCar });
  } catch (error) {
    console.error("❌ Error al crear coche:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// POST: Crear coche con imagen
export const uploadCarWithImage = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      mileage,
      fuel_type,
      transmission,
      location
    } = req.body;

    const seller_id = req.user.id;
    const image = req.file ? req.file.filename : null;

    const newCar = new Car({
      brand,
      model,
      year,
      price,
      mileage,
      fuel_type,
      transmission,
      location,
      seller_id,
      image
    });

    await newCar.save();
    res.status(201).json({ message: "Coche creado con imagen", car: newCar });
  } catch (error) {
    console.error("❌ Error al crear coche con imagen:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// PUT: Actualizar coche
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Coche no encontrado" });

    if (car.seller_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "No autorizado para modificar este coche" });
    }

    Object.assign(car, req.body);
    await car.save();
    res.json({ message: "Coche actualizado", car });
  } catch (error) {
    console.error("❌ Error al actualizar coche:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// DELETE: Eliminar coche
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Coche no encontrado" });

    if (car.seller_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "No autorizado para eliminar este coche" });
    }

    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Coche eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar coche:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
