import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { tutorToolDeclaration, tools } from "./ai.service";
import config from "../../config";

const genAI = new GoogleGenerativeAI((config.gemini_api_key as string) || process.env.GEMINI_API_KEY || "");

async function sendMessageWithRetry(chat: any, message: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await chat.sendMessage(message);
    } catch (error: any) {
      if (error.status === 503 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw error;
    }
  }
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are the Skill-Bridge Assistant. Help users find tutors based on categories, explain how to book sessions, and answer general FAQ questions about the Skill-Bridge platform. Be friendly, concise, and helpful.",
});

const chatWithAi = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    const sanitizedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: Array.isArray(msg.parts)
        ? msg.parts.map((p: any) => ({ text: p.text || "" }))
        : [{ text: String(msg) }],
    }));

    const chat = model.startChat({
      history: sanitizedHistory,
      tools: tutorToolDeclaration,
    });

    const result = await sendMessageWithRetry(chat, message);
    const response = result.response;
    const call = response.functionCalls()?.[0];

    if (call) {
      const toolName = call.name as keyof typeof tools;
      const data = await tools[toolName](call.args as any);

      const finalResult = await chat.sendMessage([
        {
          functionResponse: {
            name: call.name,
            response: { content: data },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "AI responded successfully",
        data: { reply: finalResult.response.text() },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "AI responded successfully",
        data: { reply: response.text() },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal AI error",
    });
  }
};

export const AIController = {
  chatWithAi,
};
