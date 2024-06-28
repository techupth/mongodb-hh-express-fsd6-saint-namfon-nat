import { ObjectId } from "mongodb";
import { Router } from "express";

import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");

  const products = await collection.find().toArray();

  return res.json({
    data: products,
  });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.id);

  const products = await collection.findOne({
    _id: productId,
  });

  return res.json({
    data: products,
  });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  const products = await collection.insertOne(productData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");

  // 3) Update ข้อมูลใน Database โดยใช้ collection.updateOne(query) โดยการ
  // นำ movieId จาก Endpoint parameter มา Assign ลงใน Variable movieId
  // โดยที่ใช้ ObjectId ที่ Import มาจากด้านบน ในการ Convert Type ด้วย
  const productId = new ObjectId(req.params.id);
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า newMovieData
  const newProductData = { ...req.body };

  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: newProductData,
    }
  );

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ movies
  const collection = db.collection("products");

  // 3) Delete ข้อมูลออกจากใน Database โดยใช้ collection.deleteOne(query)
  // นำ movieId จาก Endpoint parameter มา Assign ลงใน Variable movieId
  const productId = new ObjectId(req.params.id);

  await collection.deleteOne({
    _id: productId,
  });

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
