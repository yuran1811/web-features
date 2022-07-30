export const idleDetectionHandle = () => {
  if (!('IdleDetector' in window)) return;

  const idleBtn = document.querySelector('#idle') as HTMLButtonElement;
  const idleStatus = document.querySelector('#idle-status') as HTMLButtonElement;

  const runIdleDetection = async () => {
    // @ts-ignore
    await IdleDetector.requestPermission();
    // @ts-ignore
    const idleDetector = new IdleDetector();

    idleDetector.addEventListener('change', () => {
      const { userState, screenState } = idleDetector;

      idleStatus && (idleStatus.innerHTML = userState + ' ' + screenState);

      if (userState == 'idle') {
        // update database with status
        console.log(userState);
      }
    });

    await idleDetector.start({ threshold: 120000 });
  };

  idleBtn.addEventListener('click', () => runIdleDetection());
};
