import React, { useState, useEffect } from "react";
import Intake from "../../Pages/People/Intake";
import API from "@aws-amplify/api";
import "../../Pages/People/people.css";
import Clients from "../../Pages/People/Clients";
import { useAppContext } from "../../useContext";

const PeopleNavbar = () => {
	const [active, setActive] = useState("FirstComponent");
	const [data, setData] = useState([]);
	const [dataClient, setDataClient] = useState([]);
	const { provider } = useAppContext();

	useEffect(() => {
		API.post("referall-provider", "getintakes", {
			body: {
				provider_name: provider,
				provider: provider,
			},
		}).then((response) => {
			console.log(response);
			console.log(provider);
			setData(response);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [provider]);

	useEffect(() => {
		API.post("referall-provider", "getclients", {
			body: {
				provider_name: provider,
				provider: provider,
			},
		}).then((response) => {
			console.log("clientdata", response);
			setDataClient(response);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	var peopleCallback = () => {
		API.post("referall-provider", "getintakes", {
			body: {
				provider_name: provider,
				provider: provider,
			},
		}).then((response) => {
			console.log(response);
			setData(response);
		});
		API.post("referall-provider", "getclients", {
			body: {
				provider_name: provider,
				provider: provider,
			},
		}).then((response) => {
			console.log(response);
			setDataClient(response);
		});
	};

	const [navbarVisible, setNavbarVisible] = useState(true);

	const handleNavbarVisible = () => {
		setNavbarVisible(!navbarVisible);
	};

	return (
		<React.Fragment>
			<div>
				<h1>People</h1>
				{navbarVisible ? (
					<nav className="participant-navbar borderBottom1Grey0 marginBottom26">
						<div
							className={
								active === "FirstComponent" && <Intake />
									? "underline-blue "
									: ""
							}
							onClick={() => setActive("FirstComponent")}
						>
							INTAKES
						</div>
						<div
							className={
								active === "SecondComponent" && <Clients />
									? "underline-blue "
									: ""
							}
							onClick={() => setActive("SecondComponent")}
						>
							CLIENTS
						</div>
						{/* <div
						className={
							active === "ThirdComponent" && <Alumni /> ? "underline-blue " : ""
						}
						onClick={() => setActive("ThirdComponent")}
					>
						ALUMNI
					</div> */}
					</nav>
				) : null}
				<div>
					{active === "FirstComponent" && (
						<Intake
							data={data}
							peopleCallback={peopleCallback}
							handleNavbarVisible={handleNavbarVisible}
						/>
					)}
					{active === "SecondComponent" && (
						<Clients
							dataClient={dataClient}
							peopleCallback={peopleCallback}
							handleNavbarVisible={handleNavbarVisible}
						/>
					)}
					{/* {active === "ThirdComponent" && <Alumni />} */}
				</div>
			</div>
		</React.Fragment>
	);
};
export default PeopleNavbar;
