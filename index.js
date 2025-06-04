import "dotenv/config";
import linebot from "linebot";
import giphy from "./commands/giphy.js";
import quickReply from "./commands/quickReply.js";
import unsplash from "./commands/unsplash.js";

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on("message", async (event) => {
  if (event.message.type === "text") {
    await quickReply(event);
  } else if (event.type !== "message" || event.message.type !== "text")
    return null;
});

bot.on("postback", async (event) => {
  const data = event.postback.data;
  console.log(data);
  if (data.startsWith("type=gif,")) {
    await giphy(event);
  } else if (data.startsWith("type=image,")) {
    await unsplash(event);
  }
});

bot.listen("/", process.env.PORT || 3000, () => {
  console.log("linebot is running");
});
