import React, { Component } from "react";
import API from "@aws-amplify/api";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

export class SavedSearchesModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			savedSearches: [],
		};

		this.mounted = false;
	}

	componentDidMount() {
		// console.log('savedModal props: ', this.props);
		this.mounted = true;
		this.mounted &&
			API.post("referall-provider", "getproviderssavedsearches", {
				body: {
					provider_email: this.props.appContext.email,
					provider: this.props.appContext.provider,
				},
			}).then((response) => {
				this.mounted && this.setState({ savedSearches: response });
			});
	}

	componentWillUnmount() {
		// cancel subscriptions
		this.mounted = false;
	}

	// When a filter selection is made, update the filters in providerTableToolbar and reflect onto the table data
	savedFiltersClick = (filterArray) => {
		// Get the filter state names for the providerTableToolbar
		var stateNamesToUpdate = [];
		filterArray.map((item) => {
			return stateNamesToUpdate.push(item.replace(/ /g, ""));
		});
		this.props.savedFiltersClick(filterArray, stateNamesToUpdate);
	};

	render() {
		const { savedSearchesModalOpen } = this.props;

		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={"modalPlacement"}
				open={savedSearchesModalOpen}
				// onClose={}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={savedSearchesModalOpen}>
					<div className="minWidth320 width42vw maxHeight85vh backgroundColorWhite borderRadius8 padding30-40-20-30">
						<h2 id="transition-modal-title" className="marginTop0">
							Saved Searches
						</h2>

						<p className="fontSize16 lineHeight18 marginBottom36">
							Select a saved search to see a list.
						</p>

						{this.state.savedSearches.length > 0 ? (
							<div className="maxHeight55vh overflowScroll">
								{this.state.savedSearches.map((obj, i) => {
									return (
										<button
											className="btnNoStyle displayBlock marginBottom30 textAlignLeft cursorPointer"
											key={i}
											onClick={() =>
												this.savedFiltersClick(obj.search_filter_configuration)
											}
										>
											<p className="bold marginBottom5">{obj.search_name}</p>
											<p>{obj.search_filter_configuration.join(", ")}</p>
										</button>
									);
								})}
							</div>
						) : (
							<p className="marginBottom30">You have 0 saved searches.</p>
						)}

						<button
							className="btnOffWhite border1colorBlack1 colorBlack3 fontSize14 lineHeight16 borderRadius4 padding12-16"
							onClick={this.props.closeSavedSearchesModal}
						>
							Close
						</button>
					</div>
				</Fade>
			</Modal>
		);
	}
}
