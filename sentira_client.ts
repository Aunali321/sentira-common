// A shared api client for sentira services
import fetch from 'cross-fetch';
import { ApiKey, SentiraSummaryAPIResponse, SentiraSummarizeRequestBody, SentiraTranscriptAPIResponse, SentiraTranscriptionRequestBody, TranscriptionInputType, TranscriptionType } from './lib/types';

export class SentiraAIClient {
    private baseUrl = "https://api.sentiraai.com"
    private apiKey: string | null = null;
    private accessToken: string | null = null;
    private debugMode: boolean = false;

    constructor({ apiKey, accessToken }: { apiKey?: string, accessToken?: string }) {
        if (this.debugMode) {
            console.info("SentiraAI API initialized");
        }
        if (apiKey) {
            this.apiKey = apiKey;
        }
        if (accessToken) {
            this.accessToken = accessToken;
        }
        if (!apiKey && !accessToken) {
            throw new Error('Either Api Key or Access Token must be provided. Get your API key from https://sentiraai.com');
        }
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

    private getAuthHeader(): { [key: string]: string } {
        if (this.accessToken) {
            return { 'Authorization': `${this.accessToken}` };
        } else {
            return { 'x-api-key': `${this.apiKey}` };
        }
    }

    public async summarize(body: SentiraSummarizeRequestBody): Promise<SentiraSummaryAPIResponse> {
        if (this.debugMode) {
            console.info("Summarize method called");
            console.info(`Summarize request body: ${JSON.stringify(body)}`);
        }

        const response = await fetch(`${this.baseUrl}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
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

    public async transcribe(body: SentiraTranscriptionRequestBody): Promise<SentiraTranscriptAPIResponse> {
        if (this.debugMode) {
            console.info("Transcribe method called");
            console.info(`Transcribe request body: ${JSON.stringify(body)}`);
        }

        const response = await fetch(`${this.baseUrl}/transcribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
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

    public async transcribeOrSummarize(body: SentiraSummarizeRequestBody): Promise<SentiraSummaryAPIResponse> {
        if (this.debugMode) {
            console.info("TranscribeOrSummarize method called");
        }

        // First, transcribe the audio
        const transcriptionResponse = await this.transcribe({
            userId: body.userId,
            inputType: TranscriptionInputType.URL,
            transcriptType: TranscriptionType.TEXT,
            audioUrl: body.text,
            mimeType: null,
            useSubtitles: true,
            file: null
        });

        if (!transcriptionResponse || transcriptionResponse.result !== 'Ok') {
            throw new Error(`Failed to transcribe: ${JSON.stringify(transcriptionResponse)}`);
        }

        // Then, summarize the transcript
        const summaryRequestBody: SentiraSummarizeRequestBody = {
            userId: body.userId,
            text: transcriptionResponse.response.transcript,
            model: body.model,
            summaryLength: body.summaryLength,
            summaryFormat: body.summaryFormat,
        };
        const summaryResponse = await this.summarize(summaryRequestBody);

        if (this.debugMode) {
            console.info(`TranscribeOrSummarize response: ${JSON.stringify(summaryResponse)}`);
        }

        return summaryResponse;
    }

    public async createApiKey(body: { name: string, scopes: string[] }): Promise<string> {
        if (this.debugMode) {
            console.info("CreateApiKey method called");
        }
        const response = await fetch(`${this.baseUrl}/api-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
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
                ...this.getAuthHeader()
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

    public async deleteApiKey(id: string): Promise<string> {
        if (this.debugMode) {
            console.info("DeleteApiKey method called");
        }
        const response = await fetch(`${this.baseUrl}/api-keys/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete api key: ${response.statusText}`);
        }

        const data = await response.json();
        if (this.debugMode) {
            console.info(`DeleteApiKey response: ${JSON.stringify(data)}`);
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