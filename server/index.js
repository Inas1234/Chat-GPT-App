const express = require("express");
const dotenv = require("dotenv");
const openai = require("openai");
const cors = require("cors");
dotenv.config();
const app = express();
const port = 3000;

const configuration = new openai.Configuration({
  organization: "org-I9PzCwMaNqlvE1g9tXKc136G",
  apiKey: "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",
});

const client = new openai.OpenAIApi(configuration);

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("GETOOO!");
});

app.post("/api", async (req, res) => {
  const input = req.body.message;
  const gptResponse = await client.createCompletion({
    model: "text-davinci-002",
    max_tokens: 4000,
    temperature: 0.5,
    prompt: input.toString(),
  });
  res.send(gptResponse.data.choices[0].text);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
