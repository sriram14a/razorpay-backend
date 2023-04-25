import * as dotenv from "dotenv";
import cors from "cors"
import express from "express";
import { MongoClient } from "mongodb";
import { paymentRouter } from "./routes/payments.js";
import { productRouter } from "./routes/products.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const id = process.env.key_id;
const secret = process.env.secret_key;

async function createConnection() {
  try{const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDb is connected");
    return client;
  }
  catch{
    console.log("MongoDb is not connected");
  }
}

export const client = await createConnection();
app.use(express.json());
app.use(cors());

app.use("/payments", paymentRouter);
app.use("/products", productRouter);


app.get("/", (req, res) => {
  res.send("hi there");
});





app.listen(PORT, () => console.log("Server listening to PORT", PORT));



