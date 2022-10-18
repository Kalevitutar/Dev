import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import editbutton from "../../Assets/editbutton.png";
import { Button } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { useAppContext } from "../../useContext";

const ColorButton = withStyles((theme) => ({
  root: {
    width: "100px",
    height: "40px",
    textAlign: "left",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: "smaller",
    fontWeight: "bolder",
    letterSpacing: "Open Sans",
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#A10070",
    "&:hover": {
      backgroundColor: "#A10070",
    },
  },
}))(Button);

const Details = (props) => {
  const [profileData, setProfileData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(true);
  const { provider } = useAppContext();

  var handleEditButtonClick = () => {
    setFormSubmitted(!formSubmitted);
  };

  var handleChange = (event) => {
    var newData = profileData;
    newData[event.target.name] = event.target.value;
    setProfileData(newData);
  };

  useEffect(() => {
    API.post("referall-provider", "getproviderprofiledata", {
      body: {
        provider_name: provider,
      },
    }).then((response) => {
      console.log(response[0]); // ! Data is coming into the front end as a nested array so will have to select nested object with [0]
      setProfileData(response[0]);
    });
  }, [provider]);

  var handleSubmit = () => {
    console.log(profileData);
    API.post("referall-provider", "addproviderprofiledetails", {
      body: {
        profileData: profileData,
        provider_name: provider,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/*****************************DETAILS PAGE******************************/}
      {formSubmitted === true ? (
        <div className="detailsform">
          <div>
            <p>
              <strong>Who We Help</strong>
            </p>
            <p className="pdetails">{profileData.org_for_who}</p>
            <br></br>
            <p>
              <strong>Our Services</strong>
            </p>
            <p className="pdetails">{profileData.org_our_services}</p>
            <br></br>
            <p>
              <strong>Who We Are</strong>
            </p>
            <p className="pdetails">{profileData.org_we_are}</p>
          </div>
          <div className="edit-button">
            <Button className="edit-button" onClick={handleEditButtonClick}>
              <figure>
                <img src={editbutton} alt="Icon" />
                <figcaption>Edit</figcaption>
              </figure>
            </Button>
          </div>
        </div>
      ) : (
        //   ********************EDIT DETAILS COMPONENT****************************************
        <div className="detailseditform">
          <div>
            <form size="large">
              <p>
                <label htmlFor="org_for_who">
                  <strong>Who We Help</strong>
                </label>
              </p>
              <textarea
                name="org_for_who"
                id="org_for_who"
                // ref={register({ maxLength: 400 })}
                onChange={handleChange}
                rows="4"
                cols="80"
              >
                {profileData.org_for_who}
              </textarea>
              <p>
                <label htmlFor="org_our_services">
                  <strong>Our Services</strong>
                </label>
              </p>
              <textarea
                name="org_our_services"
                id="org_our_services"
                // ref={register({ maxLength: 400 })}
                onChange={handleChange}
                rows="4"
                cols="80"
              >
                {profileData.org_our_services}
              </textarea>
              <p>
                <label htmlFor="org_we_are">
                  <strong>Who We Are</strong>
                </label>
              </p>
              <textarea
                name="org_we_are"
                id="org_we_are"
                //className=" marginBottom20Percent "
                onChange={handleChange}
                // ref={register({ maxLength: 400 })}
                rows="15"
                cols="80"
              >
                {profileData.org_we_are}
              </textarea>
            </form>
            <div className="displayBlock flexRow justifySpaceBetween width80Percent">
              <Link to="/ourprofile">
                <button className="cancel-button">Cancel</button>
              </Link>
              <ColorButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleEditButtonClick();
                  handleSubmit();
                }}
              >
                Save
              </ColorButton>
              {/* <div className="edit-button">
							{" "}
							<Button className="edit-button-edit" disabled>
								<figure>
									<img src={editbuttonedit} alt="Icon" />
									<figcaption>Edit</figcaption>
								</figure>
							</Button>
						</div> */}
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Details;
