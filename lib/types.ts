export interface SentiraTranscriptionRequestBody {
    userId: string;
    inputType: TranscriptionInputType;
    transcriptType: TranscriptionType;
    pathToFile?: string | null;
    audioUrl?: string | null;
    mimeType?: string | null;
    useSubtitles?: boolean;
}

export enum TranscriptionInputType {
    URL = "url",
    FILE = "file"
}

export enum TranscriptionType {
    TEXT = "text",
    SRT = "srt",
    VTT = "vtt"
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

export interface SentiraSpeechToTextResponse {
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

export interface SentiraTranscriptAPIResponse {
    result: string;
    creditsUsed: number;
    audioDuration: number;
    response: SentiraSpeechToTextResponse;
}

export interface SentiraSummarizeRequestBody {
    userId: string;
    text: string;
    summaryLength?: SummaryLength;
    summaryFormat?: SummaryFormat;
    model: SummaryModel;
    additionalCommand?: string;
}

export enum SummaryLength {
    SHORT = "short",
    MEDIUM = "medium",
    LONG = "long"
}

export enum SummaryFormat {
    PARAGRAPH = "paragraph",
    BULLETS = "bullets"
}

export enum SummaryModel {
    COMMAND = "command",
    COMMAND_LIGHT = "command-light",
    COMMAND_NIGHTLY = "command-nightly",
    COMMAND_LIGHT_NIGHTLY = "command-light-nightly"
}

export interface SentiraSummarizeAPIResponse {
    id?: string;
    summary?: string;
}

export interface SentiraSummaryAPIResponse {
    result: string;
    creditsUsed: number;
    tokensProcessed: number;
    response: SentiraSummarizeAPIResponse;
}


export interface ApiKey {
    name: string
    created_at?: string
    id?: string
    key: string
    scopes?: string[] | null
    user_id: string
}