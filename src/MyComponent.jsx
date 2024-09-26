// import React, { useState } from "react";
// import axios from "axios";

// function MyComponent() {
//   const [downloadStatus, setDownloadStatus] = useState("");
//   const [mediaFile, setMediaFile] = useState(null);

//   const handleDownload = () => {
//     const URL =
//       "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1862678020890843&ext=1727095159&hash=ATswhnH_hRCF5GjLq0TQmrb03K6zpxLwDrbpLCh9KSFtOw"; // Update with actual URL
//     const ACCESS_TOKEN =
//       "EAAWbZB5uXqVABO4jTqX9s5vtzsKkcQTtaEZC0Y09tMyif4jGv3QzbILlLcMCRHEcTzrRVvn2Jf72nk1hYpZB17HELDZAjcLl9FSquNsiDpN3GFTbr1saxavDOhHIr4euRN1Vy5YAQoHYzLbnjnZCoC91ZCmVQJ1ZA4DYr6vbo4UTRmzJcxS4EJalKQF"; // Update with actual access token

//     fetch(URL, {
//       method: "GET",
//       mode: "no-cors",
//       headers: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//       },
//     })
//       .then((response) => {
//         console.log("Response:", response); // Log the response
//         if (!response.ok) {
//           throw new Error(`Server error: ${response}`);
//         }
//         return response.blob(); // Convert to blob if successful
//       })
//       .then((blob) => {
//         const fileURL = window.URL.createObjectURL(blob);
//         setMediaFile(fileURL);
//         setDownloadStatus("Download successful!");
//       })
//       .catch((error) => {
//         console.error("Error:", error); // Log the error with more detail
//         setDownloadStatus(`Download failed: ${error.message}`);
//       });
//   };

//   async function sendGetRequest() {
//     const newurl = `http://localhost:3000/`;
//     try {
//       const response = await axios.get(newurl);
//       console.log(response);
//       // if you want to see the response you get.
//     } catch (error) {
//       console.error("Error sending to AWS:", error.message);
//     }
//   }

//   return (
//     <div>
//       <button onClick={sendGetRequest}>Download Media File</button>
//       <p>{downloadStatus}</p>

//       {mediaFile && (
//         <a href={mediaFile} download="media_file">
//           <button>Click here to download the file</button>
//         </a>
//       )}
//     </div>
//   );
// }

// export default MyComponent;

/////////////////working for getting downloading too
// import React, { useState } from "react";
// import axios from "axios";

// function MyComponent() {
//   const [downloadStatus, setDownloadStatus] = useState("");
//   const [mediaFile, setMediaFile] = useState(null);

//   const handleDownload = async () => {
//     const newurl = `http://localhost:3000/`; // Update to your Express server endpoint

//     try {
//       const response = await axios.get(newurl, { responseType: "blob" });
//       const blob = new Blob([response.data], {
//         type: response.headers["content-type"],
//       });
//       const fileURL = window.URL.createObjectURL(blob);

//       setMediaFile(fileURL);
//       setDownloadStatus("Download successful!");
//     } catch (error) {
//       console.error("Error:", error);
//       setDownloadStatus(`Download failed: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDownload}>Download Media File</button>
//       <p>{downloadStatus}</p>

//       {mediaFile && (
//         <a href={mediaFile} download="media_file">
//           <button>Click here to download the file</button>
//         </a>
//       )}
//     </div>
//   );
// }

// export default MyComponent;

/////////////////working for getting downloading too

//////////////getting binary data from server and converting it in its required format and showing audio in frontend //////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function MyComponent() {
//   ///url of media
//   const [mediaFile, setMediaFile] = useState(null);
//   const [mediaType, setMediaType] = useState(""); // stores the MIME type of the media file (e.g., "audio/mp3"),
//   useEffect(() => {
//     if (mediaFile) {
//       console.log("mediaFile____", mediaFile);
//     }
//   }, [mediaFile]);

//   const handleViewMedia = async () => {
//     const newurl = `http://localhost:3000/`; // Update to your Express server endpoint

//     try {
//       const response = await axios.get(newurl, { responseType: "blob" });
//       console.log("response", response);
//       console.log("response.data", response.data);
//       const blob = new Blob([response.data], {
//         type: response.headers["content-type"],
//       });
//       console.log("blob", blob);
//       const fileURL = window.URL.createObjectURL(blob);
//       console.log("fileURL", fileURL);

