declare module './sentira_client' {
    import { ApiKey, SentiraSummaryAPIResponse, SentiraSummarizeRequestBody, SentiraTranscriptAPIResponse, SentiraTranscriptionRequestBody } from './types';

    export class SentiraAIClient {
        private baseUrl: string;
        private apiKey: string;
        private accessToken: string | null;
        private debugMode: boolean;

        constructor({ apiKey, accessToken }: { apiKey?: string, accessToken?: string });

        public toggleDebugMode(): void;
        public setBaseUrl(newBaseUrl: string): void;
        public summarize(body: SentiraSummarizeRequestBody): Promise<SentiraSummaryAPIResponse>;
        public transcribe(body: SentiraTranscriptionRequestBody, file?: File): Promise<SentiraTranscriptAPIResponse>;
        public transcribeOrSummarize(body: SentiraSummarizeRequestBody): Promise<SentiraSummaryAPIResponse>;
        public createApiKey(body: { name: string, scopes: string[] }): Promise<string>;
        public getApiKeys(): Promise<ApiKey[]>;
        public deleteApiKey(id: string): Promise<string>;
        public setApiKey(newApiKey: string): void;
    }
}