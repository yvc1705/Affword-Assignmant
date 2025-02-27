// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI("AIzaSyBMxnSWdivw6t9l76snAYoEDFqDXsc6Vb8");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";
// console.log(prompt);

// const result = await model.generateContent(prompt);
// console.log(result.response.text());


// const axios = require('axios');
import axios from "axios";

const API_KEY = "AIzaSyBMxnSWdivw6t9l76snAYoEDFqDXsc6Vb8" ; // Replace with your actual API key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function askGemini() {
  try {
    const response = await axios.post(url, {
      contents: [{
        parts: [{
          text: "tell me what is a present?"
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated text from the response
    const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Response:\n", generatedText || 'No response found');

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

askGemini();
