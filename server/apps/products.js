import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const name = req.query.name;
  const description = req.query.description;
  const category = req.query.category;

  const query = {
    $or: [],
  };

  if (name) {
    query.$or.push({ name: new RegExp(name, "i") });
  }
  if (description) {
    query.$or.push({ description: new RegExp(description, "i") });
  }
  if (category) {
    query.$or.push({ category: new RegExp(category, "i") });
  }

  const collection = db.collection("products");

  const products = await collection.find(query).limit(10).toArray();

  return res.json({ data: products });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.id);

  const product = await collection.find({ _id: productId }).toArray();

  return res.json({ data: product[0] });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");

  const productData = { ...req.body };
  const products = await collection.insertOne(productData);

  return res.json({
    message: `Product record (${products.insertedId}) has been created successfully`,
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.id);

  const newProductData = { ...req.body };

  await collection.updateOne({ _id: productId }, { $set: newProductData });

  return res.json({
    message: `Product record (${productId} has been updated successfully`,
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.id);

  await collection.deleteOne({ _id: productId });

  return res.json({
    message: `Product has been deleted successfully`,
  });
});

export default productRouter;
