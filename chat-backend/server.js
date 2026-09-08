const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("Received prompt:", prompt);

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi",
        prompt: prompt,
        stream: false,
      }
    );

    console.log("Ollama response:", response.data);

    res.json({
      response: response.data.response,
    });

  } catch (err) {
    console.error("Error calling Ollama:", err.message);

    res.status(500).json({
      error: "Ollama request failed",
    });
  }
});


/* Health check */
app.get("/health", async (req, res) => {
  try {

    await axios.get("http://localhost:11434/api/tags");

    res.json({
      server: true,
      ollama: true,
    });

  } catch (err) {

    res.status(503).json({
      server: true,
      ollama: false,
    });

  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});