import { pipeline as asrpipe } from "./asrinit";

let transcriber: ((input: any, opts?: any) => Promise<any>) | null = null;
let currentModelPath: string | null = null;

/**
 * Initialize and persist the ASR transcriber. Subsequent calls reuse the same instance
 * if the same modelPath is provided.
 */
export async function initASR(modelPath: string = "/models/whisper"): Promise<(input: any, opts?: any) => Promise<any>> {
    if (transcriber && currentModelPath === modelPath) return transcriber;
    const created = await (asrpipe("automatic-speech-recognition", modelPath) as unknown as Promise<(input: any, opts?: any) => Promise<any>>);
    transcriber = created;
    currentModelPath = modelPath;
    return transcriber;
}

/**
 * Transcribe a Blob/File or a string (URL/path). Ensures initASR was called and reuses
 * the persisted transcriber.
 */
export default async function transcribe(file: Blob | string, lang: string = "en"): Promise<string> {
    if (!transcriber) transcriber = await initASR();

    let input: any = file;
    let objectUrl: string | null = null;

    if (typeof file !== "string" && file instanceof Blob) {
        objectUrl = URL.createObjectURL(file);
        input = objectUrl;
    }

    try {
        const output = await transcriber!(input, { language: lang });
        const text = output && (output as any).text ? (output as any).text : String(output);
        return text;
    } finally {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
}
