//import { pipeline } from '@huggingface/transformers';
//import { pipeline } from '@xenova/transformers';
import { pipeline } from "./trinit";


export default {
    async extractFeatures(sentences: string[]) {

        // Create a feature-extraction pipeline
        // do not use - or other special charcters in model name
        const modelPath = "/models/minilm" // override prefix in trini
        const extractor = await pipeline('feature-extraction', modelPath);

        // Compute sentence embeddings
        //const sentences = ['This is an example sentence', 'Each sentence is converted'];
        const output = await extractor(sentences, { pooling: 'mean', normalize: true });
        console.log(output);
        // Tensor {
        //   dims: [ 2, 384 ],
        //   type: 'float32',
        //   data: Float32Array(768) [ 0.04592696577310562, 0.07328180968761444, ... ],
        //   size: 768
        // }
        console.log(output.tolist());
        // [
        //   [ 0.04592696577310562, 0.07328180968761444, 0.05400655046105385, ... ],
        //   [ 0.08188057690858841, 0.10760223120450974, -0.013241755776107311, ... ]
        // ]
        return output.tolist();
    }
}
