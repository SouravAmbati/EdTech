// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// dotenv.config();

// const ai=new GoogleGenAI({apiKey:process.env.API_KEY});

// const gemini=async(content)=>{
//     const response=await ai.models.generateContent({
//         model:"gemini-2.0-flash",
//         contents:`create a roadmap in image for ${content}`,
//     })
//     return response
// }

// export default gemini

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

// async function main(content) {
//   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

//   // Set responseModalities to include "Image" so the model can generate  an image
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash-exp-image-generation",
//     contents: `Create a high-resolution, beginner-friendly  roadmap   for learning ${content}. The roadmap should be in a clean, modern illustrated style with icons and clear section labels. Include the following major topics connected from a central ${content}

// Use a white background, purple theme, and readable fonts. The image should be high quality, well-structured, and easy for beginners to follow.`,
//     config: {
//       responseModalities: ["Text", "Image"],
//     },
//   });
//   for (const part of response.candidates[0].content.parts) {
//     // Based on the part type, either show the text or save the image
//     if (part.text) {
//       console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       const buffer = Buffer.from(imageData, "base64");
//       fs.writeFileSync("gemini-native-image.png", buffer);
//       console.log("Image saved as gemini-native-image.png");
//     }
//   }
// }

// export default main;


async function main(content) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: `Create a high-resolution, beginner-friendly roadmap for learning ${content}. The roadmap should be in a clean, modern illustrated style with icons and clear section labels. Include the following major topics connected from a central ${content}
  
  Use a white background, purple theme, and readable fonts. The image should be high quality, well-structured, and easy for beginners to follow.`,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });
  
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        return `data:image/png;base64,${imageData}`; // Return base64 image as data URI
      }
    }
  
    return null;
  }
export default main  
