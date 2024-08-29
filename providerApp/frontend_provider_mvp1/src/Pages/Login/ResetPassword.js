import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	primaryButton: {
		backgroundColor: "black",
		borderRadius: "3px",
		color: "white",
		marginTop: "10px",
		fontWeight: "bolder",
		textTransform: "none",
		fontFamily: "Arial",
	},
}));

export default function ResetPassword(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState({});
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
	}, []);

	const handleChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value });
	};
	// console.log(value);
	const handleClose = () => {
		props.callBack();
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
						fullWidth
						required
						value={value.email}
						onChange={handleChange}
					/>
					<div>
						<Button className={classes.primaryButton} type="submit">
							Continue
						</Button>
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
						type="number"
						label="Code"
						placeholder={12345}
						fullWidth
						required
						onChange={handleChange}
					/>
					<p>Password</p>
					<TextField
						name="password"
						type="password"
						label="Password"
						fullWidth
						required
						onChange={handleChange}
					/>
					<p> Confirm Password</p>
					<TextField
						name="confirmpassword"
						type="password"
						label="Confirm Password"
						fullWidth
						required
						onChange={handleChange}
					/>
					<div className="recovery-button-div" style={{ marginTop: "10px" }}>
						<Button className={classes.primaryButton} type="submit">
							Continue
						</Button>
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
				<Button className={classes.primaryButton} onClick={handleClose}>
					Close
				</Button>
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
