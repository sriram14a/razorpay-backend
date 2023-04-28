import { client } from "./index.js";
import bcrypt from "bcrypt";

export async function getProducts(req) {
  return await client
    .db("datas")
    .collection("products")
    .find(req.query)
    .toArray();
}

// export async function getCart(req) {
//     return await client
//       .db("datas")
//       .collection("cart")
//       .find(req.query)
//       .toArray();
//   }

  export async function deletecart(id) {
    return await client
      .db("datas")
      .collection("cart")
      .deleteOne({id:id})
  }

export async function createItem(email,image,id,name,rating,price) {
    
  return await client.db("datas").collection("cart").insertOne({
    email:email,
    image:image,
    name:name,
    rating:rating,
    price:price,
    id:id
  });
}


//user details
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function updatePassword(email, hashedPassword) {
  return await client
    .db("datas")
    .collection("user")
    .updateOne({ email: email }, { $set: { password: hashedPassword } });
}



export async function createUser(firstname, lastname, email, hashedPassword) {
  return await client.db("datas").collection("user").insertOne({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });
}

export async function getUserByName(email) {
  return await client
    .db("datas")
    .collection("user")
    .findOne({ email: email });
}

export async function getUserById(email) {
  
  return await client
    .db("datas")
    .collection("user")
    .find({ email })
    .toArray();
}

export async function getUserByIdcart(email) {
  
  return await client
    .db("datas")
    .collection("cart")
    .find({ email })
    .toArray();
}
