import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import API from "@aws-amplify/api";
import { useAppContext } from "../../useContext";
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
import FlagIcon from "@material-ui/icons/Flag";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Badge from "@material-ui/core/Badge";

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

const Clients = (props) => {
	const { provider } = useAppContext();
	const [formSubmitted, setFormSubmitted] = useState(true);
	const [selectedProfileData, setSelectedProfileData] = useState({});
	const [invisible, setInvisible] = React.useState(false);
	let tableRef = React.createRef();
	const [dataClient, setDataClient] = useState([]);

	useEffect(() => {
		setDataClient(props.dataClient);
	}, [props.dataClient]);

	const peopleCallback = () => {
		props.peopleCallback();
	};

	const handleDropdown = (event) => {
		const name = event.target.name;
		setSelectedProfileData({
			...selectedProfileData,
			[name]: event.target.value,
		});
		API.post("referall-provider", "addproviderpeoplenotes", {
			body: {
				participant_status: event.target.value,
				participant_id: selectedProfileData.participant_id,
				provider: provider,
				profileData: selectedProfileData,
			},
		}).then((response) => {
			console.log(response);
			props.peopleCallback();
		});
	};

	const handleBadgeClick = () => {
		setInvisible(true);
	};

	var handleFalse = () => {
		setFormSubmitted(formSubmitted === false);
		console.log(formSubmitted);
		props.handleNavbarVisible();
	};

	var handleClick = (rowData) => {
		setSelectedProfileData(rowData);
		console.log(rowData);

		setFormSubmitted(formSubmitted === false);
		props.handleNavbarVisible();
	};
	const columns = [
		{
			title: "",
			field: "avatar",
			sorting: false,
			render: (rowData) => (
				<div className="flexRow justifySpaceBetween alignCenter">
					{rowData.participant_status.includes("Applied: Awaiting Response") ? (
						<p
							onClick={() => {
								handleBadgeClick();
							}}
							className="marginRight11 marginBottom0"
						>
							<Badge color="secondary" variant="dot" invisible={invisible}>
								<AccountCircleIcon className="avatar-user" />
							</Badge>
						</p>
					) : (
						<p
							onClick={() => {
								handleBadgeClick();
							}}
							className="marginRight11 marginBottom0"
						>
							<AccountCircleIcon className="avatar-user" />
						</p>
					)}
				</div>
			),
		},
		{
			title: "Name",
			field: "preferred_name",
			sorting: false,
			render: (rowData) => (
				// console.log('rowData', rowData)
				<div className="flexRow justifySpaceBetween alignCenter">
					<p className="marginRight11 marginBottom0">
						{rowData.preferred_name}
					</p>
				</div>
			),
		},
		{
			title: "DOB",
			field: "date_of_birth",
			sorting: false,
			render: (rowData) => (
				<div className="flexRow justifySpaceBetween alignCenter">
					<p className="marginRight11 marginBottom0">
						{rowData.date_of_birth}
					</p>
				</div>
			),
		},
		// { title: "Current Location", field: "county_location", sorting: false },
		// { title: "Phone", field: "phone" },
		{
			title: "Current Location",
			field: "county_location",
			sorting: false,
			render: (rowData) => (
				<div className="flexRow justifySpaceBetween alignCenter">
					<p className="marginRight11 marginBottom0">
						{rowData.county_location}
					</p>
				</div>
			),
		},
		// {
		// 	title: "Form Date",
		// 	field: "createdat",
		//  sorting: true,
		// 	render: (rowData) => (
		// 		<div className="flexRow justifySpaceBetween alignCenter">
		// 			<p className="marginRight11 marginBottom0">
		// 				{rowData.created_at}
		// 			</p>
		// 			<img src={rightArrowColorD5D8DD} alt="arrow" className="height17" />
		// 		</div>
		// 	),
		// },
	];

	return (
		<div className="maxWidth95Percent paddingBottom60 tables peopleList">
			{formSubmitted === true ? (
				<div>
					<MaterialTable
						tableRef={tableRef}
						title=""
						icons={tableIcons}
						data={dataClient}
						columns={columns}
						options={{
							search: true,
							searchFieldAlignment: "right",
						}}
						onRowClick={(e, rowData) => handleClick(rowData)}
						components={{
							// Custom "Toolbar" needed to show number of people in the table
							Toolbar: React.memo((props) => {
								return (
									<div className="flexRowReverse justifySpaceBetween alignCenter marginTop25 marginBottom15">
										<MTableToolbar {...props} />

										<p className="fontSize14 lineHeight16 colorBlack2 marginBottom0 ">
											{dataClient ? dataClient.length : 0} People
										</p>
									</div>
								);
							}),
						}}
					/>
				</div>
			) : (
				// if formSubmitted === false, update the parent component of Intake - (PeopleNavbar) and hide the PeopleNavbar <nav>

				//************************************PARTICIPANT INFORMATION**************************************
				<div>
					<div className="participant-bar">
						<span onClick={handleFalse} className="colorGrey3 button ">
							<ArrowBackIosIcon className="arrow-icon " />
							Back
						</span>
						<div className="participant-infobar marginLeft15">
							<AccountCircleIcon className="avatar-icon" />
							<div className="participant-avatar-div">
								<p className="participant-username">
									{selectedProfileData.preferred_name}
								</p>
								<p>
									{selectedProfileData.preferred_name}{" "}
									{selectedProfileData.last_name}
								</p>
							</div>
							<div className="participant-contact">
								<strong className=""> Phone</strong>
								<a href={`tel:${selectedProfileData.phone}`}>
									<span className="participant-phone">
										{selectedProfileData.phone}
									</span>
								</a>
								<br></br>
								<strong className="">Email</strong>
								<a href={`mailto:${selectedProfileData.email}`}>
									<span className="participant-email">
										{selectedProfileData.email}
									</span>
								</a>
								<br></br>
								<div className="notify-status-div">
									<strong className="notify-status-label">
										Notify/ status
									</strong>
									{/* <Select
                    options={options}
                    value={selectedProfileData.participant_status}
                    className="status-dropdown"
                    onChange={handleChangeD}
                  /> */}
									<select
										name="participant_status"
										value={selectedProfileData.participant_status}
										onChange={handleDropdown}
										className="status-dropdown"
									>
										<option value={selectedProfileData.participant_status}>
											{selectedProfileData.participant_status}
										</option>
										<option
											className={
												selectedProfileData.participant_status.includes(
													"Accepted: Call Us for Appointment"
												)
													? "display-none"
													: ""
											}
											value="Accepted: Call Us for Appointment"
										>
											Accepted: Call Us for Appointment
										</option>
										<option
											className={
												selectedProfileData.participant_status.includes(
													"Not Eligible: Call Us for Referall"
												)
													? "display-none"
													: ""
											}
											value="Not Eligible: Call Us for Referall"
										>
											Not Eligible: Call Us for Referall
										</option>
										<option
											className={
												selectedProfileData.participant_status.includes(
													"Unavailable: Unable to Reach"
												)
													? "display-none"
													: ""
											}
											value="Unavailable: Unable to Reach"
										>
											Unavailable: Unable to Reach
										</option>
										<option
											className={
												selectedProfileData.participant_status.includes(
													"Active: Receiving Services Now"
												)
													? "display-none"
													: ""
											}
											value="Active: Receiving Services Now"
										>
											Active: Receiving Services Now
										</option>
									</select>
									<span
										className={
											selectedProfileData.participant_status ===
											"Applied: Awaiting Response"
												? "flag-color adjust-flag "
												: "flag-none adjust-flag"
										}
									>
										<FlagIcon />
									</span>
								</div>
							</div>
						</div>

						<Participantsnavbar
							selectedProfileData={selectedProfileData}
							data={dataClient}
							peopleCallback={peopleCallback}
						/>
					</div>
				</div>
			)}{" "}
		</div>
	);
};
export default Clients;
