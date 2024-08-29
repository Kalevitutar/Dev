import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import React from "react";

import { Auth } from "aws-amplify";

const ClearButton = withStyles((theme) => ({
  root: {
    width: "100px",
    height: "40px",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: "smaller",
    fontWeight: "bolder",
    letterSpacing: "normal",
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#1081C8",
    "&:hover": {
      backgroundColor: "#A10070",
    },
  },
}))(Button);

const AddProviderButton = withStyles((theme) => ({
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

//accordion styles
const useStyles = makeStyles((theme) => ({
  parentWrapper: {
    width: "100%",
    "&> :nth-child(even)": {
      "&> div:first-child": {
        // backgroundColor: "#66B2D1",
        color: "#1081C8",
      },
      "&> div.expandedStyle": {
        backgroundColor: "#1081C8",
        color: "white",
      },
    },
    "&> :nth-child(odd)": {
      "&> div:first-child": {
        backgroundColor: "#6DC1E4",
        color: "#1081C8",
      },
      "&> div.expandedStyle": {
        backgroundColor: "#1081C8",
        color: "white",
      },
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const AdminAddProvider = () => {
  const [dataProvider, setDataProvider] = React.useState([]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [addProviderInfo, setAddProviderInfo] = React.useState({
    provider_name: "",
    email: "",
    role: [],
    activity_level: [],
    provider_start_hours: "",
    provider_close_hours: "",
    provider_phone: "",
    provider_hotline: "",
    provider_website: "",
    provider_instagram: "",
    provider_facebook: "",
    org_for_who: "",
    org_our_services: "",
    org_we_are: "",
    required_variables_intake: [],
    required_variables_general: [],
    provider_ages_served: [],
    provider_services_offered: [],
    provider_genders_served: [],
    provider_other_characteristics: [],
    provider_county: [],
    provider_address1: "",
    provider_address2: "",
    provider_address3: "",
    email_help: "",
  });
  const [openForm, setOpenForm] = React.useState(false);
  const { reset } = useForm();


  useEffect(() => {
    console.log(`the info changed!${addProviderInfo}`);
    Auth.currentAuthenticatedUser().then((response) => {
      console.log(response);
      API.post("referall-provider", "getproviderorg", {
        body: { user_id: response.username },
      })
        .then((data) => {
          setDataProvider(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }); // eslint-disable-next-line
  }, []);


  const showForm = () => {
    setOpenForm(!openForm);
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleChange(e, index) {
    if (typeof index === 'number'){
      var newObject = [...dataProvider];
      newObject[index][e.target.name] = e.target.value;
      console.log(newObject)
      setDataProvider(newObject);
    } else {
      const value = e.target.value;
      setAddProviderInfo({ ...addProviderInfo, [e.target.name]: value });
    }
  }

  var handleChangeRole = (e, index) => {
    console.log(index)
    if (typeof index === 'number'){
      var newObject = [...dataProvider];
      newObject[index].role = [e.target.value];
      setDataProvider(newObject);
    } else {
      var newData = { ...addProviderInfo };
      newData.role = [e.target.value];
      setAddProviderInfo(newData);
    }
  };

  var handleCheckboxActLevel = (e, index) => {
    if (typeof index === 'number'){
      var newObject = [...dataProvider];
      newObject[index].activity_level = [e.target.value];
      setDataProvider(newObject);
    } else {
      var newData = { ...addProviderInfo };
      newData.activity_level = [e.target.value];
      setAddProviderInfo(newData);
    }
  };

  var handleCheckboxChange = (e, index) => {
    if (typeof index === 'number'){
      var newObject = [...dataProvider];
      if (e.target.checked) {
        newObject[index][e.target.name].push(e.target.value);
      } else {
        newObject[index][e.target.name].splice(
          newObject[index][e.target.name].indexOf(e.target.value),
          1
        );
      }
      setDataProvider(newObject);
    } else {
      var newData = { ...addProviderInfo };
      if (e.target.checked) {
        newData[e.target.name].push(e.target.value);
      } else {
        newData[e.target.name].splice(
          newData[e.target.name].indexOf(e.target.value),
          1
        );
      }
      setAddProviderInfo(newData);
    }
  };

  const handleUpdate = (e, index) => {
    e.preventDefault();
    Auth.currentAuthenticatedUser().then((response) => {
      console.log(response);
      API.post("referall-provider", "addproviderorg", {
        body: { user_id: response.username, data: dataProvider[index] },
      })
        .then((data) => {
          setDataProvider(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }); // eslint-disable-next-line
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Auth.currentAuthenticatedUser().then((response) => {
      console.log(response);
      API.post("referall-provider", "addproviderorg", {
        body: { user_id: response.username, data: addProviderInfo },
      })
        .then((data) => {
          setDataProvider(data);
          setOpenForm(false)
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }); // eslint-disable-next-line

    setAddProviderInfo({
      // to clear after saving
      provider_name: "",
      email: "",
      role: [],
      activity_level: [],
      provider_start_hours: "",
      provider_close_hours: "",
      provider_phone: "",
      provider_hotline: "",
      provider_website: "",
      provider_instagram: "",
      provider_facebook: "",
      org_for_who: "",
      org_our_services: "",
      org_we_are: "",
      required_variables_intake: [],
      required_variables_general: [],
      provider_ages_served: [],
      provider_services_offered: [],
      provider_genders_served: [],
      provider_other_characteristics: [],
      provider_county: [],
      provider_address1: "",
      provider_address2: "",
      provider_address3: "",
      email_help: "",
    });
  };

  //phone validation
  function phonenumber(inputtxt) {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (inputtxt.value.match(phoneno)) {
      return true;
    } else {
      alert("message");
      return false;
    }
  }
  return (
    <div>
      <div>
        <h1 className="add-provider-header paddingBottom60">Add a Provider</h1>
        <p className="paddingBottom20">
          *List of Providers Added in the Database
        </p>
      </div>
        <div className="maxWidth95Percent paddingBottom60">
          <div className={classes.parentWrapper}>
            <>
              {dataProvider.map((data, index) => {
                return (
                  <>
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChangeAccordion("panel1")}
                    >
                      <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        classes={{ expanded: "expandedStyle" }}
                      >
                        <Typography key={index}>{data.provider_name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div>
                            <form
                              className="marginBottom40, marginTop25"
                              //onSubmit={handleSubmit}
                            >
                              <label>Provider Name:</label>

                              <input
                                type="text"
                                name="provider_name"
                                value={data.provider_name}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Email (This will add a new user to the platform):</label>
                              <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="name@email.com"
                              />

                              <label>Role:</label>
                              <FormGroup>
                                <RadioGroup
                                  row
                                  className="marginBottom20"
                                >
                                  <FormControlLabel
                                    checked={data.role ? data.role.includes("Admin"): false}
                                    value="Admin"
                                    control={<Radio />}
                                    label="Admin"
                                    onChange={(e) => handleChangeRole(e, index)}
                                  />
                                  <FormControlLabel
                                    checked={data.role ? data.role.includes("Standard") : false}
                                    value="Standard"
                                    control={<Radio />}
                                    label="Standard"
                                    onChange={(e) => handleChangeRole(e, index)}
                                  />
                                </RadioGroup>
                              </FormGroup>
                              <label>Activity Level:</label>
                              <FormGroup>
                                <RadioGroup
                                  row
                                  className="marginBottom20"
                                >
                                  <FormControlLabel
                                    checked={data.activity_level ? data.activity_level.includes(
                                      "Intake"
                                    ) : false}
                                    value="Intake"
                                    control={<Radio />}
                                    label="Intake"
                                    onChange={(e) =>
                                      handleCheckboxActLevel(e, "activity_level", index)
                                    }
                                  />
                                  <FormControlLabel
                                    checked={data.activity_level ? data.activity_level.includes(
                                      "No Intake"
                                    ): false}
                                    value="No Intake"
                                    control={<Radio />}
                                    label="No Intake"
                                    onChange={(e) =>
                                      handleCheckboxActLevel(e, "activity_level", index)
                                    }
                                  />
                                </RadioGroup>
                              </FormGroup>
                              <label>Start Hours:</label>
                              <input
                                type="time"
                                name="provider_start_hours"
                                value={data.provider_start_hours}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />

                              <label>Close Hours:</label>
                              <input
                                type="time"
                                name="provider_close_hours"
                                value={data.provider_close_hours}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Phone Number:</label>
                              <input
                                type="tel"
                                // maxLength="10"
                                // data={phonenumber}
                                value={data.provider_phone}
                                placeholder="+XX-XXXX-XXXX"
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Hotline:</label>
                              <input
                                type="tel"
                                maxLength="10"
                                name="provider_hotline"
                                value={data.provider_hotline}
                                placeholder="+XX-XXXX-XXXX"
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Website:</label>
                              <input
                                type="url"
                                name="provider_website"
                                value={data.provider_website}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="https://www.websiteName.com"
                              />
                              <label>Instagram:</label>
                              <input
                                type="text"
                                name="provider_instagram"
                                value={data.provider_instagram}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="https://www.instagramName.com"
                              />
                              <label>Facebook:</label>
                              <input
                                type="text"
                                name="provider_facebook"
                                value={data.provider_facebook}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="https://www.facebookName.com"
                              />
                              <label>Clients:</label>
                              <input
                                type="text"
                                name="org_for_who"
                                value={data.org_for_who}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Services:</label>
                              <input
                                type="text"
                                name="org_our_services"
                                value={data.org_our_services}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Who We Are:</label>
                              <input
                                type="text"
                                name="org_we_are"
                                value={data.org_we_are}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                              />
                              <label>Variables Intake:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "address_line1"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value={data.provider_address1}
                                      color="primary"
                                    />
                                  }
                                  label="address_line1"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "address_line2"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="address_line2"
                                      color="primary"
                                    />
                                  }
                                  label="address_line2"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "address_city"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="address_city"
                                      color="primary"
                                    />
                                  }
                                  label="address_city"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "address_state"
                                      ):false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="address_state"
                                      color="primary"
                                    />
                                  }
                                  label="address_state"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "address_zipcode"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="address_zipcode"
                                      color="primary"
                                    />
                                  }
                                  label="address_zipcode"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "preferred_language"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="preferred_language"
                                      color="primary"
                                    />
                                  }
                                  label="preferred_language"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "gender"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="gender"
                                      color="primary"
                                    />
                                  }
                                  label="gender"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "sexual_orientation"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="sexual_orientation"
                                      color="primary"
                                    />
                                  }
                                  label="sexual_orientation"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "ethnicity"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="ethnicity"
                                      color="primary"
                                    />
                                  }
                                  label="ethnicity"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "children"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="children"
                                      color="primary"
                                    />
                                  }
                                  label="children"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "num_of_children"
                                      ):false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="num_of_children"
                                      color="primary"
                                    />
                                  }
                                  label="num_of_children"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "foster_care"
                                      ):false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="foster_care"
                                      color="primary"
                                    />
                                  }
                                  label="foster_care"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "incarceration"
                                      ):false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="incarceration"
                                      color="primary"
                                    />
                                  }
                                  label="incarceration"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "immigration"
                                      ):false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="immigration"
                                      color="primary"
                                    />
                                  }
                                  label="immigration"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_intake.includes(
                                        "disability"
                                      ): false}
                                      name="required_variables_intake"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="disability"
                                      color="primary"
                                    />
                                  }
                                  label="disability"
                                />
                              </FormGroup>
                              <label>Variables General:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "preferred_name"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="preferred_name"
                                      color="primary"
                                    />
                                  }
                                  label="preferred_name"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "first_name"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="first_name"
                                      color="primary"
                                    />
                                  }
                                  label="first_name"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "last_name"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="last_name"
                                      color="primary"
                                    />
                                  }
                                  label="last_name"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "phone"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="phone"
                                      color="primary"
                                    />
                                  }
                                  label="phone"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "email"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="email"
                                      color="primary"
                                    />
                                  }
                                  label="email"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "survivorship"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="survivorship"
                                      color="primary"
                                    />
                                  }
                                  label="survivorship"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "county_location"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="county_location"
                                      color="primary"
                                    />
                                  }
                                  label="county_location"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.required_variables_intake ? data.required_variables_general.includes(
                                        "county_services"
                                      ):false}
                                      name="required_variables_general"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="county_services"
                                      color="primary"
                                    />
                                  }
                                  label="county_services"
                                />
                              </FormGroup>
                              <label>Ages Served:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_ages_served ? data.provider_ages_served.includes(
                                        "Under 18 years old"
                                      ):false}
                                      name="provider_ages_served"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Under 18 years old"
                                      color="primary"
                                    />
                                  }
                                  label="Under 18 years old"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_ages_served ? data.provider_ages_served.includes(
                                        "16 - 24 years old"
                                      ):false}
                                      name="provider_ages_served"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="16 - 24 years old"
                                      color="primary"
                                    />
                                  }
                                  label="16 - 24 years old"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_ages_served ? data.provider_ages_served.includes(
                                        "18 years old and older"
                                      ):false}
                                      name="provider_ages_served"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="18 years old and older"
                                      color="primary"
                                    />
                                  }
                                  label="18 years old and older"
                                />
                              </FormGroup>

                              <label>Services Offered</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Housing"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Housing"
                                      color="primary"
                                    />
                                  }
                                  label="Housing"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Job Training"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Job Training"
                                      color="primary"
                                    />
                                  }
                                  label="Job Training"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Legal"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Legal"
                                      color="primary"
                                    />
                                  }
                                  label="Legal"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Financial"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Financial"
                                      color="primary"
                                    />
                                  }
                                  label="Financial"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Counseling"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Counseling"
                                      color="primary"
                                    />
                                  }
                                  label="Counseling"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_services_offered ? data.provider_services_offered.includes(
                                        "Case Management"
                                      ):false}
                                      name="provider_services_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Case Management"
                                      color="primary"
                                    />
                                  }
                                  label="Case Management"
                                />
                              
                              </FormGroup>
                              <label>Genders Served:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Female"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Female"
                                      color="primary"
                                    />
                                  }
                                  label="Female"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Trans-Female"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Trans-Female"
                                      color="primary"
                                    />
                                  }
                                  label="Trans-Female"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Male"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Male"
                                      color="primary"
                                    />
                                  }
                                  label="Male"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Trans-Male"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Trans-Male"
                                      color="primary"
                                    />
                                  }
                                  label="Trans-Male"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Non-binary"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Non-binary"
                                      color="primary"
                                    />
                                  }
                                  label="Non-binary"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_genders_served ? data.provider_genders_served.includes(
                                        "Fluid"
                                      ):false}
                                      name="provider_genders_offered"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Fluid"
                                      color="primary"
                                    />
                                  }
                                  label="Fluid"
                                />
                              </FormGroup>
                              <label>Other Characteristics:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_other_characteristics ? data.provider_other_characteristics.includes(
                                        "Drop-in Available"
                                      ):false}
                                      name="provider_other_characteristics"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Drop-in Available"
                                      color="primary"
                                    />
                                  }
                                  label="Drop-in Available"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_other_characteristics ? data.provider_other_characteristics.includes(
                                        "Open Now"
                                      ):false}
                                      name="provider_other_characteristics"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Open Now"
                                      color="primary"
                                    />
                                  }
                                  label="Open Now"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_other_characteristics ? data.provider_other_characteristics.includes(
                                        "Virtual Services"
                                      ):false}
                                      name="provider_other_characteristics"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Virtual Services"
                                      color="primary"
                                    />
                                  }
                                  label="Virtual Services"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_other_characteristics ? data.provider_other_characteristics.includes(
                                        "Faith-based"
                                      ):false}
                                      name="provider_other_characteristics"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Faith-based"
                                      color="primary"
                                    />
                                  }
                                  label="Faith-based"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_other_characteristics ? data.provider_other_characteristics.includes(
                                        "Children Allowed"
                                      ):false}
                                      name="provider_other_characteristics"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Children Allowed"
                                      color="primary"
                                    />
                                  }
                                  label="Children Allowed"
                                />
                              </FormGroup>
                              
                              <label>County:</label>
                              <FormGroup className="marginBottom20">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_county ? data.provider_county.includes(
                                        "Alameda County"
                                      ):false}
                                      name="provider_county"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Alameda County"
                                      color="primary"
                                    />
                                  }
                                  label="Alameda County"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_county ? data.provider_county.includes(
                                        "Contra Costa County"
                                      ):false}
                                      name="provider_county"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Contra Costa County"
                                      color="primary"
                                    />
                                  }
                                  label="Contra Costa County"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_county ? data.provider_county.includes(
                                        "Marin County"
                                      ):false}
                                      name="provider_county"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="Marin County"
                                      color="primary"
                                    />
                                  }
                                  label="Marin County"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_county ? data.provider_county.includes(
                                        "San Francisco County"
                                      ):false}
                                      name="provider_county"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="San Francisco County"
                                      color="primary"
                                    />
                                  }
                                  label="San Francisco County"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={data.provider_county ? data.provider_county.includes(
                                        "San Mateo County"
                                      ):false}
                                      name="provider_county"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          e,index
                                        )
                                      }
                                      value="San Mateo County"
                                      color="primary"
                                    />
                                  }
                                  label="San Mateo County"
                                />
                              </FormGroup>

                              <label>Address 1:</label>
                              <input
                                type="text"
                                name="provider_address1"
                                value={data.provider_address1}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="Address 1"
                              />
                              <label>Address 2:</label>
                              <input
                                type="text"
                                name="provider_address2"
                                value={data.provider_address2}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="Address 2"
                              />
                              <label>Address 3:</label>
                              <input
                                type="text"
                                name="provider_address3"
                                value={data.provider_address3}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="Address 3"
                              />
                              <label>Email Help:</label>
                              <input
                                type="email"
                                name="email_help"
                                value={data.email_help}
                                onChange={e => handleChange(e, index)}
                                className="marginBottom15"
                                placeholder="name@email.com"
                              />
                              {/* <label>Created by:</label>
                              <input
                                type="text"
                                name="provider_creator"
                                value={data.provider_creator}
                                onChange={handleChange}
                                className="marginBottom40"
                              /> */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "500px",
                                  marginTop: "30px",
                                  marginBottom: "50px",
                                }}
                              >
                                {/* <ClearButton
                                  className="cancel-button"
                                  // type="submit"
                                  onClick={() => reset()}
                                >
                                  Cancel
                                </ClearButton> */}
                                <AddProviderButton
                                  onClick={e => handleUpdate(e,index)}
                                  type="submit"
                                >
                                  Save
                                </AddProviderButton>
                              </div>
                            </form>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })}
            </>
            {/* ) : null} */}
          </div>
        </div>

      {/* ********************************* Provider Button for FORM************************* */}
      <div>
        <AddProviderButton
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "150px",
            marginTop: "30px",
          }}
          onClick={showForm}
        >
          Add a New Provider
        </AddProviderButton>

        {openForm && (
          <>
            <div>
              <form
                className="marginBottom40, marginTop25"
                onSubmit={handleSubmit}
              >
                <label>Provider Name:</label>

                <input
                  type="text"
                  name="provider_name"
                  value={addProviderInfo.provider_name}
                  onChange={handleChange}
                  className="marginBottom15"
                />

                <label>Email (This will add a new user to the platform):</label>
                <input
                  type="email"
                  name="email"
                  value={addProviderInfo.email}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="name@email.com"
                />
                <label>Role:</label>
                <FormGroup>
                  <RadioGroup
                    row
                    className="marginBottom20"

                    // aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    // name="radio-buttons-group"
                  >
                    <FormControlLabel
                      checked={addProviderInfo.role.includes("Admin")}
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                      onChange={handleChangeRole}
                    />
                    <FormControlLabel
                      checked={addProviderInfo.role.includes("Standard")}
                      value="Standard"
                      control={<Radio />}
                      label="Standard"
                      onChange={handleChangeRole}
                    />
                  </RadioGroup>
                </FormGroup>

                <label>Activity Level:</label>
                <FormGroup>
                  <RadioGroup
                    row
                    className="marginBottom20"
                    // aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    // name="radio-buttons-group"
                  >
                    <FormControlLabel
                      checked={addProviderInfo.activity_level.includes(
                        "Intake"
                      )}
                      value="Intake"
                      control={<Radio />}
                      label="Intake"
                      onChange={(e) =>
                        handleCheckboxActLevel(e, "activity_level")
                      }
                    />
                    <FormControlLabel
                      checked={addProviderInfo.activity_level.includes(
                        "No Intake"
                      )}
                      value="No Intake"
                      control={<Radio />}
                      label="No Intake"
                      onChange={(e) =>
                        handleCheckboxActLevel(e, "activity_level")
                      }
                    />
                  </RadioGroup>
                </FormGroup>

                <label>Start Hours:</label>
                <input
                  type="time"
                  name="provider_start_hours"
                  value={addProviderInfo.provider_start_hours}
                  onChange={handleChange}
                  className="marginBottom15"
                />

                <label>Close Hours:</label>
                <input
                  type="time"
                  name="provider_close_hours"
                  value={addProviderInfo.provider_close_hours}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Phone Number:</label>
                <input
                  type={phonenumber}
                  name="provider_phone"
                  placeholder="+XX-XXXX-XXXX"
                  value={addProviderInfo.provider_phone}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Hotline:</label>
                <input
                  type="tel"
                  name="provider_hotline"
                  placeholder="+XX-XXXX-XXXX"
                  value={addProviderInfo.provider_hotline}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Website:</label>
                <input
                  type="url"
                  name="provider_website"
                  value={addProviderInfo.provider_website}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="https://www.websiteName.com"
                />
                <label>Instagram:</label>
                <input
                  type="text"
                  name="provider_instagram"
                  value={addProviderInfo.provider_instagram}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="https://www.instagramName.com"
                />
                <label>Facebook:</label>
                <input
                  type="text"
                  name="provider_facebook"
                  value={addProviderInfo.provider_facebook}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="https://www.facebookName.com"
                />
                <label>Clients:</label>
                <input
                  type="text"
                  name="org_for_who"
                  value={addProviderInfo.org_for_who}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Services:</label>
                <input
                  type="text"
                  name="org_our_services"
                  value={addProviderInfo.org_our_services}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Who We Are:</label>
                <input
                  type="text"
                  name="org_we_are"
                  value={addProviderInfo.org_we_are}
                  onChange={handleChange}
                  className="marginBottom15"
                />
                <label>Variables Intake:</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "address_line1"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}
                        value="address_line1"
                        color="primary"
                      />
                    }
                    label="address_line1"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "address_line2"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="address_line2"
                        color="primary"
                      />
                    }
                    label="address_line2"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "address_city"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="address_city"
                        color="primary"
                      />
                    }
                    label="address_city"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "address_state"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="address_state"
                        color="primary"
                      />
                    }
                    label="address_state"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "address_zipcode"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="address_zipcode"
                        color="primary"
                      />
                    }
                    label="address_zipcode"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "preferred_language"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="preferred_language"
                        color="primary"
                      />
                    }
                    label="preferred_language"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "gender"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="gender"
                        color="primary"
                      />
                    }
                    label="gender"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "sexual_orientation"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="sexual_orientation"
                        color="primary"
                      />
                    }
                    label="sexual_orientation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "ethnicity"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="ethnicity"
                        color="primary"
                      />
                    }
                    label="ethnicity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "children"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="children"
                        color="primary"
                      />
                    }
                    label="children"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "num_of_children"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="num_of_children"
                        color="primary"
                      />
                    }
                    label="num_of_children"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "foster_care"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="foster_care"
                        color="primary"
                      />
                    }
                    label="foster_care"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "incarceration"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="incarceration"
                        color="primary"
                      />
                    }
                    label="incarceration"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "immigration"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="immigration"
                        color="primary"
                      />
                    }
                    label="immigration"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_intake.includes(
                          "disability"
                        )}
                        name="required_variables_intake"
                        onChange={handleCheckboxChange}                        value="disability"
                        color="primary"
                      />
                    }
                    label="disability"
                  />
                </FormGroup>

                <label>Variables General:</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "preferred_name"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange}                        value="preferred_name"
                        color="primary"
                      />
                    }
                    label="preferred_name"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "first_name"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="first_name"
                        color="primary"
                      />
                    }
                    label="first_name"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "last_name"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="last_name"
                        color="primary"
                      />
                    }
                    label="last_name"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "phone"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="phone"
                        color="primary"
                      />
                    }
                    label="phone"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "email"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="email"
                        color="primary"
                      />
                    }
                    label="email"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "survivorship"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="survivorship"
                        color="primary"
                      />
                    }
                    label="survivorship"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "county_location"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="county_location"
                        color="primary"
                      />
                    }
                    label="county_location"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.required_variables_general.includes(
                          "county_services"
                        )}
                        name="required_variables_general"
                        onChange={handleCheckboxChange} 
                        value="county_services"
                        color="primary"
                      />
                    }
                    label="county_services"
                  />
                </FormGroup>

                <label>Ages Served:</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_ages_served.includes(
                          "Under 18 years old"
                        )}
                        name="provider_ages_served"
                        onChange={handleCheckboxChange} 
                        value="Under 18 years old"
                        color="primary"
                      />
                    }
                    label="Under 18 years old"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_ages_served.includes(
                          "16 - 24 years old"
                        )}
                        name="provider_ages_served"
                        onChange={handleCheckboxChange} 
                        value="16 - 24 years old"
                        color="primary"
                      />
                    }
                    label="16 - 24 years old"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_ages_served.includes(
                          "18 years old and older"
                        )}
                        name="provider_ages_served"
                        onChange={handleCheckboxChange} 
                        value="18 years old and older"
                        color="primary"
                      />
                    }
                    label="18 years old and older"
                  />
                </FormGroup>

                <label>Services Offered</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Housing"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Housing"
                        color="primary"
                      />
                    }
                    label="Housing"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Job Training"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Job Training"
                        color="primary"
                      />
                    }
                    label="Job Training"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Legal"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Legal"
                        color="primary"
                      />
                    }
                    label="Legal"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Financial"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Financial"
                        color="primary"
                      />
                    }
                    label="Financial"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Counseling"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Counseling"
                        color="primary"
                      />
                    }
                    label="Counseling"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_services_offered.includes(
                          "Case Management"
                        )}
                        name="provider_services_offered"
                        onChange={handleCheckboxChange} 
                        value="Case Management"
                        color="primary"
                      />
                    }
                    label="Case Management"
                  />
                </FormGroup>

                <label>Genders Served:</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Female"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Female"
                        color="primary"
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Trans-Female"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Trans-Female"
                        color="primary"
                      />
                    }
                    label="Trans-Female"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Male"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Male"
                        color="primary"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Trans-Male"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Trans-Male"
                        color="primary"
                      />
                    }
                    label="Trans-Male"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Non-binary"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Non-binary"
                        color="primary"
                      />
                    }
                    label="Non-binary"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_genders_served.includes(
                          "Fluid"
                        )}
                        name="provider_genders_served"
                        onChange={handleCheckboxChange} 
                        value="Fluid"
                        color="primary"
                      />
                    }
                    label="Fluid"
                  />
                </FormGroup>

                <label>Other Characteristics:</label>
                <FormGroup className="marginBottom20">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_other_characteristics.includes(
                          "Drop-in Available"
                        )}
                        name="provider_other_characteristics"
                        onChange={handleCheckboxChange} 
                        value="Drop-in Available"
                        color="primary"
                      />
                    }
                    label="Drop-in Available"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_other_characteristics.includes(
                          "Open Now"
                        )}
                        name="provider_other_characteristics"
                        onChange={handleCheckboxChange} 
                        value="Open Now"
                        color="primary"
                      />
                    }
                    label="Open Now"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_other_characteristics.includes(
                          "Virtual Services"
                        )}
                        name="provider_other_characteristics"
                        onChange={handleCheckboxChange} 
                        value="Virtual Services"
                        color="primary"
                      />
                    }
                    label="Virtual Services"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_other_characteristics.includes(
                          "Faith-based"
                        )}
                        name="provider_other_characteristics"
                        onChange={handleCheckboxChange} 
                        value="Faith-based"
                        color="primary"
                      />
                    }
                    label="Faith-based"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_other_characteristics.includes(
                          "Children Allowed"
                        )}
                        name="provider_other_characteristics"
                        onChange={handleCheckboxChange}
                        value="Children Allowed"
                        color="primary"
                      />
                    }
                    label="Children Allowed"
                  />
                </FormGroup>

                <label>County:</label>
                <FormGroup className="marginBottom20">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_county.includes(
                          "Alameda County"
                        )}
                        name="provider_county"
                        onChange={handleCheckboxChange}
                        value="Alameda County"
                        color="primary"
                      />
                    }
                    label="Alameda County"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_county.includes(
                          "Contra Costa County"
                        )}
                        name="provider_county"
                        onChange={handleCheckboxChange}
                        value="Contra Costa County"
                        color="primary"
                      />
                    }
                    label="Contra Costa County"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_county.includes(
                          "Marin County"
                        )}
                        name="provider_county"
                        onChange={handleCheckboxChange}
                        value="Marin County"
                        color="primary"
                      />
                    }
                    label="Marin County"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_county.includes(
                          "San Francisco County"
                        )}
                        name="provider_county"
                        onChange={handleCheckboxChange}
                        value="San Francisco County"
                        color="primary"
                      />
                    }
                    label="San Francisco County"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addProviderInfo.provider_county.includes(
                          "San Mateo County"
                        )}
                        name="provider_county"
                        onChange={handleCheckboxChange}
                        value="San Mateo County"
                        color="primary"
                      />
                    }
                    label="San Mateo County"
                  />
                </FormGroup>

                <label>Address 1:</label>
                <input
                  type="text"
                  name="provider_address1"
                  value={addProviderInfo.provider_address1}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="Address 1"
                />
                <label>Address 2:</label>
                <input
                  type="text"
                  name="provider_address2"
                  value={addProviderInfo.provider_address2}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="Address 2"
                />
                <label>Address 3:</label>
                <input
                  type="text"
                  name="provider_address3"
                  value={addProviderInfo.provider_address3}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="Address 3"
                />
                <label>Email Help:</label>
                <input
                  type="email"
                  name="email_help"
                  value={addProviderInfo.email_help}
                  onChange={handleChange}
                  className="marginBottom15"
                  placeholder="name@email.com"
                />
                {/* <label>Created by:</label>
                <input
                  type="text"
                  name="provider_creator"
                  value={addProviderInfo.provider_creator}
                  onChange={handleChange}
                  className="marginBottom40"
                /> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "500px",
                    marginTop: "30px",
                    marginBottom: "100px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <ClearButton
                    className="cancel-button"
                    // type="submit"
                    onClick={() => reset()}
                  >
                    Cancel
                  </ClearButton>
                  <AddProviderButton type="submit" onClick={handleSubmit}>
                    Save
                  </AddProviderButton>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAddProvider;
