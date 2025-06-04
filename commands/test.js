require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { Client, middleware } = require("@line/bot-sdk");

const app = express();
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const lineClient = new Client(config);

app.post("/webhook", middleware(config), async (req, res) => {
  const events = req.body.events;
  const results = await Promise.all(events.map(handleEvent));
  res.json(results);
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") return null;

  const keyword = event.message.text;

  try {
    // 呼叫 GIPHY API
    const gifRes = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.GIPHY_API_KEY,
        q: keyword,
        limit: 1,
        rating: "g",
      },
    });

    const gifUrl = gifRes.data.data[0]?.images?.original?.url;

    if (!gifUrl) {
      return lineClient.replyMessage(event.replyToken, {
        type: "text",
        text: `找不到和「${keyword}」相關的 GIF 😢`,
      });
    }

    return lineClient.replyMessage(event.replyToken, {
      type: "image",
      originalContentUrl: gifUrl,
      previewImageUrl: gifUrl,
    });
  } catch (err) {
    console.error(err);
    return lineClient.replyMessage(event.replyToken, {
      type: "text",
      text: "搜尋失敗，請稍後再試 😢",
    });
  }
}

app.listen(process.env.PORT || 3000, () => {
  console.log("LINE Bot is running");
});
