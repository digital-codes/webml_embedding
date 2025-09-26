//import { pipeline } from '@huggingface/transformers';
//import { pipeline } from '@xenova/transformers';
import { pipeline as embpipe } from "./embinit";

let extractor: ((input: any, opts?: any) => Promise<any>) | null = null;
let currentModelPath: string | null = null;

/**
 * Initialize and persist the embedding model. Subsequent calls reuse the same instance
 * if the same modelPath is provided.
 */
export async function initEmbedding(modelPath: string = "/models/minilm"): Promise<(input: any, opts?: any) => Promise<any>> {
    if (extractor && currentModelPath === modelPath) return extractor;
    console.log("Loading embedding model from", modelPath);
    extractor = await embpipe("feature-extraction", modelPath);
    currentModelPath = modelPath;
    return extractor;
}

export default async function extractFeatures(sentences: string[]) {
    if (!extractor) extractor = await initEmbedding();
    console.log("Extracting features for sentences:", sentences);   
    // Compute sentence embeddings
    // pooling options: mean: normal for semantic search, max: for sentence similarity, attention: for token-level tasks (kwspotting)
    // all with nomrmalize: true gives best results
    const output = await extractor(sentences, { pooling: 'mean', normalize: true });
    return output.tolist();
}
