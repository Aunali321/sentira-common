// A shared api client for sentira services
import fetch from 'cross-fetch';
import { ApiKey, CohereAPIResponse, CohereSummarizeRequestBody, DeepgramAPIResponse, DeepgramRequestBody } from './lib/types';

export class SentiraAIClient {
    private baseUrl = "https://api.sentiraai.com"
    private apiKey: string;
    private debugMode: boolean = false;

    constructor(apiKey: string) {
        if (this.debugMode) {
            console.info("SentiraAI API initialized");
        }
        this.apiKey = apiKey;
    }

    public toggleDebugMode(): void {
        this.debugMode = !this.debugMode;
        console.log("Debug mode: ", this.debugMode)
    }

    public setBaseUrl(newBaseUrl: string): void {
        if (this.debugMode) {
            console.info("Base URL is being updated");
        }
        this.baseUrl = newBaseUrl;
        if (this.debugMode) {
            console.info("Base URL has been updated");
        }
    }

    public async summarize(body: CohereSummarizeRequestBody): Promise<CohereAPIResponse> {
        if (this.debugMode) {
            console.info("Summarize method called");
            console.info(`Summarize request body: ${JSON.stringify(body)}`);
        }

        // Regular expression to check if text contains a URL
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        if (urlRegex.test(body.text)) {
            // If text contains a URL, call the transcribe method
            const transcription = await this.transcribe({ userId: "", inputType: "url", audioUrl: body.text, transcriptType: "srt", pathToFile: "", mimeType: "", useSubtitles: true });
            body.text = transcription.response as any;
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
        if (this.debugMode) {
            console.info(`Summarize response: ${JSON.stringify(data)}`);
        }
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
        if (this.debugMode) {
            console.info("Transcribe method called");
            console.info(`Transcribe request body: ${JSON.stringify(body)}`);
        }
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
        if (this.debugMode) {
            console.info(`Transcribe response: ${JSON.stringify(data)}`);
        }
        return {
            result: data.result,
            creditsUsed: data.creditsUsed,
            audioDuration: data.audioDuration,
            response: data.response
        };
    }

    public async createApiKey(body: { name: string, scopes: string[] }): Promise<string> {
        if (this.debugMode) {
            console.info("CreateApiKey method called");
        }
        const response = await fetch(`${this.baseUrl}/api-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
            },
            //TODO: be able to use session id here
            body: JSON.stringify({
                userId: this.apiKey,
                name: body.name,
                scopes: body.scopes,
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create api key: ${response.statusText}`);
        }

        const data = await response.json();
        if (this.debugMode) {
            console.info(`CreateApiKey response: ${JSON.stringify(data)}`);
        }
        return data.key;
    }

    public async getApiKeys(): Promise<ApiKey[]> {
        if (this.debugMode) {
            console.info("GetApiKeys method called");
        }
        const response = await fetch(`${this.baseUrl}/api-keys`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //TODO: be able to use session id here
                'x-api-key': this.apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get api keys: ${response.statusText}`);
        }

        const data = await response.json();

        if (this.debugMode) {
            console.info(`GetApiKeys response: ${JSON.stringify(data)}`);
        }
        return data;
    }

    public setApiKey(newApiKey: string): void {
        if (this.debugMode) {
            console.info("API key is being updated");
        }
        this.apiKey = newApiKey;
        if (this.debugMode) {
            console.info("API key has been updated");
        }
    }

}