import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
// import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { Input } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function ForgotPassword(props) {
  // const classes = useStyles();
  const [value, setValue] = React.useState({});
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
    showPassword1: false,
  });
  const [codeSent, setCodeSent] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isSendingCode, setSendingCode] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [confirming, setConfirming] = React.useState(false);

  useEffect(() => {
    Auth.currentUserInfo()
      .then((response) => {
        setValue({ email: response.attributes.email });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  // console.log(value);
  const handleClose = () => {
    props.callBack();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword1: !values1.showPassword1 });
  };
  const handleSendCodeClick = async (event) => {
    event.preventDefault();

    setSendingCode(true);

    try {
      await Auth.forgotPassword(value.email);
      setCodeSent(true);
    } catch (e) {
      alert(e.message);
      setSendingCode(false);
    }
  };

  const handleConfirmClick = async (event) => {
    event.preventDefault();

    setConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(value.email, value.code, value.password);
      setConfirmed(true);
    } catch (e) {
      alert(e.message);
      setConfirming(false);
    }
  };

  const renderRequestCodeForm = () => {
    return (
      <div className="recovery-parent-div">
        <h3 className="recoveryHeader">Forgot Password</h3>
        <form className="password-recover-form" onSubmit={handleSendCodeClick}>
          <p className="recovery-email-label">
            Enter your email address. Please check your email for the code.
          </p>
          <TextField
            name="email"
            label="Email"
            multiline
            fullWidth
            required
            value={value.email}
            onChange={handleChange}
          />
          <div>
            <button className={"button-forgot"} type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <div className="recovery-parent-div">
        <h3 className="recovery-header">Forgot Password</h3>
        <form className="recovery-form" onSubmit={handleConfirmClick}>
          <p>Your confirmation code</p>
          <TextField
            name="code"
            type="text"
            label="Code"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            onChange={handleChange}
          />
          <p>Password</p>
          <Input
            name="password"
            type={values.showPassword ? "text" : "password"}
            label="Password"
            fullWidth
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="icon-eye-login"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleChange}
          />
          <p> Confirm Password</p>
          <Input
            name="confirmpassword"
            type={values1.showPassword1 ? "text" : "password"}
            label="Confirm Password"
            fullWidth
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="icon-eye-login"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                >
                  {values1.showPassword1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleChange}
          />
          <div className="recovery-button-div" style={{ marginTop: "10px" }}>
            <button className={"button-forgot"} type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <div className="success">
        <p>
          Your password has been reset. You can login with your new credentials.
        </p>
        <button className={"button-forgot"} onClick={handleClose}>
          Close
        </button>
      </div>
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth={"xl"}
    >
      <div style={{ padding: "30px" }}>
        {!codeSent
          ? renderRequestCodeForm()
          : !confirmed
          ? renderConfirmationForm()
          : renderSuccessMessage()}
      </div>
    </Dialog>
  );
}
