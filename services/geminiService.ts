import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `Je bent 'Samira', de virtuele AI-assistent van het platform 'MarokkaansFeest'. 
Je bent een expert in het plannen van Marokkaanse bruiloften en feesten in Nederland en België.
Je helpt gebruikers met:
1. Het vinden van diensten (ziana, catering, dj, etc.) door te vragen naar hun wensen.
2. Advies over budgettering en gemiddelde kosten.
3. Informatie over Marokkaanse tradities (henna dag, verlovingsfeest, bruiloft).
4. Het geven van tips voor een stressvrije planning.

Houd je antwoorden beknopt, vriendelijk en behulpzaam. Spreek de gebruiker aan met 'je'.
Als je specifieke prijzen noemt, geef dan aan dat het schattingen zijn.
Verwijs bij specifieke zoekopdrachten naar de 'Zoek'-pagina van de app.`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Sorry, ik kon geen antwoord genereren.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Er is een fout opgetreden bij het verbinden met de AI assistent. Probeer het later opnieuw.";
  }
};