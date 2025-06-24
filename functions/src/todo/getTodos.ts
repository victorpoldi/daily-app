import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/firestore";

export const getTodos = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("todos").get();
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch todos" });
  }
});