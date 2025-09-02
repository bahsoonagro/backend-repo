import DispatchDelivery from "../models/DispatchDelivery.js"; // adjust path if needed

// Get all dispatches
export async function getDispatches(req, res) {
  try {
    const dispatches = await DispatchDelivery.find().sort({ date: -1 });
    res.status(200).json(dispatches);
  } catch (error) {
    console.error("Error fetching dispatch deliveries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a single dispatch by ID
export async function getDispatchById(req, res) {
  try {
    const { id } = req.params;
    const dispatch = await DispatchDelivery.findById(id);

    if (!dispatch) {
      return res.status(404).json({ error: "Dispatch not found" });
    }

    res.status(200).json(dispatch);
  } catch (error) {
    console.error("Error fetching dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new dispatch
export async function createDispatch(req, res) {
  try {
    const {
      item,
      quantity,
      date,
      customer,
      driver,
      vehicle,
      tollFee = 0,
      fuelCost = 0,
      perDiem = 0,
      personnel = [],
      totalCost = 0,
      remarks = "",
    } = req.body;

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
      tollFee,
      fuelCost,
      perDiem,
      personnel,
      totalCost,
      remarks,
    });

    await newDispatch.save();
    res.status(201).json(newDispatch);
  } catch (error) {
    console.error("Error adding dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing dispatch
export async function updateDispatch(req, res) {
  try {
    const { id } = req.params;

    const updatedDispatch = await DispatchDelivery.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDispatch) {
      return res.status(404).json({ error: "Dispatch not found" });
    }

    res.status(200).json(updatedDispatch);
  } catch (error) {
    console.error("Error updating dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a dispatch
export async function deleteDispatch(req, res) {
  try {
    const { id } = req.params;

    const deletedDispatch = await DispatchDelivery.findByIdAndDelete(id);

    if (!deletedDispatch) {
      return res.status(404).json({ error: "Dispatch not found" });
    }

    res.status(200).json({ message: "Dispatch deleted successfully" });
  } catch (error) {
    console.error("Error deleting dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
