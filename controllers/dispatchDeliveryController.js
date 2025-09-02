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
      remarks
    });

    await newDispatch.save();
    res.status(201).json(newDispatch);
  } catch (error) {
    console.error("Error adding dispatch delivery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
