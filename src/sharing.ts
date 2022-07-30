export const sharingHandle = () => {
  (document.querySelector('#share') as HTMLButtonElement).onclick = async () => {
    const shareData = {
      url: 'https://scorie.vercel.app',
      title: 'PWAs are awesome',
      text: 'I learned how to build a PWA today',
    };

    if (!('share' in navigator) || !navigator.canShare(shareData)) {
      alert('Web Share API is not compatible || Cannot share the data');
      return;
    }

    try {
      await navigator.share(shareData);
      alert('Content shared!');
    } catch (error) {
      alert('Content was not shared by the user');
    }
  };
};
