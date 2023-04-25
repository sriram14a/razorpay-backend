import { client } from "./index.js";

export async function getProducts(req) {
  return await client
    .db("datas")
    .collection("products")
    .find(req.query)
    .toArray();
}

export async function getCart(req) {
    return await client
      .db("datas")
      .collection("cart")
      .find(req.query)
      .toArray();
  }

  export async function deletecart(id) {
    return await client
      .db("datas")
      .collection("cart")
      .deleteOne({id:id})
  }

export async function createItem(image,name,rating,price,id) {
    
  return await client.db("datas").collection("cart").insertOne({
    image:image,
    name:name,
    rating:rating,
    price:price,
    id:id
  });
}
