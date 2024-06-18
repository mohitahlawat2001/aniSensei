import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.REACT_APP_ANISENSEI_API_KEY);
export default gemini;