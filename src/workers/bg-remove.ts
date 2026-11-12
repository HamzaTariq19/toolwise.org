// Runs the ISNet background-removal model with ONNX Runtime Web (CPU/WebAssembly) off the main thread.
import * as ort from 'onnxruntime-web/wasm';

let session: ort.InferenceSession | null = null;
const post = (m: unknown, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);
self.onmessage = async (e: MessageEvent) => {
  const d = e.data;
  try {
    if (d.type === 'init') {
      ort.env.wasm.numThreads = 1; // single thread: works without cross-origin isolation headers
      ort.env.wasm.wasmBinary = new Uint8Array(d.wasm);
      session = await ort.InferenceSession.create(new Uint8Array(d.model), { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
      post({ type: 'ready' });
    } else if (d.type === 'run') {
      if (!session) throw new Error('not ready');
      const input = new ort.Tensor('float32', d.input as Float32Array, [1, 3, d.size, d.size]);
      const out = await session.run({ [session.inputNames[0]]: input });
      const mask = out[session.outputNames[0]].data as Float32Array;
      let mn = Infinity, mx = -Infinity; for (const v of mask) { if (v < mn) mn = v; if (v > mx) mx = v; }
      const r = mx - mn || 1, res = new Float32Array(mask.length); for (let i = 0; i < mask.length; i++) res[i] = (mask[i] - mn) / r;
      post({ type: 'mask', mask: res }, [res.buffer]);
    }
  } catch (err) { post({ type: 'error', message: String((err as Error)?.message ?? err) }); }
};
