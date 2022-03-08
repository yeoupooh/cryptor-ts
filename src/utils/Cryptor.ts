import AES from "crypto-js/aes";
import CryptoJS from "crypto-js/core";
import Hex from "crypto-js/enc-hex";
import Utf8 from "crypto-js/enc-utf8";

var props = {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
};

class Cryptor {
  static changeMode(mode) {
    if (mode === "CBC") {
      props.mode = CryptoJS.mode.CBC;
    } else {
      console.log(`Unsupported mode: ${mode}`);
    }
  }

  static changePadding(padding) {
    if (padding === "PKCS7") {
      props.padding = CryptoJS.pad.Pkcs7;
    } else if (padding === "OneAndZero") {
      props.padding = CryptoJS.pad.Iso97971;
    } else {
      console.log(`Unsupported padding: ${padding}`);
    }
  }

  // return base64 encoded string
  // plain: wordArray
  static encrypt(plain, iv, key) {
    // console.log(`Cryptor.encrypt: plain: [${Base64.stringify(plain)}]`);

    // var iv = Hex.parse(hexIv);
    // var key = Hex.parse(hexKey);

    // encrypted: WordArray
    var encrypted = AES.encrypt(plain, key, {
      iv: iv,
      mode: props.mode,
      padding: props.padding
    });
    console.log(encrypted);
    // console.log(
    //   `encrypted: type: ${typeof encrypted} [${encrypted.toString()}]`
    // );
    var encoded = Hex.stringify(encrypted);
    console.log(`encoded: [${encoded}]`);

    // return base64 encoded string
    return encrypted.toString();
  }

  // cipher: WordArray
  static decrypt(cipher, iv, key) {
    // console.log(
    // `Cryptor.decrypt: [${Hex.stringify(cipher)}] iv:[${Hex.stringify(
    // iv
    // )}] key:[${Hex.stringify(key)}]`
    // );

    var decrypted = AES.decrypt({ ciphertext: cipher }, key, {
      iv: iv,
      mode: props.mode,
      padding: props.padding
    });

    // for testing
    // var decrypted = Hex.parse("313233");

    console.log(`decrypted: [${decrypted}]`, decrypted);
    var decoded = decrypted.toString(Utf8);
    console.log(`decoded: [${decoded}]`);
    console.log("done");

    // return utf-8 encoded string
    return decoded;
  }

  static b64encode(decoded) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Utf8.parse(decoded));
  }

  static b64decode(encoded) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encoded));
  }

  static hexencode(decoded) {
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(decoded));
  }

  static hexdecode(encoded) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(encoded));
  }
}

export default Cryptor;
