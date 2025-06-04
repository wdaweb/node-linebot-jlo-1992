export default async (event) => {
  await event.reply({
    type: "text",
    text: "請選擇",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "postback",
            data: "type=gif," + event.message.text,
            label: "給我 GIF",
            displayText: "我要 gif 檔",
          },
        },
        {
          type: "action",
          action: {
            type: "postback",
            data: "type=image," + event.message.text,
            label: "給我圖片",
            displayText: "我要圖片",
          },
        },
        // {
        //   type: "action",
        //   action: {
        //     type: "postback",
        //     data: "type=gif",
        //     label: "最熱門",
        //     displayText: "現在最熱門的 gif 檔是什麼？",
        //   },
        // },
      ],
    },
  });
};
