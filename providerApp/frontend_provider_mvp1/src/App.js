import "./App.css";
import Routes from "./Routes";
import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { AppContext } from "./useContext";
import ReactGA from "react-ga4";
ReactGA.initialize('G-1NN0VSBHL2');


function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [userId, setUserId] = React.useState("");
  const [provider, setProvider] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [colors, setColors] = React.useState("");

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      await Auth.currentUserInfo().then((response) => {
        setUserId(response.attributes.sub);
        API.post("referall-provider", "getuserprovider", {
          body: {
            user_id: response.attributes.sub,
          },
        })
          .then((response) => {
            console.log(response);
            setProvider(response[0].provider);
            setUsername(response[0].username);
            setColors(response[0].avatar_colors);

            history.push("/serviceproviders");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (e) {
      console.log("No current user.");
    }
  }

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <AppContext.Provider
        value={{
          isAuthenticated,
          userHasAuthenticated,
          provider,
          setProvider,
          userId,
          setUserId,
          username,
          setUsername,
          colors,
          setColors,
        }}
      >
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/" component={Routes} exact /> */}
        <Routes />
      </AppContext.Provider>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
