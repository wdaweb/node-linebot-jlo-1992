import axios from "axios";
import fs from "fs";

export default async function (event) {
  const keyword = event.postback.data.replace("type=image,", "") || "沙灘";
  let imgs = null;
  const messages = [];
  const random = Math.round(Math.random() * (5 - 1) + 1);

  try {
    const img = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: keyword,
        per_page: 10,
        orientation: "landscape",
        client_id: process.env.UNSPLASH_ACCESS_KEY,
        lang: "zh-Hant",
      },
    });
    imgs = img.data?.results;
    imgs.slice(random, random + 3).forEach(async function (item) {
      const image = item?.urls?.small;
      if (image) {
        messages.push({
          type: "image",
          originalContentUrl: image,
          previewImageUrl: image,
        });
      }
    });
    if (imgs.length > 0) {
      event.reply(messages);
    }

    if (imgs.length === 0 || !imgs) {
      return await event.reply({
        type: "text",
        text: `找不到和「${keyword}」相關的圖片 😢`,
      });
    }
  } catch (error) {
    console.error(error);
    await event.reply("發生錯誤");
    if (process.env.DEV === "true") {
      fs.writeFileSync(
        "../dump/unsplash.json",
        JSON.stringify({ imgs, error: error.message }, null, 2)
      );
    }
  }
}
