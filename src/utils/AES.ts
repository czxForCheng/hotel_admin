import CryptoJS from "crypto-js";

// 必须为16、24、32位
const KEY = "1234567890123456";


/**
 * AES加密 ：字符串 key iv  返回base64
 */
export const Encrypt = (word: any, keyStr = KEY): any => {
    const ciphertext = CryptoJS.AES.encrypt(word, CryptoJS.enc.Utf8.parse(KEY), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Base64.stringify(ciphertext.ciphertext)
};

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export const Decrypt = (word: any, keyStr = KEY): any => {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt);
};

