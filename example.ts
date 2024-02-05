import { SentiraTranscriptAPIResponse, SummaryFormat, SummaryLength, SummaryModel, TranscriptionInputType, TranscriptionType } from "./lib/types";
import { SentiraAIClient } from "./sentira_client";

let client = new SentiraAIClient({
    apiKey: "your-api-key",
});

client.toggleDebugMode();


async function transcribeAudio(): Promise<SentiraTranscriptAPIResponse> {
    let transcription: SentiraTranscriptAPIResponse = await client.transcribe({
        userId: "",
        inputType: TranscriptionInputType.URL,
        audioUrl: "https://www.youtube.com/watch?v=K9mzg8ueiYA",
        transcriptType: TranscriptionType.SRT,
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
        model: SummaryModel.COMMAND_LIGHT,
        summaryLength: SummaryLength.LONG,
        summaryFormat: SummaryFormat.BULLETS
    });
    console.log(summary.response.summary);
}

// summarizeText();

async function createApiKey(): Promise<void> {
    let apiKey = await client.createApiKey({
        name: "client",
        scopes: ["transcribe"]
    });
    console.log(apiKey);
}


async function getApiKeys(): Promise<void> {
    let apiKeys = await client.getApiKeys();
    console.log(apiKeys);
}

async function deleteApiKey(): Promise<void> {
    let apiKey = await client.getApiKeys().then(keys => keys[0]);
    if (!apiKey.id) {
        return;
    }
    await client.deleteApiKey(apiKey.id);
}


async function transcribeOrSummarize() {
    let summary = await client.transcribeOrSummarize({
        userId: "",
        text: "https://www.youtube.com/watch?v=Jlok6TYFhGs",
        model: SummaryModel.COMMAND,
        summaryLength: SummaryLength.LONG,
        summaryFormat: SummaryFormat.BULLETS
    });

    console.log(summary.response.summary);
}
