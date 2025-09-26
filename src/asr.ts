//import { pipeline } from '@huggingface/transformers';
import { pipeline as asrpipe} from "./asrinit";

export default async function asr(file: Blob, lang:string = "en"): Promise<string> {
    // file is a Blob or File object (e.g. from an <input>)
    console.log('Loading ASR model...');
    const modelPath = "/models/whisper" // override prefix init
    const transcriber = await asrpipe('automatic-speech-recognition', modelPath);

    // Option 1: use URL.createObjectURL
    const url = URL.createObjectURL(file);
    const output = await transcriber(url, { language: lang });
    URL.revokeObjectURL(url); // Clean up the object URL
    const text = output && (output as any).text ? (output as any).text : String(output);
    return text;
}
