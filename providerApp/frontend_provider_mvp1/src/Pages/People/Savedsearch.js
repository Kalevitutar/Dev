import React, { useState, useEffect } from "react";
import API from "@aws-amplify/api";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

import "./people.css";
import MaterialTable from "material-table";
import { useAppContext } from "../../useContext";

const tableIcons = {
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const Savedsearch = ({ selectedProfileData }) => {
	const [data, setData] = useState([]);
	const { provider } = useAppContext();

	let tableRef = React.createRef();

	var search_date_formatted;

	const columns = [
		{
			title: "Search Name",
			field: "search_name",
			sorting: true,
			defaultSort: "asc",
			customSort: (a, b) => {
				let textA = a.search_name.toUpperCase();
				let textB = b.search_name.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			},
			render: (rowData) => (
				<div className="flexRow justifySpaceBetween alignCenter">
					<Link
						to={{
							pathname: "/serviceproviders",
							state: {
								filter: rowData.search_filter_configuration,
							},
						}}
					>
						<p className="marginRight11 marginBottom0">{rowData.search_name}</p>
					</Link>
				</div>
			),
		},
		{
			title: "Date Saved",
			field: "search_date_formatted",
			render: (rowData) => (
				<div className="flexRow justifySpaceBetween alignCenter">
					<div className="displayNone">
						{
							(search_date_formatted = rowData.search_date
								.replace(/-/g, "/")
								.split("/"))
						}

						{search_date_formatted.push(search_date_formatted.shift())}
					</div>

					<p className="marginRight11 marginBottom0">
						{search_date_formatted.join("/")}
					</p>
				</div>
			),
		},
	];

	useEffect(() => {
		API.post("referall-provider", "getparticipantsavedsearches", {
			body: {
				provider: provider,
				participant_id: selectedProfileData.participant_id,
			},
		}).then((response) => {
			console.log(response);
			// var formatVariable = response;
			// var formatGeneral = response.general.split(",");
			setData(response);
			setData(response);
		});
	}, [provider, selectedProfileData.participant_id]);

	return (
		<div className="maxWidth95Percent paddingBottom60 tables peopleList">
			<div>
				<MaterialTable
					tableRef={tableRef}
					title=""
					icons={tableIcons}
					data={data}
					columns={columns}
					localization={{
						toolbar: {
							nRowsSelected: "{0} item(s) selected",
						},
						body: {
							emptyDataSourceMessage: (
								<p className="saved-searches">
									No Saved Searches found <br></br> Find organizations on the
									<a href="/serviceproviders"> Service Providers page</a>, then
									save the search to the client's profile or your saved searches
									area.
								</p>
							),
						},
					}}
					options={{
						search: true,
						searchFieldAlignment: "right",
					}}
				/>
			</div>
		</div>
	);
};
export default Savedsearch;
