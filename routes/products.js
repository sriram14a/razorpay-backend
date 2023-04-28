import express from "express";
import * as dotenv from "dotenv";
import { getProducts,createItem, deletecart, getUserById, getUserByIdcart } from "../controller.js";

dotenv.config();

const router = express.Router();


router.get("/products", async (req, res) => {
  try {
    const products = await getProducts(req);
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});
router.get("/cartitems/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const user = await getUserByIdcart(email);
      console.log(user)
 res.send(user);     
    } catch (err) {
      console.log(err);
    }
  });

router.post("/cart", async (req, res) => {
    const { email,image,id,name,rating,price } = req.body;
    await createItem(email,image,id,name,rating,price);
    res.send({ status: "ok" });
  });

  router.delete("/cart/:id", async (req, res) => {
    const { id } = req.params;
    await deletecart(id);
    res.send({ status: "ok" });
  });

export const productRouter = router;
