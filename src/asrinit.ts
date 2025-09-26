// src/transformersInit.ts
// ------------------------------------------------------------------
// 1️⃣ Set the base URL where the WASM binaries live.
//    Vite serves everything under `public/` at the root URL,
//    so the path below matches the folder we created in step 1.

// https://www.npmjs.com/package/@xenova/transformers/v/1.2.2

import { env } from "@huggingface/transformers";

(env as any).WASM_PATH = "/transformers/";   // ✅ works, no TS error


// Use a different host for models.
// - `remoteURL` defaults to use the HuggingFace Hub
// - `localURL` defaults to '/models/onnx/quantized/'
(env as any).remoteURL = 'https://www.example.com/';
(env as any).localURL = '/';
(env as any).localModelPath = "/whisper";
// Set whether to use remote or local models. Defaults to true.
//  - If true, use the path specified by `env.remoteURL`.
//  - If false, use the path specified by `env.localURL`.
(env as any).allowRemoteModels = false;
(env as any).allowLocalModels = true;

(env as any).useBrowserCache = false;

console.log("ASR:",env as any);

// Set parent path of .wasm files. Defaults to use a CDN.
(env as any).backends.onnx.wasm.wasmPaths = window.location.origin + '/transformers/'; 



// 2️⃣ Now import the rest of the library normally.
export * from "@huggingface/transformers";
// ------------------------------------------------------------------
