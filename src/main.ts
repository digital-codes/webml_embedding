import './style.css'
import embed from './tr.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`
document.getElementById('counter')!.onclick = async () => {
  //alert('Button clicked!');
  const features = await embed.extractFeatures(['This is an example sentence', 'Each sentence is converted']);
  console.log('Number of arrays:', features.length);
  features.forEach((arr, idx) => {
    const mean = arr.reduce((sum:number, val:number) => sum + val, 0) / arr.length;
    console.log(`Mean of array ${idx}:`, mean);
  });
};