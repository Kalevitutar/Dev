import React, { Component } from "react";
import { AppContext } from "../../useContext";
// import axios from "axios"; // npm instal axios
import API from "@aws-amplify/api";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import SearchIcon from "@material-ui/icons/Search";
import rightArrowColorD5D8DD from "../../Assets/rightArrowColor#D5D8DD.png";
import locationIconColor8F98A3 from "../../Assets/locationIconColor#8F98A3.png";
import { OrgDetailPage } from "./OrgDetailPage";
import { ProviderTableToolbar } from "./ProviderTableToolbar";

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

export default class ServiceProviders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appContext: {},
      providersDataFromBackend: [],

      page: "table",
      person: [],
      ageFilterPopoverAnchor: null,
      ageFilterPopoverOpen: false,
      Under18yearsold: false,
      "16to24yearsold": false,
      "18yearsoldandolder": false,

      servicesFilterPopoverOpen: false,
      Housing: false,
      JobTraining: false,
      Legal: false,
      Financial: false,
      Counseling: false,
      CaseManagement: false,

      locationFilterPopoverOpen: false,
      AlamedaCounty: false,
      ContraCostaCounty: false,
      MarinCounty: false,
      SanFranciscoCounty: false,
      SanMateoCounty: false,

      gendersFilterPopoverOpen: false,
      Female: false,
      TransFemale: false,
      TransMale: false,
      Male: false,
      NonBinary: false,
      Fluid: false,

      moreFilterPopoverOpen: false,
      DropInAvailable: false,
      OpenNow: false,
      VirtualServices: false,
      FaithBased: false,
      ChildrenAllowed: false,

      saveSearchModalOpen: false,
      searchSaveSuccess: false,
      saveSearchName: "",

      savedSearchesModalOpen: false,
      savedSearches: [],

      orgDetailsToShow: {},
    };

    this.filters = [];
    this.trueFilterStateNames = []; // Collect current filters selected stateNames
    this.tableRef = React.createRef();
    this.tableRefCurrentObj = {};
  }

  componentDidMount(prevProps) {
    // Get all service providers from the backend and add app context to state as well
    this.tableRefCurrentObj = this.tableRef.current;

    API.get("referall-provider", "getallproviders").then((response) => {
      let alphabeticalOrder = response.sort(function (a, b) {
        let textA = a.provider_name.toUpperCase();
        let textB = b.provider_name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      this.setState({
        providersDataFromBackend: alphabeticalOrder,
        appContext: this.context, // Get app context
      });
    });

    if (this.props !== prevProps) {
      const compProps = this.props;
      // console.log("compProps: ", compProps);

      // If path from people's 'see matching providers' button, update filters
      if (compProps && compProps.location && compProps.location.state) {
        const pathState = compProps.location.state;
        // console.log("from state: ", pathState);

        if (
          compProps.location.state.dob &&
          compProps.location.state.services_in
        ) {
          // Survivor clicked on their see matching providers
          var servicesIn = pathState.services_in.replace(/ /g, "");

          // Get the users age from their dob
          var getTimeSinceDob = Math.round(
            new Date().getTime() - new Date(pathState.dob).getTime()
          );
          var day = 1000 * 60 * 60 * 24;
          var days = Math.round(getTimeSinceDob / day);
          var months = Math.round(days / 31);
          var usersAge = Math.round(months / 12);

          if (usersAge < 18) {
            this.setState(
              {
                ...this.state,
                Under18yearsold: true,
                [servicesIn]: true,
              },
              () => {
                this.updateCurrentFilters(
                  [
                    "Under 18 years old",
                    "16 - 24 years old",
                    "18 years old and older",
                  ],
                  "ageFilterPopoverOpen"
                );
                this.updateCurrentFilters(
                  [
                    "Alameda County",
                    "Contra Costa County",
                    "Marin County",
                    "San Francisco County",
                    "San Mateo County",
                  ],
                  "locationFilterPopoverOpen"
                );
              }
            );
          }
          if (usersAge >= 16 && usersAge <= 24) {
            var between16and24 = "16to24yearsold";
            this.setState(
              {
                ...this.state,
                [between16and24]: true,
                [servicesIn]: true,
              },
              () => {
                this.updateCurrentFilters(
                  [
                    "Under 18 years old",
                    "16 - 24 years old",
                    "18 years old and older",
                  ],
                  "ageFilterPopoverOpen"
                );
                this.updateCurrentFilters(
                  [
                    "Alameda County",
                    "Contra Costa County",
                    "Marin County",
                    "San Francisco County",
                    "San Mateo County",
                  ],
                  "locationFilterPopoverOpen"
                );
              }
            );
          }
          if (usersAge >= 18) {
            this.setState(
              {
                ...this.state,
                "18yearsoldandolder": true,
                [servicesIn]: true,
              },
              () => {
                // console.log(this.state["18yearsoldandolder"]);
                this.updateCurrentFilters(
                  [
                    "Under 18 years old",
                    "16 - 24 years old",
                    "18 years old and older",
                  ],
                  "ageFilterPopoverOpen"
                );
                this.updateCurrentFilters(
                  [
                    "Alameda County",
                    "Contra Costa County",
                    "Marin County",
                    "San Francisco County",
                    "San Mateo County",
                  ],
                  "locationFilterPopoverOpen"
                );
              }
            );
          }
        } else if (compProps.location.state.filter) {
          // Survivor clicked on a saved search of theirs
          // Array of filters

          const newFilterState = {};

          compProps.location.state.filter.forEach((key) => {
            let filterStateName = key.replace(/ /g, "");
            // console.log(filterStateName);
            newFilterState[filterStateName] = true;
          });

          this.setState(newFilterState, () => {
            // console.log(this.state);
            this.updateCurrentFilters(
              [
                "Under 18 years old",
                "16 - 24 years old",
                "18 years old and older",
              ],
              "ageFilterPopoverOpen"
            );
            this.updateCurrentFilters(
              [
                "Housing",
                "Job Training",
                "Legal",
                "Financial",
                "Counseling",
                "Case Management",
              ],
              "servicesFilterPopoverOpen"
            );
            this.updateCurrentFilters(
              [
                "Alameda County",
                "Contra Costa County",
                "Marin County",
                "San Francisco County",
                "San Mateo County",
              ],
              "locationFilterPopoverOpen"
            );
            this.updateCurrentFilters(
              [
                "Female",
                "Trans Female",
                "Trans Male",
                "Male",
                "Non Binary",
                "Fluid",
              ],
              "gendersFilterPopoverOpen"
            );
            this.updateCurrentFilters(
              [
                "Drop In Available",
                "Open Now",
                "Virtual Services",
                "Faith Based",
                "Children Allowed",
              ],
              "moreFilterPopoverOpen"
            );
          });

          // console.log("filters");
        }
      }
    } else {
      // Remove state props from location after for page refresh
      const stateCopy = { ...this.props.location.state };
      delete stateCopy.dob;
      delete stateCopy.services_in;
      this.props.history.replace({ state: stateCopy });
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props !== prevProps) {
      // console.log(this.props);
    }
  }

  // When the user clicks on a filter chip button, open the overlay associated with it
  openFilterOverlay = (filterPopOverOpen) => {
    this.setState({
      [filterPopOverOpen]: true,
      searchSaveSuccess: false,
    });
  };

  closeFilterOverlay = (filterPopoverOpenName) => {
    this.setState({
      [filterPopoverOpenName]: false,
    });
  };

  // Whe the user clicks a checkbox, update it's state to be equal to it's built in checked property (will be true or false)
  handleCheckBoxChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.checked,
    });
  };

  // When the user clicks save in a filter modal, update selected filters
  updateCurrentFilters = (array, filterPopoverOpenName) => {
    array.map((filter) => {
      // Get the state name of the current filter in the array
      var stateName = filter.replace(/ /g, "");

      if (this.state[stateName]) {
        // If the state of this current checkbox is true, but this current filter is not in the this.filters array, add this filter to this.filter array so the table will update and show the data objects that have this filter included
        if (this.filters.indexOf(filter) < 0) {
          this.trueFilterStateNames.push(stateName);
          return this.filters.push(filter);
        }
      } else {
        // Else if the state of this current checkbox is false and this current filter is in the this.filters array, remove this filter from this.filter array so the table will update and no longer apply this filter to the table
        if (this.filters.indexOf(filter) > -1) {
          this.trueFilterStateNames.splice(
            this.trueFilterStateNames.indexOf(stateName),
            1
          );
          return this.filters.splice(this.filters.indexOf(filter), 1);
        }
      }
      return "";
    });

    // Then close the filter overlay
    this.setState({
      [filterPopoverOpenName]: null,
    });
  };

  // when the user clicks clear inside one of the filter overlays, clear the filters associated with that overlay only.
  clearOneSetOfFilters = (array, filterPopoverOpenName) => {
    var itemsToUpdate = [];

    array.map((filter) => {
      if (this.filters.indexOf(filter) > -1) {
        this.trueFilterStateNames.splice(
          this.trueFilterStateNames.indexOf(filter),
          1
        );
        this.filters.splice(this.filters.indexOf(filter), 1);
      }
      return itemsToUpdate.push(filter.replace(/ /g, ""));
    });

    for (var i = 0; i < itemsToUpdate.length; i++) {
      this.setState({
        [itemsToUpdate[i]]: false,
        [filterPopoverOpenName]: null,
      });
    }
  };

  // Clear all filters from the table and set all filter checkboxes to false
  clearAllFilters = () => {
    this.trueFilterStateNames = [];
    this.filters = [];

    this.setState({
      Under18yearsold: false,
      "16to24yearsold": false,
      "18yearsoldandolder": false,

      Housing: false,
      JobTraining: false,
      Legal: false,
      Financial: false,
      Counseling: false,
      CaseManagement: false,

      AlamedaCounty: false,
      ContraCostaCounty: false,
      MarinCounty: false,
      SanFranciscoCounty: false,
      SanMateoCounty: false,

      Female: false,
      TransFemale: false,
      TransMale: false,
      Male: false,
      NonBinary: false,
      Fluid: false,

      DropInAvailable: false,
      OpenNow: false,
      VirtualServices: false,
      FaithBased: false,
      ChildrenAllowed: false,
    });
  };

  openSaveSearchModal = () => {
    this.setState({
      saveSearchModalOpen: true,
      searchSaveSuccess: false,
    });
  };

  // Reusable onChange func for all text inputs
  onChangeTextInput = (e, stateName) => {
    e.preventDefault();

    this.setState({
      [stateName]: e.target.value,
    });
  };

  cancelSavedSearch = () => {
    this.setState({
      saveSearchModalOpen: false,
    });
  };

  // Add new search object to the database and close the save search modal
  saveThisSearch = (saveSearchName, participantProfileId) => {
    const newSearchObj = {
      search_id:
        saveSearchName.replace(/\s+/g, "") +
        "" +
        Math.round(Math.random() * 1000),
      search_name: saveSearchName,
      participant_id: participantProfileId,
      search_filter_configuration: this.filters,
    };

    API.post("referall-provider", "addprovidersearch", {
      body: {
        provider_email: this.props.email,
        provider: this.props.provider,
        newSearchObj,
      },
    }).then((response) => {
      // console.log(this.props.email);
      if (response === "The Name Search already exists.") {
        if (participantProfileId) {
          alert(
            "This Search name already exists in this person's saved searches. Please use another name."
          );
        } else {
          alert("This search name already exists. Please use another name.");
        }
      } else {
        this.setState({
          saveSearchModalOpen: false,
          saveSearchName: "",
          searchSaveSuccess: true,
        });

        setTimeout(() => {
          if (this.state.searchSaveSuccess === true) {
            this.setState({
              searchSaveSuccess: false,
            });
          }
        }, 5000);
      }
    });
  };

  closeSearchSaveSuccess = () => {
    this.setState({
      searchSaveSuccess: false,
    });
  };

  openSavedSearchesModal = () => {
    this.setState({
      savedSearchesModalOpen: true,
      searchSaveSuccess: false,
    });
  };

  // When an item is clicked in the saved searches modal
  savedFiltersClick = (filters, stateNames) => {
    this.clearAllFilters();

    for (var i = 0; i < stateNames.length; i++) {
      // Set the filter state names to true
      this.setState({
        [stateNames[i]]: true,
        savedSearchesModalOpen: false,
      });
    }
    // Rewrite current this.filters array to now only equal these new filters
    this.filters = filters;
  };

  render() {
    var dataObjects = [];
    var dataToShow = [];

    // console.log(this.filters, "filters")
    //this.filters is the array storing all of the filters the user has selected

    // console.log(this.state.providersDataFromBackend, "provider data")
    // this.state.providersDataFromBackend is the array of all of the providers

    if (this.filters.length > 0 && this.state.providersDataFromBackend) {
      this.state.providersDataFromBackend.forEach((obj) => {
        // If the org matches on any of the age filters, age variable will be true
        var ageCategories = [
          "Under 18 years old",
          "16 - 24 years old",
          "18 years old and older",
        ];
        const found = ageCategories.some((r) => this.filters.indexOf(r) >= 0);
        var age;
        if (found) {
          const isInAgeObj = (currentValue) =>
            obj.provider_ages_served.indexOf(currentValue) > -1;
          age = this.filters.find(isInAgeObj);
        } else {
          age = true;
        }

        // If the org matches on any of the services filters, services variable will be true
        var servicesCategories = [
          "Housing",
          "Job Training",
          "Legal",
          "Financial",
          "Counseling",
          "Case Management",
        ];
        const servicesFound = servicesCategories.some(
          (r) => this.filters.indexOf(r) >= 0
        );
        var services;
        if (servicesFound) {
          const isInServicesObj = (currentValue) =>
            obj.provider_services_offered.indexOf(currentValue) > -1;
          services = this.filters.find(isInServicesObj);
        } else {
          services = true;
        }

        // If the org matches on any of the location filters, location variable will be true
        var locationCategories = [
          "Alameda County",
          "Contra Costa County",
          "Marin County",
          "San Francisco County",
          "San Mateo County",
        ];
        const locationsFound = locationCategories.some(
          (r) => this.filters.indexOf(r) >= 0
        );
        var location;
        if (locationsFound) {
          const isInLocationObj = (currentValue) =>
            obj.provider_county.indexOf(currentValue) > -1;
          location = this.filters.find(isInLocationObj);
        } else {
          location = true;
        }

        // If the org matches on any of the gender filters, gender variable will be true
        var genderCategories = [
          "Female",
          "Trans Female",
          "Trans Male",
          "Male",
          "Non Binary",
          "Fluid",
        ];
        const gendersFound = genderCategories.some(
          (r) => this.filters.indexOf(r) >= 0
        );
        var genders;
        if (gendersFound) {
          const isInGenderObj = (currentValue) =>
            obj.provider_genders_served.indexOf(currentValue) > -1;
          genders = this.filters.find(isInGenderObj);
        } else {
          genders = true;
        }

        // If the org matches on any of the other filters, other variable will be true
        var otherCategories = [
          "Drop In Available",
          "Open Now",
          "Virtual Services",
          "Faith Based",
          "Children Allowed",
        ];
        const otherFound = otherCategories.some(
          (r) => this.filters.indexOf(r) >= 0
        );
        var other;
        if (otherFound) {
          const isInOtherObj = (currentValue) =>
            obj.provider_other_characteristics.indexOf(currentValue) > -1;
          other = this.filters.find(isInOtherObj);
        } else {
          other = true;
        }

        if (age && services && location && genders && other) {
          dataObjects.push(obj);
          return;
        }

        // const isInObj = (currentValue) =>
        // 	Object.values(obj).toString().indexOf(currentValue) > -1;
        // if (this.filters.find(isInObj)) {
        // 	dataObjects.push(obj);
        // 	return;
        // }
        // console.log(this.filters);
        // console.log(obj);
      });
      dataToShow = dataObjects;
    } else if (this.state.providersDataFromBackend) {
      // Else if no filters are selected and this.filters is empty, show all the data
      dataToShow = this.state.providersDataFromBackend;
    }

    // Map each saved search as a button to display in the saved searches modal
    var allSavedSearches = "";

    if (this.state.savedSearches) {
      allSavedSearches = this.state.savedSearches.map((obj, i) => {
        return (
          <button
            className="btnNoStyle displayBlock marginBottom30 textAlignLeft cursorPointer"
            key={i}
            onClick={() => this.savedFiltersClick(obj.filters, obj.stateNames)}
          >
            <p className="bold marginBottom5">{obj.name}</p>
            <p>{obj.filters.join(", ")}</p>
            {/* <span> {obj.id}</span> */}
          </button>
        );
      });
    }

    // Map and return each address for an organization to show on the org details page
    var orgDetailsToShow = this.state.orgDetailsToShow;
    var orgDetailsAddresses = "";

    if (
      this.state.page === "showOrgDetails" &&
      orgDetailsToShow.provider_addresses
    ) {
      orgDetailsAddresses = orgDetailsToShow.provider_addresses.map(
        (item, i) => {
          return (
            <div className="flexRow marginBottom15" key={i}>
              <span>{item}</span>
              <img
                src={locationIconColor8F98A3}
                className="height20 marginLeft15"
                alt=""
              />
            </div>
          );
        }
      );
    }

    return (
      <div className="maxWidth95Percent paddingBottom60 tables providerList">
        <h1>Service Providers</h1>

        {dataToShow && (
          <div
            className={this.state.page === "showOrgDetails" ? "hideTable" : ""}
          >
            <MaterialTable
              tableRef={this.tableRef}
              data={dataToShow}
              title=""
              icons={tableIcons}
              options={{
                search: true,
                searchFieldAlignment: "left",
              }}
              // onSearchChange={}
              columns={[
                {
                  title: "Organization",
                  field: "provider_name",
                  // field: "name",
                  align: "left",
                  defaultSort: "asc",
                  sorting: true,
                  customSort: (a, b) => {
                    let textA = a.provider_name.toUpperCase();
                    let textB = b.provider_name.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  },
                  render: (rowData) => (
                    <div className="flexRow alignCenter">
                      <div
                        className="orgAvatars borderRadius5 marginRight20"
                        style={{
                          borderTopColor: rowData.avatar_colors[0],
                          borderLeftColor: rowData.avatar_colors[0],
                          borderRightColor: rowData.avatar_colors[1],
                          borderBottomColor: rowData.avatar_colors[1],
                        }}
                      />
                      <span>{rowData.provider_name}</span>
                    </div>
                  ),
                },
                {
                  title: "Types of Services",
                  // field: "typesOfServices",
                  field: "provider_services_offered",
                  sorting: false,
                  render: (rowData) =>
                    rowData.provider_services_offered.map((service, i) => {
                      return (
                        <p className="margin0" key={i}>
                          {service}
                        </p>
                      );
                    }),
                },
                {
                  title: "Clients Served",
                  // field: "whoWeHelp",
                  field: "org_for_who",
                  sorting: false,
                  render: (rowData) => (
                    <div className="flexRow justifySpaceBetween alignCenter">
                      <p className="marginRight11 marginBottom0">
                        {rowData.org_for_who}
                      </p>
                      <img
                        src={rightArrowColorD5D8DD}
                        className="height17"
                        alt=""
                      />
                    </div>
                  ),
                },
              ]}
              onRowClick={(e, rowData) =>
                this.setState({
                  page: "showOrgDetails",
                  orgDetailsToShow: rowData,
                })
              } // KEEP "e" AS A PARAMETER ELSE ERROR!
              localization={{
                body: {
                  emptyDataSourceMessage: (
                    <div className="fontSize18 lineHeight20 colorBlack2">
                      No organizations found which match your filters. <br></br>
                      <br></br> Change your filters or{" "}
                      <button
                        className="btnNoStyle btnNoFocus fontSize18 lineHeight20 colorBlack2 underline"
                        onClick={() => this.clearAllFilters()}
                      >
                        clear all filters now.
                      </button>
                    </div>
                  ),
                },
              }}
              components={{
                Toolbar: React.memo((props) => {
                  return (
                    <div>
                      <MTableToolbar {...props} />
                      <ProviderTableToolbar
                        parentState={this.state}
                        tableRefCurrentObj={this.tableRefCurrentObj}
                        handleCheckBoxChange={this.handleCheckBoxChange}
                        openFilterOverlay={this.openFilterOverlay}
                        closeFilterOverlay={this.closeFilterOverlay}
                        clearOneSetOfFilters={this.clearOneSetOfFilters}
                        updateCurrentFilters={this.updateCurrentFilters}
                        clearAllFilters={this.clearAllFilters}
                        filters={this.filters}
                        openSaveSearchModal={this.openSaveSearchModal}
                        onChangeTextInput={this.onChangeTextInput}
                        cancelSavedSearch={this.cancelSavedSearch}
                        saveThisSearch={this.saveThisSearch}
                        closeSearchSaveSuccess={this.closeSearchSaveSuccess}
                        openSavedSearchesModal={this.openSavedSearchesModal}
                        allSavedSearches={allSavedSearches}
                        savedFiltersClick={this.savedFiltersClick}
                        closeSavedSearchesModal={() =>
                          this.setState({ savedSearchesModalOpen: false })
                        }
                      />
                    </div>
                  );
                }),
              }}
            />
          </div>
        )}

        {/* On click of table row, show all of that orgs details */}
        {this.state.page === "showOrgDetails" && orgDetailsToShow ? (
          <OrgDetailPage
            orgDetailsToShow={orgDetailsToShow}
            orgDetailsAddresses={orgDetailsAddresses}
            backToProviderTable={() => this.setState({ page: "table" })}
          />
        ) : null}
      </div>
    );
  }
}

ServiceProviders.contextType = AppContext;
