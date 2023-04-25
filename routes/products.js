import express from "express";
import * as dotenv from "dotenv";
import { getProducts,createItem,getCart, deletecart } from "../controller.js";

dotenv.config();

const router = express.Router();


router.get("/products", async (req, res) => {
  try {
    const products = await getProducts(req);
    res.send(products);
    console.log(products)
  } catch (err) {
    console.log(err);
  }
});
router.get("/cartitems", async (req, res) => {
    try {
      const products = await getCart(req);
      res.send(products);
    } catch (err) {
      console.log(err);
    }
  });

router.post("/cart", async (req, res) => {
    const { itemnew } = req.body;
    await createItem(req.body.image,req.body.name,req.body.rating,req.body.price,req.body.id);
    res.send({ status: "ok" });
  });

  router.delete("/cart/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    await deletecart(id);
    res.send({ status: "ok" });
  });

export const productRouter = router;
