export const deviceMotionHandle = () => {
  'navigator' in window && navigator.geolocation.getCurrentPosition(console.log);

  addEventListener('devicemotion', (e) => {
    const output = document.querySelector('#motion') as HTMLParagraphElement;
    console.log(e);

    output.innerHTML = `
<div class="w-full line-clamp-1">Acceleration: ${
      Math.round(((e?.acceleration?.x || 0) + Number.EPSILON) * 100) / 100 + ' m/s2'
    }</div>
<div class="w-full">
  <div class="w-full line-clamp-1">X: ${+(e?.acceleration?.x || 0).toFixed(2)}</div>
  <div class="w-full line-clamp-1">Y: ${+(e?.acceleration?.y || 0).toFixed(2)}</div>
  <div class="w-full line-clamp-1">Z: ${+(e?.acceleration?.z || 0).toFixed(2)}</div>
</div>
<div>
  <div class="w-full line-clamp-1">Alpha: ${+(e?.rotationRate?.alpha || 0).toFixed(2)}</div>
  <div class="w-full line-clamp-1">Beta: ${+(e?.rotationRate?.beta || 0).toFixed(2)}</div>
  <div class="w-full line-clamp-1">Gamma: ${+(e?.rotationRate?.gamma || 0).toFixed(2)}</div>
</div>`;
  });
};