//       setMediaFile(fileURL);
//       console.log("mediaFile", mediaFile);
//       setMediaType(response.headers["content-type"]); // Get media type
//       console.log("mediaType", mediaType);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleViewMedia}>View Audio File</button>

//       {mediaFile && mediaType.startsWith("audio/") && (
//         <audio controls style={{ width: "100%" }}>
//           <source src={mediaFile} type={mediaType} />
//           Your browser does not support the audio tag.
//         </audio>
//       )}
//     </div>
//   );
// }

// export default MyComponent;

//////////////getting binary data from server and converting it in its required format and showing audio in frontend //////////

// ///////////////////////////////directus upload example
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createDirectus, rest, uploadFiles } from "@directus/sdk";

const client = createDirectus("http://localhost:3000").with(rest());

function MyComponent() {
  // const handleViewMedia = async () => {
  //   const newurl = `http://localhost:3000/mediamessage/mediaMessage`; // Update to your Express server endpoint

  //   try {
  //     const response = await axios.get(newurl, { responseType: "blob" });
  //     console.log("response", response);
  //     console.log("response.data", response.data);
  //     console.log("content type in header", response.headers["content-type"]);
  //     const title = "Example";
  //     const file = new Blob([response.data], {
  //       type: response.headers["content-type"],
  //     });
  //     const fileName = "example";

  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("file", file, fileName);

  //     const result = await client.request(uploadFiles(formData));

  //     console.log("result", result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  ///////////////////////////////////////entire flow implementation after getting id
  const mediaId = 990504756094749;
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
      const title = "Example";
      const file = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const fileName = "example";

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

// // ///////////////////////////////directus upload example

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { createDirectus, rest, uploadFiles } from "@directus/sdk";

// const client = createDirectus("https://wpproject.agpro.co.in").with(rest());

// function MyComponent() {
//   const [mediaFile, setMediaFile] = useState(null);
//   const [mediaType, setMediaType] = useState(""); // stores the MIME type of the media file (e.g., "audio/mp3")
//   const url =
//     "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1862678020890843&ext=1727182929&hash=ATuwtK5RByj8PfB0zrnBfYNr230jreWS7HrL0rnkjq1K3A";
//   const accessToken =
//     "EAAWbZB5uXqVABO4jTqX9s5vtzsKkcQTtaEZC0Y09tMyif4jGv3QzbILlLcMCRHEcTzrRVvn2Jf72nk1hYpZB17HELDZAjcLl9FSquNsiDpN3GFTbr1saxavDOhHIr4euRN1Vy5YAQoHYzLbnjnZCoC91ZCmVQJ1ZA4DYr6vbo4UTRmzJcxS4EJalKQF";

//   useEffect(() => {
//     if (mediaFile) {
//       console.log("mediaFile____", mediaFile);
//     }
//   }, [mediaFile]);

//   const handleViewMedia = async () => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         responseType: "blob", // Get the binary data directly
//       });

//       const contentType = response.headers["content-type"];
//       console.log("Content-Type:", contentType);

//       const blob = new Blob([response.data], { type: contentType });
//       const fileName = "media_file"; // You can change this to dynamically extract a file name if available
//       const file = new File([blob], fileName, { type: contentType });

//       // Now, we can upload the file to Directus
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("title", fileName);

//       const result = await client.request(uploadFiles(formData));
//       console.log("File uploaded:", result);

//       // Set the media file state if you want to display it later
//       setMediaFile(URL.createObjectURL(blob));
//       setMediaType(contentType);
//     } catch (error) {
//       console.error("Error fetching media file:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleViewMedia}>Fetch & Upload Media</button>
//       {mediaFile && (
//         <div>
//           <p>Uploaded media preview:</p>
//           {mediaType.startsWith("audio/") && <audio src={mediaFile} controls />}
//           {mediaType.startsWith("image/") && (
//             <img src={mediaFile} alt="Uploaded media" />
//           )}
//           {mediaType.startsWith("video/") && <video src={mediaFile} controls />}
//         </div>
//       )}
//       <hr />
//     </div>
//   );
// }

// export default MyComponent;
