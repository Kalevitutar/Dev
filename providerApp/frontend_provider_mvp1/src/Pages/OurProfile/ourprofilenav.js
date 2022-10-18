import React, { useState } from "react";

import "../../Pages/People/people.css";
import Details from "./Details";
import Basics1 from "./Basics1";
import Nonpublic from "./Nonpublic";

const Ourprofilenav = () => {
	const [active, setActive] = useState("FirstComponent");

	return (
		<React.Fragment>
			<div>
				<h1>Our Profile</h1>
				<nav className="participant-navbar borderBottom1Grey0 ">
					<div
						className={
							active === "FirstComponent" && <Basics1 />
								? "underline-blue "
								: ""
						}
						onClick={() => setActive("FirstComponent")}
					>
						BASICS
					</div>
					<div
						className={
							active === "SecondComponent" && <Details />
								? "underline-blue "
								: ""
						}
						onClick={() => setActive("SecondComponent")}
					>
						DETAILS
					</div>
					<div
						className={
							active === "ThirdComponent" && <Nonpublic />
								? "underline-blue  "
								: ""
						}
						onClick={() => setActive("ThirdComponent")}
					>
						NON PUBLIC INFORMATION
					</div>
				</nav>
				<div className="paddingtTop25">
					{active === "FirstComponent" && <Basics1 />}
					{active === "SecondComponent" && <Details />}
					{active === "ThirdComponent" && <Nonpublic />}
				</div>
			</div>
		</React.Fragment>
	);
};
export default Ourprofilenav;
