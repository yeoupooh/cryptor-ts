import { Button, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import CryptoJS from "crypto-js/core";
import Base64 from "crypto-js/enc-base64";
import Hex from "crypto-js/enc-hex";
import React from "react";
import Cryptor from "../utils/Cryptor";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  button: {
    // margin: theme.spacing(1)
  },
  input: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1)
  }
}));

const CryptorPanel = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPadding, setOpenPadding] = React.useState(false);
  const [values, setValues] = React.useState({
    iv: "000102030405060708090a0b0c0d0e0f",
    key: "101112131415161718191a1b1c1d1e1f",
    plain: "plain",
    cipher: "cipher",
    b64encoded: "",
    b64decoded: "",
    hexencoded: "",
    hexdecoded: "",
    isIVb64: true,
    isKeyb64: true,
    mode: "CBC",
    padding: "PKCS7"
  });

  const handleModeClose = () => {
    setOpen(false);
  };
  const handleModeOpen = () => {
    setOpen(true);
  };

  const handleModeChange = (event) => {
    setValues({ ...values, mode: event.target.value });
    Cryptor.changeMode(event.target.value);
  };

  const handlePaddingChange = (event) => {
    setValues({ ...values, padding: event.target.value });
    Cryptor.changePadding(event.target.value);
  };

  const handlePaddingClose = () => {
    setOpenPadding(false);
  };
  const handlePaddingOpen = () => {
    setOpenPadding(true);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckedChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  function _onEncodeClick(e) {
    console.log(`b64 encode: ${values.b64encoded}: ${values.b64decoded}`);
    setValues({ ...values, b64encoded: Cryptor.b64encode(values.b64decoded) });
  }
  function _onDecodeClick(e) {
    console.log(`b64 dcode: ${values.b64encoded}: ${values.b64decoded}`);
    setValues({ ...values, b64decoded: Cryptor.b64decode(values.b64encoded) });
  }

  function _onHexEncodeClick(e) {
    console.log(`hex encode: ${values.hexenecoded}: ${values.hexdecoded}`);
    setValues({ ...values, hexencoded: Cryptor.hexencode(values.hexdecoded) });
  }
  function _onHexDecodeClick(e) {
    console.log(`hex decode: ${values.hexencoded}: ${values.hexdecoded}`);
    setValues({ ...values, hexdecoded: Cryptor.hexdecode(values.hexencoded) });
  }

  function _getIVAndKey() {
    var iv = values.isIVb64 ? Base64.parse(values.iv) : Hex.parse(values.iv);
    var key = values.isKeyb64
      ? Base64.parse(values.key)
      : Hex.parse(values.key);
    return { iv: iv, key: key };
  }

  function _runEncrypt(wordsPlain) {
    // var iv = values.isIVb64 ? Base64.parse(values.iv) : Hex.parse(values.iv);
    // var key = values.isKeyb64
    //   ? Base64.parse(values.key)
    //   : Hex.parse(values.key);

    var { iv, key } = _getIVAndKey();

    var encrypted = Cryptor.encrypt(wordsPlain, iv, key);
    setValues({ ...values, cipher: encrypted });
  }

  function _onEncryptFromHexClick(e) {
    // prevent sumit form
    e.preventDefault();

    console.log("encrypt from hex");
    console.log("encrypt: plain from hex: ", Hex.parse(values.plain));

    _runEncrypt(Hex.parse(values.plain));
  }

  function _onEncryptClick(e) {
    // prevent sumit form
    e.preventDefault();

    console.log(
      `encrypt: plain: [${values.plain}] iv[${values.iv}] key[${values.key}] isKeyb64[${values.isKeyb64}] isIVb64[${values.isIVb64}] mode[${values.mode}] padding[${values.padding}]`
    );

    _runEncrypt(CryptoJS.enc.Utf8.parse(values.plain));
  }

  function _onDecryptClick(e) {
    // prevent sumit form
    e.preventDefault();

    console.log(
      `"decrypt: [${values.cipher}] iv[${values.iv}] key[${values.key}]`
    );

    var { iv, key } = _getIVAndKey();

    var decrypted = Cryptor.decrypt(Base64.parse(values.cipher), iv, key);
    setValues({ ...values, plain: decrypted });
  }

  return (
    <div className={classes.root}>
      {/* spacing is between grid items in row and col. */}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            placeholder="base64 encoded text"
            label="b64decoded"
            fullWidth
            onChange={handleChange("b64decoded")}
            value={values.b64decoded}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            placeholder="base64 decoded text"
            label="b64encoded"
            fullWidth
            onChange={handleChange("b64encoded")}
            value={values.b64encoded}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onEncodeClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Encode
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onDecodeClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Decode
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            placeholder="hex decoded text"
            label="hexdecoded"
            fullWidth
            onChange={handleChange("hexdecoded")}
            value={values.hexdecoded}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            placeholder="hex encoded text"
            label="hexencoded"
            fullWidth
            onChange={handleChange("hexencoded")}
            value={values.hexencoded}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onHexEncodeClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Encode
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onHexDecodeClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Decode
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            fullWidth
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleModeClose}
            onOpen={handleModeOpen}
            value={values.mode}
            onChange={handleModeChange}
          >
            <MenuItem value={"CBC"}>CBC</MenuItem>
            {/* <MenuItem value={"ECB"}>ECB</MenuItem> */}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            fullWidth
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openPadding}
            onClose={handlePaddingClose}
            onOpen={handlePaddingOpen}
            value={values.padding}
            onChange={handlePaddingChange}
          >
            <MenuItem value={"PKCS7"}>PKCS7</MenuItem>
            <MenuItem value={"OneAndZero"}>OneAndZero</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <TextField
            className={classes.input}
            placeholder="plain text"
            label="plain"
            fullWidth
            onChange={handleChange("plain")}
            value={values.plain}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            placeholder="cipher text"
            label="cipher"
            fullWidth
            onChange={handleChange("cipher")}
            value={values.cipher}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                className={classes.input}
                placeholder="base64 encoded iv"
                label="IV"
                fullWidth
                value={values.iv}
                onChange={handleChange("iv")}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.isIVb64}
                    onChange={handleCheckedChange("isIVb64")}
                    value={values.isIVb64}
                  />
                }
                label="base64"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                className={classes.input}
                placeholder="key"
                label="Key"
                fullWidth
                value={values.key}
                onChange={handleChange("key")}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.isKeyb64}
                    onChange={handleCheckedChange("isKeyb64")}
                    value={values.isKeyb64}
                  />
                }
                label="base64"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onEncryptClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Encrypt
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={_onEncryptFromHexClick}
            variant="outlined"
            component="span"
            fullWidth
            className={classes.button}
          >
            Encrypt from Hex
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={_onDecryptClick}
            variant="outlined"
            fullWidth
            component="span"
            className={classes.button}
          >
            Decrypt
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CryptorPanel;
