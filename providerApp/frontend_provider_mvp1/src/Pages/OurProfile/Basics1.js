import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import editbutton from "../../Assets/editbutton.png";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
//import ErrorMessage from "../errormsg";
import NumberFormat from "react-number-format";
import "../OurProfile/ourprofile.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import { API } from "aws-amplify";
import { SketchPicker } from "react-color";
import Tippy from "@tippyjs/react";
import locationIconColor8F98A3 from "../../Assets/locationIconColor#8F98A3.png";
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
    letterSpacing: "normal",
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#A10070",
    "&:hover": {
      backgroundColor: "#A10070",
    },
  },
}))(Button);

const Basics1 = (props) => {
  const [profileData, setProfileData] = useState(null); // Data from the database. Will not be changed locally
  const [changeData, setChangeData] = useState(null); // Data from the database that CAN be changed locally from text field onChange.
  const [colorData, setColor] = useState("white");
  const [colorData2, setColor2] = useState("white");
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const { provider, setColors } = useAppContext();

  useEffect(() => {
    API.post("referall-provider", "getproviderprofiledata", {
      body: {
        provider_name: provider,
      },
    }).then((response) => {
      setProfileData(response[0]);
      setChangeData(response[0]);
      if (response[0]) {
        setColor(response[0].avatar_colors[1]);
        setColor2(response[0].avatar_colors[0]);
      }
    });
  }, [provider]);

  // console.log(profileData.avatar1);

  var handleEditButtonClick = () => {
    setFormSubmitted(!formSubmitted);
  };

  var handleChange = (event) => {
    var newData = changeData;
    newData[event.target.name] = event.target.value;
    setChangeData(newData);
  };

  var handleCheckboxChange = (event) => {
    var newData = { ...profileData };
    if (event.target.checked) {
      newData.provider_ages_served.push(event.target.name);
    } else {
      newData.provider_ages_served.splice(
        newData.provider_ages_served.indexOf(event.target.name),
        1
      );
    }
    setProfileData(newData);
  };

  var handleCheckboxServices = (event) => {
    var newData = { ...profileData };
    if (event.target.checked) {
      newData.provider_services_offered.push(event.target.name);
    } else {
      newData.provider_services_offered.splice(
        newData.provider_services_offered.indexOf(event.target.name),
        1
      );
    }
    setProfileData(newData);
  };

  var handleCheckboxGender = (event) => {
    var newData = { ...profileData };
    if (event.target.checked) {
      newData.provider_genders_served.push(event.target.name);
    } else {
      newData.provider_genders_served.splice(
        newData.provider_genders_served.indexOf(event.target.name),
        1
      );
    }
    setProfileData(newData);
  };

  var handleCheckboxCharact = (event) => {
    var newData = { ...profileData };
    if (event.target.checked) {
      newData.provider_other_characteristics.push(event.target.name);
    } else {
      newData.provider_other_characteristics.splice(
        newData.provider_other_characteristics.indexOf(event.target.name),
        1
      );
    }
    setProfileData(newData);
  };

  var handleCheckboxLocation = (event) => {
    var newData = { ...profileData };
    if (event.target.checked) {
      newData.provider_county.push(event.target.name);
    } else {
      newData.provider_county.splice(
        newData.provider_county.indexOf(event.target.name),
        1
      );
    }
    setProfileData(newData);
  };

  var handleSubmit = () => {
    console.log(changeData);
    API.post("referall-provider", "addproviderprofilebasics", {
      body: {
        profileData: changeData,
        provider_name: provider,
        avatar_colors: [colorData2, colorData],
      },
    })
      .then((response) => {
        console.log(response);
        setColors([colorData2, colorData]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // TODO: remove all the default value for the checkboxes

    <div className=" fontSize16 lineHeight21">
      {/* Button, on click, change state to allow user to see form */}
      {formSubmitted === true && profileData ? (
        <div className="basicsform">
          <div>
            <p className="marginBottom10 bold">Hours</p>
            {profileData.provider_start_hours &&
            profileData.provider_close_hours ? (
              <p>
                {profileData.provider_start_hours} -{" "}
                {profileData.provider_close_hours}
              </p>
            ) : null}

            <p
              className={
                !profileData.provider_phone
                  ? "colorGrey3 marginBottom10 bold"
                  : "marginBottom10 bold"
              }
            >
              Phone
            </p>

            <a href={`tel:${profileData.provider_phone}`}>
              <p className={!profileData.provider_phone ? "colorGrey3" : ""}>
                {profileData.provider_phone}
              </p>
            </a>
            <p
              className={
                !profileData.provider_hotline
                  ? "colorGrey3 marginBottom10 bold"
                  : "marginBottom10 bold"
              }
            >
              24-hr Hotline
            </p>
            <a href={`tel:${profileData.provider_hotline}`}>
              <p className={!profileData.provider_hotline ? "colorGrey3" : ""}>
                {profileData.provider_hotline}
              </p>
            </a>
            <p className="marginBottom10 bold">Address</p>
            <div className="flexRow">
              <p>{profileData.provider_address1}</p>
              <img
                className="height20 marginLeft15"
                src={locationIconColor8F98A3}
                alt="location-icon"
              />
            </div>

            <div className="flexRow">
              <p>{profileData.provider_address2}</p>
              <img
                className="height20 marginLeft15"
                src={locationIconColor8F98A3}
                alt="location-icon"
              />
            </div>

            <div className="flexRow">
              <p>{profileData.provider_address3}</p>
              <img
                className="height20 marginLeft15"
                src={locationIconColor8F98A3}
                alt="location-icon"
              />
            </div>

            <br></br>
            <p className="marginBottom10 bold">Website &amp; Social Media </p>
            <a
              href={profileData.provider_website}
              target="_blank"
              rel="noreferrer"
            >
              <p className="url-css">{profileData.provider_website}</p>
            </a>
            <a
              href={profileData.provider_facebook}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href={profileData.provider_instagram}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            {/* </div> //closing for hours */}

            {/* --------------------------- non edit Profile -------------------------------------------- */}
            <div className="nonEditFormProfile ">
              <p className="bold marginTop25 marginBottom10  ">Location</p>
              <FormGroup className="marginBottom20">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Alameda County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Alameda County"
                      color="primary"
                      disabled
                    />
                  }
                  label="Alameda County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Contra Costa County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Contra Costa County"
                      color="primary"
                      disabled
                    />
                  }
                  label="Contra Costa County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Marin County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Marin County"
                      color="primary"
                      disabled
                    />
                  }
                  label="Marin County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Monterrey County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Monterrey County"
                      color="primary"
                      disabled
                    />
                  }
                  label="Monterrey County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "San Francisco County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="San Francisco County"
                      color="primary"
                      disabled
                    />
                  }
                  label="San Francisco County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "San Mateo County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="San Mateo County"
                      color="primary"
                      disabled
                    />
                  }
                  label="San Mateo County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Santa Cruz County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Santa Cruz County"
                      color="primary"
                      disabled
                    />
                  }
                  label="Santa Cruz County"
                />
              </FormGroup>
            </div>
          </div>

          {/* --------------------------- non edit Profile -------------------------------------------- */}
          <div>
            <p className="marginBottom10 bold">Ages Served</p>
            <FormGroup className="marginBottom20">
              <FormControlLabel
                className={profileData.under18 ? "labelbold" : "labeldefault"}
                control={
                  <Checkbox
                    checked={profileData.provider_ages_served.includes(
                      "Under 18 yrs old"
                    )}
                    name="under18"
                    color="primary"
                    disabled
                  />
                }
                label="Under 18 yrs old"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_ages_served.includes(
                      "16 - 24 years old"
                    )}
                    defaultValue={profileData.under24}
                    name="under24"
                    color="primary"
                    disabled
                  />
                }
                label="16 - 24 years old"
              />
              {/* Example: If "18 years old and older" exist in the provider_ages_served array check true if not false */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_ages_served.includes(
                      "18 years old and older"
                    )}
                    // defaultValue={profileData.ages_served}
                    name="over18"
                    color="primary"
                    disabled
                  />
                }
                label="18 years old and older"
              />
            </FormGroup>
            {/* --------------------------- non edit Profile -------------------------------------------- */}
            <p className="marginBottom10 bold">Types of Services offered</p>
            <FormGroup className="marginBottom20">
              <FormControlLabel
                control={
                  <Checkbox
                    className={
                      profileData.housing ? "labelbold" : "labeldefault"
                    }
                    checked={profileData.provider_services_offered.includes(
                      "Housing"
                    )}
                    defaultValue={profileData.housing}
                    name="housing"
                    color="primary"
                    disabled
                  />
                }
                label="Housing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_services_offered.includes(
                      "Job Training"
                    )}
                    defaultValue={profileData.jobtraining}
                    name="jobtraining"
                    color="primary"
                    disabled
                  />
                }
                label="Job Training"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_services_offered.includes(
                      "Legal"
                    )}
                    defaultValue={profileData.legal}
                    name="legal"
                    color="primary"
                    disabled
                  />
                }
                label="Legal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_services_offered.includes(
                      "Financial"
                    )}
                    name="financial"
                    color="primary"
                    disabled
                  />
                }
                label="Financial"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_services_offered.includes(
                      "Counseling"
                    )}
                    name="counseling"
                    color="primary"
                    disabled
                  />
                }
                label="Counseling"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_services_offered.includes(
                      "Case Management"
                    )}
                    name="casemanagement"
                    color="primary"
                    disabled
                  />
                }
                label="Case Management"
              />
            </FormGroup>
            {/* --------------------------- non edit Profile -------------------------------------------- */}
            <p className="marginBottom10 bold">Genders Served</p>
            <FormGroup className="marginBottom20">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Female"
                    )}
                    name="female"
                    color="primary"
                    disabled
                  />
                }
                label="Female"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Trans-Female"
                    )}
                    name="transfemale"
                    color="primary"
                    disabled
                  />
                }
                label="Trans-Female"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Trans-Male"
                    )}
                    name="transmale"
                    color="primary"
                    disabled
                  />
                }
                label="Trans-Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Male"
                    )}
                    name="male"
                    color="primary"
                    disabled
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Non-binary"
                    )}
                    className={profileData.nonbinary ? "disablecheck" : ""}
                    name="nonbinary"
                    color="primary"
                    disabled
                  />
                }
                label="Non-binary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_genders_served.includes(
                      "Fluid"
                    )}
                    name="fluid"
                    color="primary"
                    disabled
                  />
                }
                label="Fluid"
              />
            </FormGroup>
            {/* --------------------------- non edit Profile -------------------------------------------- */}
            <p className="marginBottom10 bold">Other Characteristics</p>
            <FormGroup className="marginBottom20">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_other_characteristics.includes(
                      "Virtual Services"
                    )}
                    defaultValue={profileData.virtualservices}
                    name="virtualservices"
                    color="primary"
                    disabled
                  />
                }
                label="Virtual Services"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_other_characteristics.includes(
                      "Open Now"
                    )}
                    defaultValue={profileData.opennow}
                    name="opennow"
                    color="primary"
                    disabled
                  />
                }
                label="Open Now"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_other_characteristics.includes(
                      "Drop-in Available"
                    )}
                    defaultValue={profileData.dropin}
                    name="dropin"
                    color="primary"
                    disabled
                  />
                }
                label="Drop-in Available"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_other_characteristics.includes(
                      "Faith-based"
                    )}
                    defaultValue={profileData.faithbased}
                    name="faithbased"
                    color="primary"
                    disabled
                  />
                }
                label="Faith-based"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={profileData.provider_other_characteristics.includes(
                      "Children Allowed"
                    )}
                    defaultValue={profileData.childrenallowed}
                    name="Children Allowed"
                    color="primary"
                    disabled
                  />
                }
                label="Children Allowed"
              />
            </FormGroup>
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
      ) : null}
      {/* -------------------------// editable Our Profile form ---------------------------*/}
      {formSubmitted === false && profileData ? (
        <div>
          <div className="basic-edit-form">
            <div>
              <div className="label-basics">
                <p className="bold marginBottom10 ">
                  Pick the colors of your organization
                </p>
                <div className="displayBlock flexRow justifySpaceBetween width80Percent">
                  <Tippy
                    interactive={true}
                    placement={"bottom"}
                    content={
                      <SketchPicker
                        false
                        color={colorData2}
                        onChange={(color) => {
                          setColor2(color.hex);
                        }}
                      />
                    }
                  >
                    <div
                      className="blog-left"
                      style={{ backgroundColor: colorData2 }}
                      onClick={() => setOpen(!open)}
                    ></div>
                  </Tippy>{" "}
                  &emsp;
                  <Tippy
                    interactive={true}
                    placement={"bottom"}
                    content={
                      <SketchPicker
                        false
                        color={colorData}
                        onChangeComplete={(color) => setColor(color.hex)}
                      />
                    }
                  >
                    <div
                      className="blog-right"
                      style={{ backgroundColor: colorData }}
                      onClick={() => setOpen(!open)}
                    ></div>
                  </Tippy>
                </div>
                <br></br>
                <p className="bold marginBottom10 ">Hours</p>
                <TextField
                  inputProps={{ style: { textAlign: "center" } }}
                  name="provider_start_hours"
                  defaultValue={profileData.provider_start_hours}
                  placeholder="8:00am"
                  id="provider_start_hours"
                  onChange={handleChange}
                />
                &ensp;<span>to</span>&ensp;
                <br></br>
                <TextField
                  inputProps={{ style: { textAlign: "center" } }}
                  name="provider_close_hours"
                  defaultValue={profileData.provider_close_hours}
                  placeholder="6:00pm"
                  id="provider_close_hours"
                  onChange={handleChange}
                />
                <br></br>
              </div>
              <div className="label-basics">
                <p className="bold marginBottom10 ">Phone</p>
                <div>
                  <NumberFormat
                    customInput={TextField}
                    type="tel"
                    name="provider_phone"
                    defaultValue={profileData.provider_phone}
                    onChange={handleChange}
                    format="+1 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                  />
                </div>
              </div>
              <div className="label-basics">
                <p className="bold marginBottom10 ">24-hr Hotline</p>
                <div>
                  <NumberFormat
                    customInput={TextField}
                    type="tel"
                    name="provider_hotline"
                    defaultValue={profileData.provider_hotline}
                    onChange={handleChange}
                    format="+1 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                  />
                </div>
              </div>
              <div className="label-basics">
                <p className="bold marginBottom10">Address</p>
                <input
                  name="provider_address1"
                  defaultValue={profileData.provider_address1}
                  placeholder="100 Center Street, City, State Zip"
                  onChange={handleChange}
                />
                {/* <ErrorMessage error={errors.address1} /> */}
                <input
                  name="provider_address2"
                  defaultValue={profileData.provider_address2}
                  placeholder="100 Center Street, City, State Zip"
                  onChange={handleChange}
                />
                <input
                  name="provider_address3"
                  defaultValue={profileData.provider_address3}
                  placeholder="100 Center Street, City, State Zip"
                  onChange={handleChange}
                />
              </div>
              <p className="bold marginBottom10 ">
                Website &amp; Social Media{" "}
              </p>
              <input
                name="provider_website"
                placeholder="https://www.websiteName.com"
                // ref={register({
                //   pattern: {
                //     value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                //     message: "invalid email address",
                //   },
                // })}
                defaultValue={profileData.provider_website}
                onChange={handleChange}
              />
              <p className="bold marginBottom10 ">Instagram Link </p>
              <input
                name="provider_instagram"
                defaultValue={profileData.provider_instagram}
                placeholder="https://www.instagramName.com"
                // ref={register({
                //   pattern: {
                //     value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                //     message: "invalid email address",
                //   },
                // })}
                onChange={handleChange}
              />
              <p className="bold marginBottom10 ">Facebook Link </p>
              <input
                name="provider_facebook"
                placeholder="https://www.facebookName.com"
                defaultValue={profileData.provider_facebook}
                // ref={register({
                //   pattern: {
                //     value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                //     message: "invalid email address",
                //   },
                // })}
                onChange={handleChange}
              />
              {/* <ErrorMessage error={errors.url} /> */}
            </div>
            {/* ----------------------------- insert Location----------- */}

            <div>
              <div>
                <p className="bold marginBottom10 ">Ages Served</p>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    className={
                      profileData.under18 ? "labelbold" : "labeldefault"
                    }
                    control={
                      <Checkbox
                        checked={profileData.provider_ages_served.includes(
                          "Under 18 yrs old"
                        )}
                        onChange={handleCheckboxChange}
                        name="Under 18 yrs old"
                        color="primary"
                      />
                    }
                    label="Under 18 yrs old"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={profileData.provider_ages_served.includes(
                          "16 - 24 years old"
                        )}
                        onChange={handleCheckboxChange}
                        name="16 - 24 years old"
                        color="primary"
                      />
                    }
                    label="16 - 24 years old"
                  />
                  {/* Example: If "18 years old and older" exist in the provider_ages_served array check true if not false */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={profileData.provider_ages_served.includes(
                          "18 years old and older"
                        )}
                        onChange={handleCheckboxChange}
                        // defaultValue={profileData.ages_served}
                        name="18 years old and older"
                        color="primary"
                      />
                    }
                    label="18 years old and older"
                  />
                </FormGroup>
              </div>
              <p className="bold marginBottom10">Types of Services offered</p>
              <FormGroup className="marginBottom20">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Housing"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Housing"
                      color="primary"
                    />
                  }
                  label="Housing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Job Training"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Job Training"
                      color="primary"
                    />
                  }
                  label="Job Training"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Legal"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Legal"
                      color="primary"
                    />
                  }
                  label="Legal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Financial"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Financial"
                      color="primary"
                    />
                  }
                  label="Financial"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Counseling"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Counseling"
                      color="primary"
                    />
                  }
                  label="Counseling"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_services_offered.includes(
                        "Case Management"
                      )}
                      onChange={(e) =>
                        handleCheckboxServices(e, "provider_services_offered")
                      }
                      name="Case Management"
                      color="primary"
                    />
                  }
                  label="Case Management"
                />
              </FormGroup>

              <p className="bold marginBottom10 ">Genders Served</p>
              <FormGroup className="marginBottom20">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Female"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Female"
                      color="primary"
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Trans-Female"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Trans-Female"
                      color="primary"
                    />
                  }
                  label="Trans-Female"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Trans-Male"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Trans-Male"
                      color="primary"
                    />
                  }
                  label="Trans-Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Male"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Male"
                      color="primary"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Non-binary"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Non-binary"
                      color="primary"
                    />
                  }
                  label="Non-binary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_genders_served.includes(
                        "Fluid"
                      )}
                      onChange={(e) =>
                        handleCheckboxGender(e, "provider_genders_served")
                      }
                      name="Fluid"
                      color="primary"
                    />
                  }
                  label="Fluid"
                />
              </FormGroup>

              <p className="bold marginBottom10 ">Other Characteristics</p>
              <FormGroup className="marginBottom20">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_other_characteristics.includes(
                        "Virtual Services"
                      )}
                      onChange={(e) =>
                        handleCheckboxCharact(
                          e,
                          "provider_other_characteristics"
                        )
                      }
                      name="Virtual Services"
                      color="primary"
                    />
                  }
                  label="Virtual Services"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_other_characteristics.includes(
                        "Open Now"
                      )}
                      onChange={(e) =>
                        handleCheckboxCharact(
                          e,
                          "provider_other_characteristics"
                        )
                      }
                      name="Open Now"
                      color="primary"
                    />
                  }
                  label="Open Now"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_other_characteristics.includes(
                        "Drop-in Available"
                      )}
                      onChange={(e) =>
                        handleCheckboxCharact(
                          e,
                          "provider_other_characteristics"
                        )
                      }
                      name="Drop-in Available"
                      color="primary"
                    />
                  }
                  label="Drop-in Available"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_other_characteristics.includes(
                        "Faith-based"
                      )}
                      onChange={(e) =>
                        handleCheckboxCharact(
                          e,
                          "provider_other_characteristics"
                        )
                      }
                      name="Faith-based"
                      color="primary"
                    />
                  }
                  label="Faith-based"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_other_characteristics.includes(
                        "Children Allowed"
                      )}
                      onChange={(e) =>
                        handleCheckboxCharact(
                          e,
                          "provider_other_characteristics"
                        )
                      }
                      name="Children Allowed"
                      color="primary"
                    />
                  }
                  label="Children Allowed"
                />
              </FormGroup>
            </div>

            <div>
              <p className="bold marginBottom10 ">Location </p>
              <FormGroup className="marginBottom20">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Alameda County "
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Alameda County"
                      color="primary"
                    />
                  }
                  label="Alameda County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Contra Costa County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Contra Costa County"
                      color="primary"
                    />
                  }
                  label="Contra Costa County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Marin County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Marin County"
                      color="primary"
                    />
                  }
                  label="Marin County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Monterrey County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Monterrey County"
                      color="primary"
                    />
                  }
                  label="Monterrey County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "San Francisco County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="San Francisco County"
                      color="primary"
                    />
                  }
                  label="San Francisco County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "San Mateo County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="San Mateo County"
                      color="primary"
                    />
                  }
                  label="San Mateo County"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={profileData.provider_county.includes(
                        "Santa Cruz County"
                      )}
                      onChange={(e) =>
                        handleCheckboxLocation(e, "provider_county")
                      }
                      name="Santa Cruz County"
                      color="primary"
                    />
                  }
                  label="Santa Cruz County"
                />
              </FormGroup>
            </div>
          </div>
          <div
            className="displayBlock flexRow justifySpaceBetween marginBottom30"
            style={{ width: "40vw" }}
          >
            <Link to="/ourprofile">
              <button className="cancel-button">Cancel</button>
            </Link>
            <Link to="/ourprofile">
              <ColorButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </ColorButton>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Basics1;
