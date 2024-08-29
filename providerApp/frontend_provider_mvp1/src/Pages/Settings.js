import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import editbutton from "../Assets/editbutton.png";
//import editbuttonedit from "../Assets/edit-edit.png";
import { Divider } from "@material-ui/core";
import { Auth } from "aws-amplify";

const ColorButton = withStyles((theme) => ({
	root: {
		width: "100px",
		height: "40px",
		textTransform: "none",
		fontFamily: "Arial",
		fontSize: "smaller",
		fontWeight: "bolder",
		letterSpacing: "normal",
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: "#A10070",
		"&:hover": {
			backgroundColor: "#A10070",
		},
	},
}))(Button);

const BlackButton = withStyles((theme) => ({
	root: {
		width: "100px",
		height: "40px",
		textTransform: "none",
		fontFamily: "Arial",
		fontSize: "smaller",
		fontWeight: "bolder",
		letterSpacing: "normal",
		color: "#ffffff",
		backgroundColor: "#000000",
	},
}))(Button);

const Settings = () => {
	const [editPassword, setEditPassword] = useState(false);
	const [email, setEmail] = useState('');

	const [values, setValues] = React.useState({
		newPassword: "",
		oldPassword: "",
	});

	var handleEditButtonClick = () => {
		setEditPassword(true);
	};

	var handleSave = () => {
		Auth.currentAuthenticatedUser()
		.then((username) => {
			Auth.changePassword(username, values.oldPassword, values.newPassword)
			.then((data) => {
				setEditPassword(false);
				setValues({ ...values, oldPassword : '' });
				setValues({ ...values, newPassword : '' });
				alert("Successfully updated password!")
			}).catch((err) => console.log(err));
		}).catch((err) => console.log(err));
	}

	const handleNewPasswordChange = (event) => {
		setValues({ ...values, newPassword : event.target.value });
	};

	const handleOldPasswordChange = (event) => {
		setValues({ ...values, oldPassword : event.target.value });
	};

	const handleCancel = () => {
		setEditPassword(false);
		setValues({ ...values, oldPassword : '' });
		setValues({ ...values, newPassword : '' });
	}

	useEffect(() => {
		Auth.currentAuthenticatedUser().then((user) => {
			console.log(user)
			setEmail(user.attributes.email)
		})
	}, [])

	return (
		<div>
			<h1 className="settings-header">Settings</h1>
				<div className="border-setting">
					<div>
						<span className="settings-style-email">
							<br></br>
							<strong>Email</strong>&emsp;
						</span>
						<span className="email">{email}</span>
					</div>
					<br></br>
					<Divider />
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '500px'}}>
						<p style={{margin: '0'}}>
							<strong>Password</strong>
						</p>
						{editPassword === true ? (
							<div style={{marginLeft: '50px'}}>
								<Input
									placeholder="Old Password"
									onChange={handleOldPasswordChange}
									value={values.oldPassword}
									variant="outlined"
								/>
								<Input
									placeholder="New Password"
									onChange={handleNewPasswordChange}
									value={values.newPassword}
									variant="outlined"
								/>
							</div>
						) : <p style={{margin: '0'}}>********</p>}

						{editPassword === false ? (
							<div>
								<Button onClick={handleEditButtonClick}>
									<figure>
										<img src={editbutton} alt="Icon" />
										<figcaption>Edit</figcaption>
									</figure>
								</Button>
							</div> )
						: null}
					</div>
					<Divider />		
				</div>

				{editPassword === true ? (
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '500px', marginTop: '30px'}}>
							<BlackButton variant="contained"
								color="secondary" onClick={handleCancel}>
								Cancel
							</BlackButton>
							<ColorButton
								variant="contained"
								color="primary"
								onClick={handleSave}
							>
								Save
							</ColorButton>
					</div> 
				): null }
		</div>
	);
};

export default Settings;
