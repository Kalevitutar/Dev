import React from "react";
import { Switch } from "react-router-dom";
import Login from "./Pages/Login";
import Login2 from "./Pages/Login2";
import LeftDrawer from "./Components/LeftDrawer";
import NewUser from "./Pages/Login/NewUser";
import UnauthenticatedRoute from "./Components/Routes/UnauthenticatedRoute";
import AuthenticatedRoute from "./Components/Routes/AuthenticatedRoute";
import { useAppContext } from "./useContext";

export default function Routes() {
	const { provider } = useAppContext();

	return (
		<Switch>
			<UnauthenticatedRoute path="/resetpassword">
				<Login2 />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute path="/newuser">
				<NewUser />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute path="/" exact>
				<Login />
			</UnauthenticatedRoute>
			<AuthenticatedRoute path="/serviceproviders" exact>
				<LeftDrawer />
			</AuthenticatedRoute>

			<AuthenticatedRoute path="/people" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/ourprofile" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/settings" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/help" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
			{provider === 'Future Works' ? (
				<AuthenticatedRoute path="/addprovider" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
			) : null}
			<AuthenticatedRoute path="/help/helpform" exact>
				<LeftDrawer />
			</AuthenticatedRoute>
		</Switch>
	);
}
