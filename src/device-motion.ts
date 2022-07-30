export const deviceMotionHandle = () => {
  'navigator' in window && navigator.geolocation.getCurrentPosition(console.log);

  window.addEventListener('devicemotion', (e) => {
    const output = document.querySelector('#motion') as HTMLParagraphElement;
    console.log(e);

    output.innerHTML = `
<div>
${Math.round(((e?.acceleration?.x || 0) + Number.EPSILON) * 100) / 100 + ' m/s2'}
</div>
<div>
  ${e?.acceleration?.x || 0}
  ${e?.acceleration?.y || 0}
  ${e?.acceleration?.z || 0}
</div>
<div>
  ${e?.rotationRate?.alpha || 0}
  ${e?.rotationRate?.beta || 0}
  ${e?.rotationRate?.gamma || 0}
</div>`;
  });
};
