import React, { useEffect, useState } from "react";
import axios from "axios";
import { createDirectus, rest, uploadFiles } from "@directus/sdk";

const client = createDirectus("http://localhost:3000").with(rest());

function MyComponent() {
  const mediaId = 542960348241610;
  const token =
    "EAAWbZB5uXqVABO4jTqX9s5vtzsKkcQTtaEZC0Y09tMyif4jGv3QzbILlLcMCRHEcTzrRVvn2Jf72nk1hYpZB17HELDZAjcLl9FSquNsiDpN3GFTbr1saxavDOhHIr4euRN1Vy5YAQoHYzLbnjnZCoC91ZCmVQJ1ZA4DYr6vbo4UTRmzJcxS4EJalKQF";

  const handleMediaSend = async () => {
    try {
      //1
      const response = await axios.post(
        "http://localhost:3000/mediamessage/mediaMessage",
        {
          mediaId, // sending mediaId in the body
          token, // sending token in the body
        },
        {
          responseType: "blob", // Expecting a file or binary response
        }
      );

      console.log("response", response);
      console.log("response.data", response.data);
      console.log("content type in header", response.headers["content-type"]);
      const title = `title_${new Date().toISOString().replace(/[-:.]/g, "")}`;
      const file = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const fileName = `fileName_${new Date()
        .toISOString()
        .replace(/[-:.]/g, "")}`;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file, fileName);

      const result = await client.request(uploadFiles(formData));

      console.log("result", result.id);

      //2
      const mediaMessageCreation = await axios.post(
        "http://localhost:3000/items/mediaMessage",
        {
          id: mediaId,
          fileId: result.id,
        }
      );
      console.log("mediaMessageCreation", mediaMessageCreation.data);

      //3
      const messageCreationByWhatsappCloudApi = await axios.post(
        "https://graph.facebook.com/v16.0/411772638680203/messages",
        {
          messaging_product: "whatsapp",
          to: "918552035822",
          type: "audio", //audio, image, video, document
          audio: {
            id: mediaId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "messageCreationByWhatsappCloudApi.data.messages[0].id)",
        messageCreationByWhatsappCloudApi.data.messages[0].id
      );

      //4
      const messageCreationInDirectus = await axios.post(
        "http://localhost:3000/items/Message",
        {
          id: messageCreationByWhatsappCloudApi.data.messages[0].id,
          From: 411772638680203,
          timestamp: "2024-09-12T08:27:34.123Z",

          type: "audio",
          mediaMessage_id: mediaId,
          status: "sent",
          contacts_id: 918552035822,
        }
      );
      console.log(
        "messageCreationInDirectus.data)",
        messageCreationInDirectus.data
      );
    } catch (error) {
      console.error("Error while sending media data:", error);
    }
  };

  return (
    <div>
      {/* <button onClick={handleViewMedia}>handleViewMedia</button> */}
      <button onClick={handleMediaSend}>handleMediaSend</button>
    </div>
  );
}

export default MyComponent;
