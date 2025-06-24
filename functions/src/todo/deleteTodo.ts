import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/firestore";

export const deleteTodo = onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send({ error: "Document ID is required" });
      return;
    }
    await db.collection("todos").doc(id as string).delete();
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete todo" });
  }
});