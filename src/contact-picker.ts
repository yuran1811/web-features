const props = ['name', 'email', 'tel', 'address', 'icon'];
const opts = { multiple: true };
const supported = 'contacts' in navigator && 'ContactsManager' in window;

export const contactPickerHandle = () => {
  const getContacts = async () => {
    if (!supported) return;

    // @ts-ignore-next-line
    const contacts = await navigator.contacts.select(props, opts);
    console.log(contacts);
  };

  const button = document.querySelector('#contacts') as HTMLButtonElement;
  button.addEventListener('click', getContacts);
};
