import axios from "axios";

export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${title}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
