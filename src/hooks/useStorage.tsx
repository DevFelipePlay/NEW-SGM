import cryptoJs from 'crypto-js';

export default function useStorage() {
  function encrypt(text: string) {
    return cryptoJs.AES.encrypt(text, '@playmovel2022').toString();
  }

  function decrypt(text: string) {
    return cryptoJs.AES.decrypt(text, '@playmovel2022').toString(cryptoJs.enc.Utf8);
  }

  function setItem(key: string, item: string) {
    const encryptedString = encrypt(item);

    localStorage.setItem(key, encryptedString);
  }

  function getItem(key: string) {
    const encryptedString = localStorage.getItem(key);

    if (!encryptedString) return null;

    return decrypt(encryptedString);
  }

  function removeItem(key: string) {
    localStorage.removeItem(key);
  }

  function setLoginTime(loginTime: string) {
    setItem('loginTime', loginTime);
  }

  function getLoginTime() {
    return getItem('loginTime');
  }

  return { getItem, setItem, removeItem, setLoginTime, getLoginTime };
}
