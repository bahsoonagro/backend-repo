
// controllers/finishedProductController.js
import FinishedProduct from "../models/FinishedProduct.js";

// @desc   Create a new finished product
// @route  POST /api/finished-products
export const createFinishedProduct = async (req, res) => {
  try {
    const finishedProduct = new FinishedProduct(req.body);
    await finishedProduct.save();
    res.status(201).json(finishedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all finished products
// @route  GET /api/finished-products
export const getFinishedProducts = async (req, res) => {
  try {
    const products = await FinishedProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a single finished product
// @route  GET /api/finished-products/:id
export const getFinishedProductById = async (req, res) => {
  try {
    const product = await FinishedProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update a finished product
// @route  PUT /api/finished-products/:id
export const updateFinishedProduct = async (req, res) => {
  try {
    const product = await FinishedProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Delete a finished product
// @route  DELETE /api/finished-products/:id
export const deleteFinishedProduct = async (req, res) => {
  try {
    const product = await FinishedProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
