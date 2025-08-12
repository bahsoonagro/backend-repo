// controllers/dispatchDeliveryController.js
import DispatchDelivery from "../models/DispatchDelivery.js";

export async function getDispatches(req, res) {
  try {
    const dispatches = await DispatchDelivery.find().sort({ date: -1 });
    res.json(dispatches);
  } catch (error) {
    console.error("Error fetching dispatch deliveries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createDispatch(req, res) {
  try {
    const { item, quantity, date, customer, driver, vehicle } = req.body;
    if (!item || !quantity || !date || !customer || !driver || !vehicle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newDispatch = new DispatchDelivery({
      item,
      quantity,
      date,
      customer,
      driver,
      vehicle,
    });

    await newDispatch.save();
    res.status(201).json(newDispatch);
  } catch (error) {
    console.error("Error adding dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
