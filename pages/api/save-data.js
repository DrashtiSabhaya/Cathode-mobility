import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../firebase/config";

const firestore = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const docRef = await addDoc(collection(firestore, "contact-data"), data);
      res.status(200).json({ id: docRef.id, ...data });
    } catch (error) {
      res.status(500).json({ error: "Failed to save data" + error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
