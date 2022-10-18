import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Auth, API } from "aws-amplify";
import { useAppContext } from "../../useContext";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "100vh",
		width: "100vw",
		justifyContent: "center",
		alignItems: "center",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		fontFamily: "Helvetica",
		margin: "auto",
	},
	loginWrapper: {
		padding: "20px",
		background: "white",
		width: "500px",
	},
	buttonWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "20px",
	},
	checkboxWrapper: {
		display: "flex",
		alignItems: "center",
	},
	primaryButton: {
		backgroundColor: "#a10070",
		borderRadius: "3px",
		color: "white",
		marginTop: "20px",
		marginLeft: "40%",
		fontStyle: "Arial",
		fontWeight: "bolder",
		textTransform: "none",
		width: "100px",
		height: "40px",
	},
	forgotPassword: {
		color: "#28ADE3",
		cursor: "pointer",
	},
}));

export default function NewUser(props) {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = React.useState(false);
	const [userData, setUserData] = React.useState({});
	const { userHasAuthenticated, setProvider, setUserId } = useAppContext();

	const handleChange = (event) => {
		var newValue = { ...userData };
		newValue[event.target.name] = event.target.value;
		setUserData(newValue);
	};

	const handleSubmit = async () => {
		setLoading(true);
		if (userData.password !== userData.confirmpassword) {
			alert("Passwords do not match.");
			return;
		}
		Auth.signIn(userData.email.toLowerCase(), userData.temppassword)
			.then((user) => {
				if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
					Auth.completeNewPassword(user, userData.password)
						.then((user) => {
							API.post("referall-provider", "getuserprovider", {
								body: {
									user_id: user.username,
								},
							})
								.then((response) => {
									setProvider(response[0].provider);
									userHasAuthenticated(true);
									history.push("/serviceproviders");
									setUserId(userData.user_id);
								})
								.catch((err) => {
									alert("You need to update your password!");
									// history.push("/newuser");
								});
						})
						.catch((err) => {
							console.log(err);
							setLoading(false);
							if (err.code === "UserNotConfirmedException") {
								alert("User is not confirmed.");
							} else if (err.code === "NotAuthorizedException") {
								alert("You entered the incorrect password. Please try again.");
							} else if (err.code === "UserNotFoundException") {
								alert("User not found. Please try again.");
							} else if (err.code === "InvalidPasswordException") {
								alert(
									"Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character "
								);
							} else {
								alert(err.message);
							}
						});
				} else {
					console.log("error");
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.code === "UserNotConfirmedException") {
					alert("User is not confirmed.");
				} else if (err.code === "NotAuthorizedException") {
					alert("You entered the incorrect password. Please try again.");
				} else if (err.code === "UserNotFoundException") {
					alert("User not found. Please try again.");
				} else {
					alert(err.message);
				}
			});
	};

	return (
		<div className={classes.root}>
			<div className={classes.loginWrapper}>
				<p className="textAlignCenter fontHelvetica">Sign in to your account</p>
				<TextField
					className={classes.margin}
					id="new-email-textfield"
					name="email"
					label="Email"
					fullWidth
					onChange={handleChange}
				/>
				<TextField
					className={classes.margin}
					id="temp-password-textfield"
					name="temppassword"
					fullWidth
					label="Temporary Password"
					onChange={handleChange}
				/>
				<TextField
					className={classes.margin}
					id="new-password-textfield"
					name="password"
					type="password"
					fullWidth
					label="Password"
					onChange={handleChange}
				/>
				<TextField
					className={classes.margin}
					id="confirm-password-textfield"
					name="confirmpassword"
					fullWidth
					type="password"
					label="Confirm Password"
					onChange={handleChange}
				/>

				<Button className={classes.primaryButton} onClick={handleSubmit}>
					{loading ? "Loading.." : "Sign Up"}
				</Button>
			</div>
		</div>
	);
}
