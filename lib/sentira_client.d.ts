declare module './sentira_client' {
    import { CohereAPIResponse, CohereSummarizeRequestBody, DeepgramAPIResponse, DeepgramRequestBody } from './typess';

    export class SentiraAIClient {
        private readonly baseUrl: string;
        private apiKey: string;

        constructor(apiKey: string);

        public summarize(body: CohereSummarizeRequestBody): Promise<CohereAPIResponse>;
        public transcribe(body: DeepgramRequestBody): Promise<DeepgramAPIResponse>;
        public createApiKey(body: { name: string, scopes: string[] }): Promise<string>;
        public getApiKeys(): Promise<ApiKey[]>;
    }
}