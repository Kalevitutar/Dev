import React from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { Input } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAppContext } from "../useContext";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import ForgotPassword from "../Pages/Login/ForgotPassword";

const Login = () => {
	const [values, setValues] = React.useState({
		email: "",
		showPassword: false,
	});
	const history = useHistory();
	const {
		userHasAuthenticated,
		setUserId,
		setProvider,
		setUsername,
		setColors,
	} = useAppContext();
	const [forgotPassword, setForgotPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handlePasswordChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleForgotPassword = () => {
		setForgotPassword(true);
	};

	const callBack = () => {
		setForgotPassword(false);
	};

	const handleSubmit = () => {
		Auth.signIn(values.email.toLowerCase(), values.password)
			.then((response) => {
				setUserId(response.username);
				API.post("referall-provider", "getuserprovider", {
					body: {
						user_id: response.username,
					},
				})
					.then((response) => {
						console.log(response);
						setProvider(response[0].provider);
						setUsername(response[0].username);
						setColors(response[0].avatar_colors);
						// localStorage.setItem("provider", response[0].provider);
						console.log(response);
						userHasAuthenticated(true);
						history.push("/serviceproviders");
					})
					.catch((err) => {
						console.log(err);
						alert(
							"You don't have an assigned organization, please contact referallinfo@anniecannons.com!"
						);
					});
			})
			.catch((err) => {
				console.log(err.code);
				if (err.code === "NotAuthorizedException") {
					alert("You entered the incorrect password. Please try again.");
				} else if (err.code === "UserNotFoundException") {
					alert("You have entered an invalid e-mail address. Please try again");
				} else if (err.code === "InvalidParameterException") {
					alert("Please enter a password.");
				} else if (err.code === undefined) {
					alert("Fields can not be empty.");
					// } else {
					//   alert(
					//     "Please contact referallinfo@anniecannons.com for help logging in."
					//   );
				}
			});
	};

	return (
		<div className="login-page">
			<h1 className="marginBottom60">ReferAll Sign In </h1>
			<div className="edit-settings">
				<form size="large">
					{/* <ErrorMessage error={errors.orgname} /> */}
					<div className="marginBottom36">
						<label className="settings-style-email">Email</label>
						<Input
							type={values.email}
							placeholder="  example@email.com "
							onChange={handlePasswordChange("email")}
							value={values.email}
							variant="outlined"
						/>
						{/* <ErrorMessage error={errors.orgname} /> */}
					</div>

					<div>
						<label className="settings-style">Password</label>
						<Input
							type={values.showPassword ? "text" : "password"}
							onChange={handlePasswordChange("password")}
							value={values.password}
							variant="outlined"
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
						/>{" "}
					</div>
					<p
						className="marginBottom60 fontSize14 button underline"
						onClick={handleForgotPassword}
					>
						Forgot your password?/Reset password
					</p>

					<ForgotPassword open={forgotPassword} callBack={callBack} />
				</form>
			</div>

			<button className="button-signin" onClick={handleSubmit}>
				Sign In
			</button>
			<p className="marginBottom60 ">
				New ReferAll User? <Link to="/newuser">Sign Up here</Link>
			</p>
		</div>
	);
};

export default Login;
