import React, { useState, useEffect } from "react";
import BasicsPeople from "./BasicsPeople";
import Forms from "./Forms";
// import Savedsearch from "./Savedsearch";
import "../../Pages/People/people.css";

const Participantsnavbar = (props) => {
	const [active, setActive] = useState("FirstComponent");
	const [selectedProfileData, setSelectedProfileData] = useState([]);

	useEffect(() => {
		setSelectedProfileData(props.selectedProfileData);
	}, [props.selectedProfileData]);

	const peopleCallback = () => {
		props.peopleCallback();
	};

	return (
		<React.Fragment>
			<div>
				<nav className="participant-navbar marginBottom24">
					<div
						className={
							active === "FirstComponent" && <BasicsPeople />
								? "underline-blue "
								: ""
						}
						onClick={() => setActive("FirstComponent")}
					>
						BASICS
					</div>
					<div
						className={
							active === "SecondComponent" && <Forms /> ? "underline-blue " : ""
						}
						onClick={() => setActive("SecondComponent")}
					>
						FORMS
					</div>
					{/* <div
						className={
							active === "ThirdComponent" && <Savedsearch />
								? "underline-blue "
								: ""
						}
						onClick={() => setActive("ThirdComponent")}
					>
						SAVED SEARCHES
					</div> */}
				</nav>
				<div>
					{active === "FirstComponent" && (
						<BasicsPeople
							selectedProfileData={selectedProfileData}
							peopleCallback={peopleCallback}
						/>
					)}
					{active === "SecondComponent" && (
						<Forms selectedProfileData={selectedProfileData} />
					)}
					{/* {active === "ThirdComponent" && (
						<Savedsearch selectedProfileData={selectedProfileData} />
					)} */}
				</div>
			</div>
		</React.Fragment>
	);
};
export default Participantsnavbar;
