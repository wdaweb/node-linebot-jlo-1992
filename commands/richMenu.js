import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import env from "env";
import "dotenv/config";

const richMenuData = {
  size: {
    width: 2500,
    height: 1686,
  },
  selected: true,
  name: "main_menu",
  chatBarText: "打開選單",
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 2500,
        height: 800,
      },
      action: {
        type: "message",
        text: "搜尋GIF",
      },
    },
    {
      bounds: {
        x: 0,
        y: 800,
        width: 833,
        height: 886,
      },
      action: {
        type: "message",
        text: "本週爆紅GIF",
      },
    },
    {
      bounds: {
        x: 833,
        y: 800,
        width: 834,
        height: 886,
      },
      action: {
        type: "message",
        text: "主題GIF",
      },
    },
    {
      bounds: {
        x: 1667,
        y: 800,
        width: 833,
        height: 886,
      },
      action: {
        type: "message",
        text: "心情GIF",
      },
    },
  ],
};

async function createRichMenu() {
  try {
    const res = await axios.post(
      "https://api.line.me/v2/bot/richmenu",
      richMenuData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    const richMenuId = res.data.richMenuId;
    console.log("✅ Rich Menu Created:", richMenuId);
  } catch (error) {
    console.error("❌ 發生錯誤：", error.response?.data || error.message);
  }
}
