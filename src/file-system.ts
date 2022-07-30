export const fileSystemHandle = () => {
  const getFileBtn = document.querySelector('#fs-get') as HTMLButtonElement;
  const saveFileBtn = document.querySelector('#fs-save') as HTMLButtonElement;

  getFileBtn.onclick = async () => {
    // @ts-ignore-next-line
    const [handle] = await window.showOpenFilePicker();
    const file = await handle.getFile();
    console.log(file);
  };

  saveFileBtn.onclick = async () => {
    const textFile = new File(['hello world'], 'hello.txt', { type: 'text/plain' });
    // @ts-ignore-next-line
    const handle = await window.showSaveFilePicker();
    const writable = await handle.createWritable();
    await writable.write(textFile);
    await writable.close();
  };
};
