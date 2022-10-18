import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Help/help.css";
import { useForm } from "react-hook-form";
// import ErrorMessage from "../../Components/errormsg";
import { API } from "aws-amplify";

// begin accordion imports
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// end accordion imports

import ReactPlayer from "react-player";
const Help1 = (props) => {
	// const { register, handleSubmit, formState, errors } = useForm({
	// 	mode: "onChange",
	// });
	const { register, handleSubmit, formState } = useForm({
		mode: "onChange",
	});

	const [formSubmitted, setFormSubmitted] = useState(true);
	var handleEditButtonClick = () => {
		setFormSubmitted(!formSubmitted);
	};

	var submitForm = (data) => {
		console.log(data);
		API.post("referall-provider", "addhelpform", {
			body: { data },
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
		setFormSubmitted(!formSubmitted);
	};
	return (
		<div>
			{formSubmitted === true ? (
				<div>
					<h1>Help &#38; Tutorials</h1>
					<br></br>
					<h2>Overview of the ReferAll Platform</h2>{" "}
					<ReactPlayer url="https://www.youtube.com/watch?v=mwqIZ0eafgQ" />
					<Link className="link-instructions">
						<p>Read step-by-step instructions instead</p>
					</Link>
					<h2>FAQs</h2>
					{/* <Accordion>
        				<AccordionSummary
          					expandIcon={<ExpandMoreIcon />}
          					aria-controls="panel1a-content"
          					id="panel1a-header"
        				>
							<Typography>
								<strong>Where is the client data I stored?</strong>
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
          					<Typography>
								<p className="client-data">
									Client Data is Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the industry's standard
									dummy text ever since the 1500s, when an unknown printer took a
									galley of type and scrambled it to make a type specimen book. It has
									survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in
									the 1960s with the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software like
									Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</Typography>
						</AccordionDetails>
					</Accordion> */}
					<h2>Need Help</h2>
					<p className="client-data">
						If you can't find what you need on this page, please{" "}
						<button onClick={handleEditButtonClick}>contact us</button>. We'll
						get back to you within 1-2 business days.
					</p>
				</div>
				// HERE ENDS THE TRUE RENDER CONDITION OF THE HELP PAGE
			) : (
				<div className="width80Percent">
					<h1>Help &#38; and Tutorials</h1>
					<br></br>
					<h2>Contact Us</h2>
					<p>We'll get back to you in 1-2 business days.</p>
					<form className=" width50Percent ">
						{/* <label>Your name</label>
						<input
							className="width100Percent height35 border1Grey0 marginBottom15"
							name="provider_user_name"
							ref={register({ required: true })}
						/>
						<ErrorMessage error={errors.provider_user_name} />
						<label>Your organization</label>
						<input
							className="width100Percent height35 border1Grey0 marginBottom15"
							name="provider_organization_name"
							ref={register({ required: true })}
						/>
						<ErrorMessage error={errors.provider_organization_name} />
						<label>Your email</label>
						<input
							className="width100Percent height35 border1Grey0 marginBottom15"
							name="provider_email"
							ref={register({ required: true })}
						/>
						<ErrorMessage error={errors.provider_email} /> */}
						<p>
							<label htmlFor="provider_message">
								<strong>Add your message</strong>
							</label>
						</p>
						<textarea
							className="width100Percent border1Grey0 marginBottom26"
							name="provider_message"
							id="provider_message"
							ref={register({ required: true, maxLength: 1000 })}
							rows="12"
							cols="60"
						/>
						<div className="flexRow justifySpaceBetween width100Percent">
							<Link to="/help">
								<button className="cancel-button">Cancel</button>
							</Link>
							<Link to="/help">
								<button
									className={
										!formState.isValid
											? "save-helpform-disabled"
											: "save-helpform-button"
									}
									type="submit"
									disabled={!formState.isValid}
									onClick={handleSubmit(submitForm)}
								>
									Save
								</button>
							</Link>
						</div>

						{/* For button dimming: Will need conditional rendering for the className/color. If string in the useState for yourName, yourOrg, yourEmail, and addYourMessage all have a .length that is >= 2, then give the button a className for the #A10070 color, else give the button a className for the #D5D8DD color. */}
					</form>
				</div>
			)}
		</div>
	);
};

export default Help1;
