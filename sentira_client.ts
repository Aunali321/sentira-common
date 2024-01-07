// A shared api client for sentira services
import fetch from 'cross-fetch';
import { CohereAPIResponse, CohereSummarizeRequestBody, DeepgramAPIResponse, DeepgramRequestBody } from './lib/types';

export class SentiraAIClient {
    private readonly baseUrl = "https://api.sentiraai.com/"
    private apiKey: string;

    constructor(apiKey: string) {
        console.info("SentiraAI API initialized");
        this.apiKey = apiKey;
    }

    public async summarize(body: CohereSummarizeRequestBody): Promise<CohereAPIResponse> {
        console.info("Summarize method called");
        console.info(`Summarize request body: ${JSON.stringify(body)}`);

        // Regular expression to check if text contains a URL
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        if (urlRegex.test(body.text)) {
            // If text contains a URL, call the transcribe method
            const transcription = await this.transcribe({ userId: "", inputType: "url", audioUrl: body.text, transcriptType: "srt", pathToFile: "", mimeType: "", useSubtitles: true });
            body.text = transcription.response;
        }

        const response = await fetch(`${this.baseUrl}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to summarize: ${response.statusText}`);
        }

        const data = await response.json();
        console.info(`Summarize response: ${JSON.stringify(data)}`);
        return {
            result: data.result,
            creditsUsed: data.creditsUsed,
            tokensProcessed: data.tokensProcessed,
            response: {
                id: data.response.id,
                summary: data.response.summary
            }
        };
    }

    public async transcribe(body: DeepgramRequestBody): Promise<DeepgramAPIResponse> {
        console.info("Transcribe method called");
        console.info(`Transcribe request body: ${JSON.stringify(body)}`);
        const response = await fetch(`${this.baseUrl}/transcribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to transcribe: ${response.statusText}`);
        }

        const data = await response.json();
        console.info(`Transcribe response: ${JSON.stringify(data)}`);
        return {
            result: data.result,
            creditsUsed: data.creditsUsed,
            audioDuration: data.audioDuration,
            response: data.response
        };
    }

}