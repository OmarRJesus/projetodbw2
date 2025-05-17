import { LMStudioClient } from "@lmstudio/sdk";
import Theme from '../models/themes.js';

const client = new LMStudioClient();

export const analyzeBrainstorm = async (req, res) => {
    console.log("analyzeBrainstorm called!");
    console.log("Received data:", req.body);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
        const model = await client.llm.model("llama-3.2-1b-claude-3.7-sonnet-reasoning-distilled");

        const messages = [
            {
                role: "user",
                content: `Brainstormed ideas on "${req.body.topic}": ${req.body.topics.join(', ')}. Create a coherent solution based on these ideas.`,
            },
        ];

        const stream = await model.respond({
            messages: messages,
            stream: true,
        });

        let lastContentLength = 0;
        const intervalId = setInterval(() => {
            if (stream.content && stream.content.length > lastContentLength) {
                const newContent = stream.content.substring(lastContentLength);
                console.log("Polling - Sending chunk:", newContent.substring(0, 50));
                res.write(`data: ${newContent}\n\n`);
                lastContentLength = stream.content.length;
            }

            // Basic check for potential end (adjust timeout as needed)
            if (lastContentLength > 0 && stream.stats?.completed) { // Check for a 'completed' flag if available
                clearInterval(intervalId);
                res.end();
                console.log("Polling - Stream ended (stats.completed).");
            } else if (Date.now() - startTime > 120000) { // Timeout after 30 seconds (adjust as needed)
                clearInterval(intervalId);
                res.end();
                console.log("Polling - Stream ended (timeout).");
            }
        }, 200); // Poll every 200 milliseconds (adjust as needed)

        const startTime = Date.now();
        // The initial call to respond might take some time
        // We don't need to explicitly wait for it to finish here

    } catch (error) {
        console.error("Error in analyzeBrainstorm:", error);
        if (!res.headersSent) {
            res.status(500).send(`Error connecting to LM Studio: ${error.message}`);
        } else {
            clearInterval(intervalId); // Ensure interval is cleared on error
        }
    }
};

export const salvarBrainstormFinalizado = async (req, res) => {
  try {
    const { topic, wordsArray, aiResponse, selectedTime, criadorId, username } = req.body;

    const novoBrainstormFinalizado = new Theme({
      tema: topic,
      tempo: selectedTime,
      status: 'concluido',
      palavras: wordsArray,
      aiGeradoText: aiResponse,
      criador: criadorId,
      participantes: [{ userId: criadorId, username: username }], // Use o nome de usuário enviado (se enviado)
      participantesEsperando: [],
    });

    const brainstormSalvo = await novoBrainstormFinalizado.save();
    res.status(201).json({ message: 'Brainstorm finalizado salvo com sucesso!', brainstormId: brainstormSalvo._id });

  } catch (error) {
    console.error("Erro ao salvar brainstorm finalizado:", error);
    res.status(500).json({ message: "Erro ao salvar brainstorm finalizado", error: error.message });
  }
};