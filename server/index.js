const express = require("express");
const dotenv = require("dotenv");
const openai = require("openai");
dotenv.config();
const app = express();
const port = 3000;

const configuration = new openai.Configuration({
  apiKey: "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",
});

const client = new openai.OpenAIApi(configuration);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("GETOOO!");
});

app.post("/api", async (req, res) => {
  const input = req.body.message;
  const gptResponse = await client.createCompletion({
    model: "text-davinci-002",
    max_tokens: 4000,
    prompt: input.toString(),
  });
  res.send(gptResponse.data.choices[0].text);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
