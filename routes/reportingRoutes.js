import express from "express";
import { 
  getRawMaterialStock,
  getFinishedProductStock,
  getCustomerSupply,
  getAllPaperwork
} from "../controllers/reportingController.js";

const router = express.Router();

// Reports
router.get("/raw-material-stock", getRawMaterialStock);
router.get("/finished-product-stock", getFinishedProductStock);
router.get("/customer-supply", getCustomerSupply);
router.get("/paperwork", getAllPaperwork);

export default router;
