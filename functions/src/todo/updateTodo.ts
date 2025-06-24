import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/firestore";

export const updateTodo = onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id) {
      res.status(400).send({ error: "Document ID is required" });
      return;
    }
    await db.collection("todos").doc(id as string).update(data);
    res.status(200).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update todo" });
  }
});