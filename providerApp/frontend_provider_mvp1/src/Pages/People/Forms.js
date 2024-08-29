/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import "./people.css";
import MaterialTable from "material-table";

const tableIcons = {
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),

	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
};

const Forms = ({ selectedProfileData }) => {
	const [itemIntake, setItemIntake] = React.useState([]);

	let tableRef = React.createRef();

	const columns = [
		{
			title: "Form Name",
			field: "formName",
			sorting: false,
		},
		{
			title: "Date Completed",
			field: "date",
			sorting: true,
		},
	];

	useEffect(() => {
		var itemIntakeObject = selectedProfileData;

		var itemIntakeArray = [];
		var participantAddress = [];
		Object.keys(itemIntakeObject).map((key) => {
			if (key === "address_line1") {
				if (itemIntakeObject["address_line1"]) {
					participantAddress.push(itemIntakeObject["address_line1"]);
				} else {
					participantAddress = ["Pending answer"];
				}
			} else if (key === "address_line2") {
				if (
					itemIntakeObject["address_line2"] &&
					itemIntakeObject["address_line1"] !== "N/A, homeless"
				) {
					participantAddress.push(itemIntakeObject["address_line2"]);
				}
			} else if (key === "address_city") {
				if (
					itemIntakeObject["address_city"] &&
					itemIntakeObject["address_line1"] !== "N/A, homeless"
				) {
					participantAddress.push(itemIntakeObject["address_city"]);
				}
			} else if (key === "address_state") {
				if (
					itemIntakeObject["address_state"] &&
					itemIntakeObject["address_line1"] !== "N/A, homeless"
				) {
					participantAddress.push(itemIntakeObject["address_state"]);
				}
			} else if (key === "address_zipcode") {
				if (
					itemIntakeObject["address_zipcode"] &&
					itemIntakeObject["address_line1"] !== "N/A, homeless"
				) {
					participantAddress.push(itemIntakeObject["address_zipcode"]);
				}
			} else if (key === "tableData" || key === "createdat" || key === "intake_form_saved_for_later" || key === "intake_form_completed" || key === "participant_id" || key === "participant_status" || key === "participant_status_notification" || key === "provider" || key === "updatedat") {
				console.log("Success!")
			} else if (!itemIntakeObject[key] || (typeof itemIntakeObject[key] === 'object' || itemIntakeObject[key].length ===  0)) {
				console.log("Success!")
			} else if (key === 'preferred_language') {
				let keyName = key.charAt(0).toUpperCase() + key.slice(1);
				let formattedKeyName = keyName.split("_").join(" ");
				var formattedLanguage = itemIntakeObject[key].replace(/[{}]/g, "").replace(/['"]+/g, '');
				itemIntakeArray.push([
					formattedKeyName,
					formattedLanguage,
				]);
			} else {
				let keyName = key.charAt(0).toUpperCase() + key.slice(1);
				let formattedKeyName = keyName.split("_").join(" ");
				itemIntakeArray.push([
					formattedKeyName,
					itemIntakeObject[key],
				]);
			}
		});
		itemIntakeArray.push(["Address", participantAddress.join(", ")]);

		console.log(itemIntakeArray);
		setItemIntake(itemIntakeArray);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="maxWidth95Percent paddingBottom60 tables peopleList">
			<div id="participant-forms">
				<MaterialTable
					tableRef={tableRef}
					title=""
					icons={tableIcons}
					data={[
						{
							formName: "Intake Form",
							date: `${
								selectedProfileData.updatedat.split("T")[0]
							}`,
							item: itemIntake,
							format: selectedProfileData.provider_required_questions,
						},
					]}
					columns={columns}
					options={{
						search: true,
						searchFieldAlignment: "right",
					}}
					detailPanel={[
						{
							tooltip: "Show Name",
							render: (rowData) => {
								return (
									<div>
										<div>
											<ul>
												{rowData.item.map((response, key) => 
												
												{												console.log(response)
													return <p key={key}>
														<strong id={key}>{response[0]}</strong> <br></br>
														{typeof response[1] === "object"
															? response[1].join(", ")
															: response[1]}
													</p>
							})}
											</ul>
										</div>
									</div>
								);
							},
						},
					]}
				/>
			</div>
		</div>
	);
};
export default Forms;
