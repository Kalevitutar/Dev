import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import Participantsnavbar from "../People/ParticipantsNavbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./people.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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

const Alumni = () => {
	const [data, setData] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(true);
	const [state, setState] = React.useState({
		age: "",
		name: "hai",
		tableRefCurrentObj: {},
	});

	let tableRef = React.createRef();

	const handleChangeDropdown = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};

	var handleFalse = () => {
		setFormSubmitted(formSubmitted === false);
		console.log(formSubmitted);
	};

	var handleClick = () => {
		setFormSubmitted(!formSubmitted);
	};
	const columns = [
		{ title: "Username", field: "username", sorting: false },
		{ title: "Name", field: "name", sorting: false },
		{ title: "Email", field: "email", sorting: false },
		// { title: "Phone", field: "phone" },
		{ title: "Web Link", field: "website", sorting: false },
	];
	useEffect(() => {
		setState({ tableRefCurrentObj: tableRef.current });

		fetch("https://jsonplaceholder.typicode.com/users")
			.then((resp) => resp.json())
			.then((resp) => {
				setData(resp);
			});
	}, []);

	return (
		<div className="maxWidth95Percent paddingBottom60 tables peopleList">
			{formSubmitted === true ? (
				<div>
					<MaterialTable
						tableRef={tableRef}
						title=""
						icons={tableIcons}
						data={data}
						columns={columns}
						options={{
							search: true,
							searchFieldAlignment: "right",
						}}
						onRowClick={handleClick}
						components={{
							// Custom "Toolbar" needed to show number of people in the table
							Toolbar: React.memo((props) => {
								return (
									<div className="flexRowReverse justifySpaceBetween alignCenter marginTop25 marginBottom15">
										<MTableToolbar {...props} />

										{state.tableRefCurrentObj.state ? (
											<p className="fontSize14 lineHeight16 colorBlack2 marginBottom0 ">
												{state.tableRefCurrentObj.state.data.length} People
											</p>
										) : null}
									</div>
								);
							}),
						}}
					/>
				</div>
			) : (
				//************************************PARTICIPANT INFORMATION**************************************
				<div>
					<div className="participant-bar">
						<span onClick={handleFalse} className="colorGrey3 button">
							<ArrowBackIosIcon />
							Back
						</span>
						<div className="participant-infobar">
							<AccountCircleIcon className="avatar-icon" />
							<div className="participant-avatar-div">
								<p className="participant-username">Makayla</p>
								<p>Makayla Brown</p>
							</div>
							<div className="participant-contact">
								<strong>Phone</strong>
								<span className="participant-phone">{"736-737-744"}</span>
								<br></br>
								<strong>Email</strong>
								<span className="participant-email">{"email@email.com"}</span>
								<br></br>
								<div className="notify-status-div">
									<strong className="notify-status-label">
										Notify/ status
									</strong>
									<FormControl variant="outlined" className="status-dropdown">
										<Select
											native
											value={state.age}
											onChange={handleChangeDropdown}
											inputProps={{
												name: "age",
												id: "outlined-age-native-simple",
											}}
										>
											<option aria-label="None" value="" />
											<option value={10}>Applied: Awaiting Response</option>
											<option value={20}>
												Accepted: Call Us for Appointment
											</option>
											<option value={30}>
												Not elegible: Call Us for Referall
											</option>
											<option value={40}>Unavailable: Unable to Reach</option>
											<option value={50}>Active: Receiving Services Now</option>
										</Select>
									</FormControl>
								</div>
							</div>
						</div>

						<Participantsnavbar />
					</div>
				</div>
			)}{" "}
		</div>
	);
};
export default Alumni;
