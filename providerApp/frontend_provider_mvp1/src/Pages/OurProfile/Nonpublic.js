import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import editbutton from "../../Assets/editbutton.png";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { API } from "aws-amplify";
import { useAppContext } from "../../useContext";

const ColorButton = withStyles((theme) => ({
	root: {
		width: "100px",
		height: "40px",
		textAlign: "left",
		textTransform: "none",
		fontFamily: "Arial",
		fontSize: "smaller",
		fontWeight: "bolder",
		letterSpacing: "Open Sans",
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: "#A10070",
		"&:hover": {
			backgroundColor: "#A10070",
		},
	},
}))(Button);

const Nonpublic = (props) => {
	const [profileData, setProfileData] = useState({});
	const [formSubmitted, setFormSubmitted] = useState(true);
	const { provider } = useAppContext();

	var handleEditButtonClick = () => {
		setFormSubmitted(!formSubmitted);
	};

	var handleChange = (event) => {
		var newData = profileData;
		newData[event.target.name] = event.target.value;
		setProfileData(newData);
	};

	useEffect(() => {
		API.post("referall-provider", "getproviderprofiledata", {
			body: {
				provider_name: provider,
			},
		}).then((response) => {
			console.log(response[0]); // ! Data is coming into the front end as a nested array so will have to select nested object with [0]
			setProfileData(response[0]);
		});
	}, [provider]);

	var handleSubmit = () => {
		console.log(profileData);
		API.post("referall-provider", "addproviderprofilenonpublic", {
			body: {
				profileData: profileData,
				provider_name: provider,
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			{formSubmitted === true ? (
				<div className="nonpublicform">
					<p className="Pnonpublic">
						The following confidential information is for providers only. It is
						not to be shared with clients or the public
					</p>
					<p className="Pnonpublic">{profileData.provider_nonpublic_info}</p>
					<div className="edit-button">
						{" "}
						<Button className="edit-button" onClick={handleEditButtonClick}>
							<figure>
								<img src={editbutton} alt="Icon" />
								<figcaption>Edit</figcaption>
							</figure>
						</Button>
					</div>
				</div>
			) : (
				//   {/* // *********************EDIT NON PUBLIC COMPONENT********************************* */}
				<div className="nonpubliceditform">
					<p className="Pnonpublic">
						The following confidential information is for providers only. It is
						not to be shared with clients or the public
					</p>
					<form size="large">
						<p>
							<label htmlFor="provider_nonpublic_info">
								<strong>Note</strong>
							</label>
						</p>
						<textarea
							//className="marginBottom30Percent"
							name="provider_nonpublic_info"
							onChange={handleChange}
							// ref={register({ maxLength: 200 })}
							rows="15"
							cols="80"
						>
							{profileData.provider_nonpublic_info}
						</textarea>
					</form>
					<div className="displayBlock flexRow justifySpaceBetween">
						<Link to="/ourprofile">
							<button className="cancel-button">Cancel</button>
						</Link>
						<ColorButton
							variant="contained"
							color="primary"
							onClick={() => {
								handleEditButtonClick();
								handleSubmit();
								// submitForm();
							}}
						>
							Save
						</ColorButton>
						{/* <div className="edit-button">
								{" "}
								<Button className="edit-button-edit" disabled>
									<figure>
										<img src={editbuttonedit} alt="Icon" />
										<figcaption>Edit</figcaption>
									</figure>
								</Button>
							</div> */}
					</div>
				</div>
			)}{" "}
		</div>
	);
};

export default Nonpublic;
