import { DeepgramAPIResponse } from "./lib/types";
import { SentiraAIClient } from "./sentira_client";

let client = new SentiraAIClient("api-key");

async function transcribeAudio(): Promise<DeepgramAPIResponse> {
    let transcription: DeepgramAPIResponse = await client.transcribe({
        userId: "",
        inputType: "url",
        audioUrl: "https://www.youtube.com/watch?v=K9mzg8ueiYA",
        transcriptType: "srt",
        pathToFile: "",
        mimeType: "",
        useSubtitles: true
    });
    return transcription;
}

async function summarizeText(): Promise<void> {
    let text = "";
    let summary = await client.summarize({
        userId: "",
        text: text,
        model: "command-light",
        summaryLength: "short",
        summaryFormat: "bullets"
    });
    console.log(summary.response.summary);
}

summarizeText();