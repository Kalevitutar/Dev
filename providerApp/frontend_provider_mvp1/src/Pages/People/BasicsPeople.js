import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
//import { API } from "aws-amplify";
import // FormControlLabel,
// FormGroup,
// Checkbox,
//Button,
"@material-ui/core";
//import { withStyles } from "@material-ui/core/styles";
//import Snackbar from "@material-ui/core/Snackbar";
import "./people.css";

// const ColorButton = withStyles((theme) => ({
// 	root: {
// 		height: "40px",
// 		textTransform: "none",
// 		fontFamily: "Arial",
// 		fontSize: "smaller",
// 		fontWeight: "bolder",
// 		letterSpacing: "normal",
// 		color: "white !important",
// 		backgroundColor: "black",
// 		"&:hover": {
// 			backgroundColor: "gray",
// 		},
// 	},
// }))(Button);

const BasicsPeople = (props) => {
  // const [profileData, setProfileData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState([]);

  console.log(selectedProfileData.provider_people_note);

  useEffect(() => {
    setSelectedProfileData(props.selectedProfileData);
  }, [props.selectedProfileData]);

  // const handleClose = (event, reason) => {
  // 	setOpen(false);
  // };

  // var handleChange = (event) => {
  // 	var newData = profileData;
  // 	newData[event.target.name] = event.target.value;
  // 	setProfileData(newData);
  // 	setSelectedProfileData({
  // 		...selectedProfileData,
  // 		[event.target.name]: event.target.value,
  // 	});
  // };

  // var handleSubmit = () => {
  // 	setOpen(true);
  // 	API.post("referall-provider", "addproviderpeoplenotes", {
  // 		body: {
  // 			profileData: profileData,
  // 			provider: selectedProfileData.provider,
  // 			participant_id: selectedProfileData.participant_id,
  // 			participant_status: selectedProfileData.participant_status,
  // 		},
  // 	})
  // 		.then((response) => {
  // 			props.peopleCallback();
  // 			console.log(response);
  // 		})
  // 		.catch((error) => {
  // 			console.log(error);
  // 			console.log("error");
  // 		});
  // };

  return (
    <div>
      <div>
        <div className="participant-basics">
          <div className="width45Percent">
            <strong>Preferred Name</strong>
            <p>
              {selectedProfileData ? selectedProfileData.preferred_name : null}{" "}
            </p>
            <strong>First Name</strong>
            <p>
              {selectedProfileData ? selectedProfileData.preferred_name : null}
            </p>
            <strong>Last Name</strong>
            <p>{selectedProfileData ? selectedProfileData.last_name : null}</p>
            <strong>DOB</strong>
            <p>
              {selectedProfileData ? selectedProfileData.date_of_birth : null}
            </p>

            {/* <strong>Identifies as</strong>
						<FormGroup className="marginBottom20">
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"survivor of human trafficking"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"survivor of human trafficking"
												  )
												: null
										}
										name="survivorship"
										color="primary"
										disabled
									/>
								}
								label="survivor of human trafficking"
							/>
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"survivor of commercial sexual exploitation or labor exploitation"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"survivor of commercial sexual exploitation or labor exploitation"
												  )
												: null
										}
										name="survivor_exploitation"
										color="primary"
										disabled
									/>
								}
								label="survivor of commercial sexual exploitation or labor exploitation"
							/>
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"sex worker"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"sex worker"
												  )
												: null
										}
										name="sex_worker"
										color="primary"
										disabled
									/>
								}
								label="sex worker"
							/>
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"survivor of domestic violence"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"survivor of domestic violence"
												  )
												: null
										}
										name="survivor_dv"
										color="primary"
										disabled
									/>
								}
								label="survivor of domestic violence"
							/>
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"survivor of sexual violence"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"survivor of sexual violence"
												  )
												: null
										}
										name="survivor_sa"
										color="primary"
										disabled
									/>
								}
								label="survivor of sexual violence"
							/>
							<FormControlLabel
								className={
									selectedProfileData
										? selectedProfileData.survivorship.includes(
												"none of the above"
										  )
											? "labelbold "
											: "labeldefault"
										: null
								}
								control={
									<Checkbox
										checked={
											selectedProfileData
												? selectedProfileData.survivorship.includes(
														"none of the above"
												  )
												: null
										}
										name="none_of_the_above"
										color="primary"
										disabled
									/>
								}
								label="none of the above"
							/>
						</FormGroup> */}
            <div className="displayBlock flexRow justifySpaceBetween width80Percent">
              <div>
                <strong>Current Location</strong>
                <p>
                  {selectedProfileData
                    ? selectedProfileData.county_location
                    : null}
                </p>
              </div>
              <div>
                <strong>Seeking Services In</strong>
                <p>
                  {selectedProfileData
                    ? selectedProfileData.county_services
                    : null}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="provider-notes">
						<Link
							className="margin-see-matching"
							to={{
								pathname: "/serviceproviders",
								state: {
									dob: selectedProfileData
										? selectedProfileData.date_of_birth
										: null,
									services_in: selectedProfileData
										? selectedProfileData.county_services
										: null,
								},
							}}
						>
							<ColorButton variant="contained">
								See Matching Providers
							</ColorButton>
						</Link>
						<form size="large">
							<strong>Notes</strong>

							<textarea
								name="provider_people_note"
								id="provider_people_note"
								onChange={handleChange}
								value={selectedProfileData.provider_people_note}
								rows="20"
								cols="30"
							>
								{selectedProfileData.provider_people_note} 
							</textarea>
						</form>
						<button
							className="save-button marginTop15"
							onClick={() => {
								handleSubmit();
							}}
						>
							Save Note
						</button>
						<Snackbar
							anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							open={open}
							autoHideDuration={2000}
							onClose={handleClose}
							message="Note Saved!"
							key={"bottom center"}
							className="saveSearchSuccessSnackbar"
						/>
					</div> */}
        </div>
      </div>
    </div>
  );
};
export default BasicsPeople;
