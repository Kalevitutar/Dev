import React, { Component } from "react";
import API from "@aws-amplify/api";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
// import personSearchIcon from "../../Assets/personSearchIcon.png";
import errorIcon from "../../Assets/redExclamationErrorIcon.png";
// import { useAppContext } from "../useContext";

export class SaveASearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saveSearchName: "",
      participantName: "",
      saveSearchError: false,
      participantProfiles: [],
    };

    this.participantProfileRef = React.createRef();
    this.participantProfileCurrentRef = {};
  }

  componentDidMount(prevProps) {
    this.participantProfileCurrentRef = this.participantProfileRef.current;

    API.post("referall-provider", "getparticipantid", {
      body: {
        provider: this.props.appContext.provider,
        email: this.props.appContext.email,
      },
    }).then((response) => {
      // console.log("getparticipantid: ", response);
      this.setState({ participantProfiles: response });
    });
  }

  saveThisSearch = (e) => {
    e.preventDefault();

    if (this.state.participantName) {
      var selectedParticipantObj = this.state.participantProfiles.filter(
        (obj) => {
          return (
            obj.participant_data[0].preferred_name.toLowerCase() ===
            this.state.participantName.toLowerCase()
          );
        }
      );

      this.props.saveThisSearch(
        this.state.saveSearchName,
        selectedParticipantObj[0].participant_data[0].participant_id
      );
    } else {
      this.props.saveThisSearch(this.state.saveSearchName, "");
    }
  };

  render() {
    const { saveSearchModalOpen, filters } = this.props;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={"modalPlacement positionRelative saveASearchModal"}
        open={saveSearchModalOpen}
        // onClose={}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={saveSearchModalOpen}>
          <div className="width42vw backgroundColorWhite borderRadius8 padding30-40-20-30">
            <h2 id="transition-modal-title" className="marginTop0">
              Save this Search
            </h2>

            {filters.length > 0 ? (
              <p
                id="transition-modal-description"
                className="fontSize16 lineHeight18 marginBottom36"
              >
                <i>{filters.join(", ")}</i>
              </p>
            ) : (
              <p className="transition-modal-description fontSize16 lineHeight18 colorRed marginBottom36">
                <i>Please select filters to be saved.</i>
              </p>
            )}

            <div>
              <label htmlFor="saveSearchName">Name of Search</label>
              <div className="flexRow alignCenter">
                <TextField
                  name="saveSearchName"
                  className={
                    this.state.saveSearchError && !this.state.saveSearchName
                      ? "saveSearchNameInput error"
                      : "saveSearchNameInput"
                  }
                  value={this.state.saveSearchName}
                  onChange={(e) =>
                    this.setState({ saveSearchName: e.target.value })
                  }
                />
                {this.state.saveSearchError && !this.state.saveSearchName ? (
                  <img src={errorIcon} className="width20Height20" alt="!" />
                ) : null}
              </div>

              {this.state.saveSearchError && !this.state.saveSearchName ? (
                <span className="fontSize16 colorRed positionAbsolute">
                  Please name your search.
                </span>
              ) : null}

              <div className="marginBottom24"></div>

              {/* <div className="flexRow justifySpaceBetween">
								<div>
									<p className="fontSize16 lineHeight24 bold marginBottom5">
										Location
									</p>
									<p className="fontSize16 lineHeight18">Saved Searches</p>
								</div>
								<p className="fontSize16 lineHeight18 paddingtTop27 marginBottom0">
									or
								</p>
								<div className="width52Percent paddingtTop27">
									<p className="fontSize16 lineHeight18 marginBottom0">
										Add to Person’s Profile
									</p>

									<div className="flexRow positionRelative participantProfileContainer">
										<Autocomplete
											id="participantProfiles"
											className="positionRelative width100Percent height35 fontSize16 lineHeight18 border1Grey0 borderRadius5 marginLeftAuto marginBottom0"
											freeSolo
											// open={true} // Use to edit css of popper
											anchorel={this.participantProfileRef}
											disablePortal={true} // disable popper movement
											onChange={(e, value) =>
												this.setState({ participantName: value })
											}
											options={this.state.participantProfiles.map(
												(person) => person.participant_data[0].preferred_name
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													ref={this.participantProfileRef}
													className="positionRelative width100Percent height100Percent fontSize16 lineHeight18 textField"
													name="participantProfileTextField"
													value={this.state.participantName}
													onChange={(e) =>
														this.setState({ participantName: e.target.value })
													}
												/>
											)}
										/>

										<div className="width44 height100Percent borderleft1Grey0 positionAbsolute positionRight0 flexColumn alignCenter justifyCenter">
											<img
												src={personSearchIcon}
												className="width20 personSearchIcon"
												alt=""
											/>
										</div>
									</div>
								</div>
							</div> */}

              <div className="marginBottom40"></div>

              <div className="flexRow justifySpaceBetween">
                <button
                  className="btnOffWhite border1colorBlack1 colorBlack3 fontSize14 lineHeight16 padding12-16 borderRadius4"
                  type="button"
                  onClick={() => {
                    this.props.cancelSavedSearch();
                    this.setState({
                      saveSearchName: "",
                      saveSearchError: false,
                    });
                  }}
                >
                  Cancel
                </button>

                {filters.length > 0 && this.state.saveSearchName ? (
                  <button
                    className="btnWithStyle btnMagenta0 fontSize14 borderRadius4 padding12-16"
                    type="submit"
                    onClick={(e) => this.saveThisSearch(e)}
                  >
                    Save
                  </button>
                ) : null}

                {filters.length === 0 ? (
                  <button
                    className="btnWithStyle btnGrey0 fontSize14 borderRadius4 padding12-16 cursorDefault"
                    disabled
                  >
                    Save
                  </button>
                ) : null}
                {filters.length > 0 && !this.state.saveSearchName ? (
                  <button
                    className="btnWithStyle btnGrey0 fontSize14 borderRadius4 padding12-16 cursorDefault"
                    onClick={() => this.setState({ saveSearchError: true })}
                  >
                    Save
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    );
  }
}
