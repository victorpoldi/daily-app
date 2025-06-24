import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/firestore";

export const createTodo = onRequest(async (req, res) => {
  const allowedOrigins = [
    "https://daily-app-backend--todo-list-2ad13.us-central1.hosted.app", // Production
    "http://localhost:3000", // Development
  ];

  const origin = req.headers.origin || ""; // Get the origin from the request headers

  if (allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin); // Set the origin to the actual origin if it is in the allowedOrigins array.
  } else {
    // If the origin is not in the allowedOrigins array, do not set the header.
    // This will cause the request to fail.
    console.error(`CORS error: Origin ${origin} is not allowed.`);
    res.status(403).send("CORS error: Origin not allowed");
    return;
  }

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type"); // Add other allowed headers if needed
    res.status(204).send(""); // Respond with no content
    return;
  }

  try {
    const data = req.body; 
    console.log({data});
    const docRef = await db.collection("todos").add(data);
    res.status(201).send({ id: docRef.id, message: "Todo created successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to create todo" });
  }
});
