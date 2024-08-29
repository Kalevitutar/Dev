import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import Peoplenavbar from "../People/PeopleNavbar";
import Participantsnavbar from "../People/ParticipantsNavbar";
import {
	FormControlLabel,
	FormGroup,
	Checkbox,
	Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./people.css";

const ColorButton = withStyles((theme) => ({
	root: {
		height: "40px",
		marginTop: "27%",
		float: "right",
		textAlign: "left",
		fontWeight: "bolder",
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "gray",
		},
	},
}))(Button);

const tableIcons = {
	// Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const People = () => {
	const [data, setData] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(true);
	const [profileData, setProfileData] = useState({});
	const [active, setActive] = useState("FirstComponent");

	var handleChange = (event) => {
		var newData = profileData;
		newData[event.target.name] = event.target.value;
		setProfileData(newData);
	};

	var handleClick = () => {
		setFormSubmitted(!formSubmitted);
	};
	const columns = [
		{ title: "Username", field: "username", sorting: false },
		{ title: "Name", field: "name", sorting: false },
		{ title: "Email", field: "email", sorting: false },
		{ title: "Phone", field: "phone", sorting: false },
		{ title: "Web Link", field: "website", sorting: false },
	];
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((resp) => resp.json())
			.then((resp) => {
				setData(resp);
				console.log("resp", resp);
			});
	}, []);

	return (
		<div style={{ maxWidth: "95%" }}>
			{formSubmitted === true ? (
				<div>
					<h1>People</h1>
					<Peoplenavbar />
					<MaterialTable
						title=""
						icons={tableIcons}
						data={data}
						columns={columns}
						onRowClick={handleClick}
					/>
				</div>
			) : (
				//************************************PARTICIPANT INFORMATION**************************************
				<div className="participant-basics">
					<div>
						<strong>Preferred Name</strong>
						<p>Makayla</p>
						<strong>First Name</strong>
						<p>Makayla</p>
						<strong>Last Name</strong>
						<p>Samsung</p>
						<strong>DOB</strong>
						<p>10/20/2005</p>

						<strong>Identifies as</strong>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										className={
											profileData.survivor_ht ? "labelbold" : "labeldefault"
										}
										checked={profileData.survivor_ht}
										defaultValue={profileData.survivor_ht}
										name="survivor_ht"
										color="primary"
										disabled
									/>
								}
								label="survivor of human trafficking"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={profileData.survivor_exploitation}
										defaultValue={profileData.survivor_exploitation}
										name="survivor_exploitation"
										color="primary"
										disabled
									/>
								}
								label="survivor of commercial sexual exploitation or labor exploitation"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={profileData.sex_worker}
										defaultValue={profileData.sex_worker}
										name="sex_worker"
										color="primary"
										disabled
									/>
								}
								label="sex worker"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={profileData.survivor_dv}
										defaultValue={profileData.survivor_dv}
										name="survivor_dv"
										color="primary"
										disabled
									/>
								}
								label="survivor of domestic violence"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={profileData.survivor_sa}
										defaultValue={profileData.survivor_sa}
										name="survivor_sa"
										color="primary"
										disabled
									/>
								}
								label="survivor of sexual violence"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={profileData.none}
										defaultValue={profileData.none}
										name="none"
										color="primary"
										disabled
									/>
								}
								label="none of the above"
							/>
						</FormGroup>

						<strong>Current Location</strong>
						<p>Alameda County</p>
						<strong>Seeking Services In</strong>
						<p>Alameda County</p>
					</div>
					<div className="provider-notes">
						<ColorButton variant="contained" color="primary" onClick={() => {}}>
							See Matching Providers
						</ColorButton>
						<form size="large">
							<strong>Notes</strong>
							<textarea
								name="provider_nonpublic_info"
								onChange={handleChange}
								// ref={register({ maxLength: 200 })}
								rows="25"
								cols="30"
							/>
							{/* 
              <ColorButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleEditButtonClick();
                  handleSubmit();
                }}
              >
                Save
              </ColorButton> */}
						</form>
					</div>
				</div>
			)}{" "}
		</div>
	);
};
export default People;
