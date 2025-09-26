import './style.css'
import embed from './emb.ts'
import asr from './asr.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="embed" type="button">Embed</button>
    </div>
    <div class="card">
      <button id="asr" type="button">Transcribe</button>
    </div>
  </div>
`
document.getElementById('embed')!.onclick = async () => {
  //alert('Button clicked!');
  const features: number[][] = await embed(['This is an example sentence', 'Each sentence is converted']);
  console.log('Number of arrays:', features.length);
  features.forEach((arr, idx) => {
    const mean = arr.reduce((sum:number, val:number) => sum + val, 0) / arr.length;
    console.log(`Mean of array ${idx}:`, mean);
  });
}

  document.getElementById('asr')!.onclick = async () => {
   // Fetch your local wav file
    const response = await fetch('/data/de.wav');
    const blob = await response.blob();

    // Use Object URL so pipeline can read it
    const text = await asr(blob,"de");
    console.log('Transcribed text:', text); 
};
