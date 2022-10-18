import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { API, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAdd from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import HelpIcon from "@material-ui/icons/Help";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faHandsHelping } from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
import ServiceProviders from "../Pages/ServiceProviders/ServiceProviders";
import Help from "../Pages/Help/Help";
import Settings from "../Pages/Settings";
import AdminAddProvider from "../Pages/AdminAddProvider";
import Ourprofilenav from "../Pages/OurProfile/ourprofilenav";
import PeopleNavbar from "../Pages/People/PeopleNavbar";
import { useAppContext } from "../useContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "20px",
    background: "#007DB3",
    boxShadow: "none",
  },

  text: {
    color: "#007db3",
  },
}));

function ClippedDrawer(props) {
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(false);
  const { provider, userHasAuthenticated, colors, user_id } = useAppContext();
  const { history } = props;
  const color2 = colors[1];
  const color = colors[0];

  useEffect(() => {
    API.post("referall-provider", "getpeopledrawernotification", {
      body: {
        provider_name: provider,
        provider: provider,
      },
    }).then((response) => {
      setInvisible(
        response.notification.includes("Applied: Awaiting Response")
      );
    });
  }, [provider, colors]);

  const handleBadgeClick = () => {
    setInvisible(false);
  };

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}></AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className="orgname"></div>
        <p className="provider-name-drawer">{provider}</p>

        <div
          className="triangle-topleft"
          style={{
            borderTop: `solid 25px ${color}`,
            borderLeft: `solid 25px ${color}`,
          }}
        ></div>
        <div
          className="triangle-bottomright"
          style={{
            borderRight: `solid 25px ${color2}`,
            borderBottom: `solid 25px ${color2}`,
          }}
        ></div>
        <div className="drawer2">
          <Divider />

          <List>
            <ListItem component={Link} to={`/serviceproviders`} button selected>
              <span className="icondrawer">
                <FontAwesomeIcon icon={faHandsHelping} />
              </span>
              <ListItemText className={classes.text} color="primary">
                Service Providers
              </ListItemText>
            </ListItem>
            <ListItem
              button
              selected
              component={Link}
              to={`/people`}
              onClick={() => {
                handleBadgeClick();
              }}
            >
              <span className="icondrawer">
                <Badge color="secondary" variant="dot" invisible={!invisible}>
                  <PeopleIcon />
                </Badge>
              </span>
              <ListItemText className={classes.text} color="primary">
                People
              </ListItemText>
            </ListItem>
            <ListItem component={Link} to={`/ourprofile`} button selected>
              <span className="icondrawer">
                <SmartphoneIcon />
              </span>
              <ListItemText className={classes.text} color="primary">
                Our Profile
              </ListItemText>
            </ListItem>
          </List>
        </div>

        <div className="drawer3">
          <Divider />
          <List>
            <ListItem component={Link} to="/Help" button selected>
              <span className="icondrawer">
                <HelpIcon />
              </span>
              <ListItemText className={classes.text} color="primary">
                Help
              </ListItemText>
            </ListItem>
            <ListItem
              component={Link}
              to="/settings"
              button
              selected
              onClick={() => {
                handleBadgeClick();
              }}
            >
              <span className="icondrawer">
                <SettingsIcon />
              </span>
              <ListItemText className={classes.text} color="primary">
                Settings
              </ListItemText>
            </ListItem>
            <ListItem
              component={Link}
              to="/addprovider"
              button
              selected
              onClick={() => {
                handleBadgeClick();
              }}
            >
              <span className="icondrawer">
                <PersonAdd />
              </span>
              <ListItemText className={classes.text} color="primary">
                Add Provider
              </ListItemText>
            </ListItem>
            <ListItem onClick={handleLogout} button selected>
              <span className="icondrawer">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              <ListItemText className={classes.text} color="primary">
                Sign Out
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className="width100Percent">
        <Route
          path="/serviceproviders"
          component={(props) => (
            <ServiceProviders
              {...props}
              user_id={user_id}
              provider={provider}
            />
          )}
        />
        <Route path="/people" component={() => <PeopleNavbar />} />
        <Route path="/ourprofile" component={() => <Ourprofilenav />} />
        <Route path="/settings" component={() => <Settings />} />
        <Route path="/addprovider" component={() => <AdminAddProvider />} />
        <Route path="/help" component={() => <Help />} />
      </main>
    </div>
  );
}

export default withRouter(ClippedDrawer);
