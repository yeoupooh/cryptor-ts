import Cryptor from "../src/utils/Cryptor";
import CryptoJS from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";

test("encrypt hello", () => {
  var key = Hex.parse("000102030405060708090a0b0c0d0e0f");
  var iv = Hex.parse("000102030405060708090a0b0c0d0e0f");
  expect(Cryptor.encrypt(Utf8.parse("hello"), key, iv)).toBe(
    "YnhDRgxYl4TMoCooy6CqRQ=="
  );
});

test("decrypt ciphered hello", () => {
  var key = Hex.parse("000102030405060708090a0b0c0d0e0f");
  var iv = Hex.parse("000102030405060708090a0b0c0d0e0f");
  expect(
    Cryptor.decrypt(Base64.parse("YnhDRgxYl4TMoCooy6CqRQ=="), key, iv)
  ).toBe("hello");
});

test("Iso97971 padding", () => {
  var C = CryptoJS;
  var data = C.lib.WordArray.create([0xdddddd00], 3);
  C.pad.Iso97971.pad(data, 1);

  expect(data.toString()).toBe(C.lib.WordArray.create([0xdddddd80]).toString());
});
