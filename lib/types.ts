export interface DeepgramRequestBody {
    userId: string;
    inputType: 'url' | 'file';
    transcriptType: 'json' | 'srt' | 'vtt';
    pathToFile?: string | null;
    audioUrl?: string | null;
    mimeType?: string | null;
    useSubtitles?: boolean;
}

interface Word {
    word: string;
    start: number;
    end: number;
    confidence: number;
    punctuated_word: string;
}

interface Sentence {
    text: string;
    start: number;
    end: number;
}

interface Paragraph {
    sentences: Sentence[];
    num_words: number;
    start: number;
    end: number;
}

interface Paragraphs {
    transcript: string;
    paragraphs: Paragraph[];
}

interface Alternative {
    transcript: string;
    confidence: number;
    words: Word[];
    paragraphs: Paragraphs;
}

interface Channel {
    alternatives: Array<Alternative>;
}

export type WordBase = {
    word: string;
    start: number;
    end: number;
    confidence: number;
    punctuated_word?: string;
    speaker?: number;
    speaker_confidence?: number;
};


interface Utterance {
    start: number;
    end: number;
    confidence: number;
    channel: number;
    transcript: string;
    words: WordBase[];
    id: string;
}

export interface DeepgramSpeechToTextResponse {
    transcript: string;
    response: {
        metadata: {
            sha256?: string;
            created?: string;
            channels?: number;
        };
        results: {
            channels: Channel[];
            utterances: Utterance[];
        };
    };
}

export interface DeepgramAPIResponse {
    result: string;
    creditsUsed: number;
    audioDuration: number;
    response: DeepgramSpeechToTextResponse;
}

export interface CohereSummarizeRequestBody {
    userId: string;
    text: string;
    summaryLength?: "short" | "medium" | "long";
    summaryFormat?: "paragraph" | "bullets";
    model: 'command' | 'command-light' | 'command-nightly' | 'command-light-nightly';
}

export interface CohereSummarizeAPIResponse {
    id?: string;
    summary?: string;
}

export interface CohereAPIResponse {
    result: string;
    creditsUsed: number;
    tokensProcessed: number;
    response: CohereSummarizeAPIResponse;
}


export interface ApiKey {
    name: string
    created_at?: string
    id?: string
    key: string
    scopes?: string[] | null
    user_id: string
}