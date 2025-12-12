import { GoogleGenAI, SchemaType } from "@google/genai";

// Define the schema here on the server side
const analysisSchema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.OBJECT,
      properties: {
        behavior: { type: SchemaType.STRING, description: "Object summary of the behavior" },
        emotionalInterpretation: { type: SchemaType.STRING, description: "Separated emotional interpretation" },
      },
      required: ["behavior", "emotionalInterpretation"],
    },
    functionAnalysis: {
      type: SchemaType.OBJECT,
      properties: {
        scores: {
          type: SchemaType.OBJECT,
          properties: {
            escape: { type: SchemaType.NUMBER, description: "0-5 scale for Escape" },
            attention: { type: SchemaType.NUMBER, description: "0-5 scale for Attention" },
            tangible: { type: SchemaType.NUMBER, description: "0-5 scale for Tangible" },
            sensory: { type: SchemaType.NUMBER, description: "0-5 scale for Sensory" },
          },
          required: ["escape", "attention", "tangible", "sensory"],
        },
        mainFunctionExplanation: { type: SchemaType.STRING, description: "Detailed explanation of the highest scoring function" },
      },
      required: ["scores", "mainFunctionExplanation"],
    },
    mechanism: {
      type: SchemaType.OBJECT,
      properties: {
        triggers: { type: SchemaType.STRING, description: "Antecedent/Triggers" },
        consequences: { type: SchemaType.STRING, description: "Consequences" },
        pattern: { type: SchemaType.STRING, description: "Repeated pattern" },
      },
      required: ["triggers", "consequences", "pattern"],
    },
    preventionStrategies: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of 5-8 prevention strategies",
    },
    teachingSkills: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          skill: { type: SchemaType.STRING },
          script: { type: SchemaType.STRING, description: "Example script for parents" },
        },
        required: ["skill", "script"],
      },
    },
    consequenceStrategies: {
      type: SchemaType.OBJECT,
      properties: {
        reinforce: { type: SchemaType.STRING },
        ignore: { type: SchemaType.STRING },
        natural: { type: SchemaType.STRING },
        safety: { type: SchemaType.STRING },
      },
      required: ["reinforce", "ignore", "natural", "safety"],
    },
    commonMistakes: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          mistake: { type: SchemaType.STRING },
          reason: { type: SchemaType.STRING },
        },
        required: ["mistake", "reason"],
      },
    },
    checklist: {
      type: SchemaType.OBJECT,
      properties: {
        items: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "Items to track for 7 days" },
        goal: { type: SchemaType.STRING, description: "Goal (frequency/duration etc)" },
        successCriteria: { type: SchemaType.STRING, description: "Success criteria" },
      },
      required: ["items", "goal", "successCriteria"],
    },
    redFlags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Red flags requiring professional help",
    },
    closingComment: { type: SchemaType.STRING, description: "Warm closing encouragement" },
  },
  required: [
    "summary",
    "functionAnalysis",
    "mechanism",
    "preventionStrategies",
    "teachingSkills",
    "consequenceStrategies",
    "commonMistakes",
    "checklist",
    "redFlags",
    "closingComment",
  ],
};

export default async function handler(req, res) {
  // Allow simple CORS for local development if needed, 
  // but Vercel handles same-origin automatically for /api routes.
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Server Error: GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: 'Server configuration error: API Key missing.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const { task, prompt, model } = req.body;
    
    // Default model if not specified
    const modelName = model || 'gemini-2.5-flash';

    if (task === 'analyzeBehavior') {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.7,
        },
      });
      return res.status(200).json({ text: response.text });
    } 
    
    else if (task === 'getABAInfo') {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          temperature: 0.1,
        },
      });
      return res.status(200).json({ text: response.text });
    }

    else {
      return res.status(400).json({ error: 'Invalid task specified' });
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || 'Error processing AI request' });
  }
}