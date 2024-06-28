import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const collection = db.collection("products");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const result = await collection.find({}).toArray();
  return res.status(200).json({ data: result });
});

productRouter.get("/:id", async (req, res) => {});

productRouter.post("/", async (req, res) => {
  const result = await collection.insertOne(req.body);
  return res.status(201).json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const result = await collection.updateOne(
    { _id: productId },
    { $set: req.body }
  );
  return res.status(200).json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: productId });
  return res.status(200).json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
