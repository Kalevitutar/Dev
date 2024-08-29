import React, { Component } from "react";

import Tippy from "@tippyjs/react";
import Chip from "@material-ui/core/Chip";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import greyCloseIcon from "../../Assets/greyCloseIcon.png";

import { SavedSearchesModal } from "./SavedSearchesModal";
import { SaveASearchModal } from "./SaveASearchModal";

export class ProviderTableToolbar extends Component {
	render() {
		const { parentState } = this.props;
		// console.log('toolbar props: ', this.props);
		return (
			<div>
				<div className="flexRow alignCenter flexWrap padding11-5-0">
					{/* Age Filter */}
					<div className="age filterContainer positionRelative">
						<Tippy
							interactive={true}
							visible={parentState.ageFilterPopoverOpen}
							className={"tippyTippy"}
							onClickOutside={() =>
								this.props.closeFilterOverlay("ageFilterPopoverOpen")
							}
							placement={"bottom"}
							content={
								<div className="filterPopovers">
									<div className="flexColumn alignFlexStart marginBottom16">
										<FormControlLabel
											control={
												<Checkbox
													name="Under18yearsold"
													checked={parentState.Under18yearsold}
													className={
														parentState.Under18yearsold
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Under 18 years old"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="16to24yearsold"
													checked={parentState["16to24yearsold"]}
													className={
														parentState["16to24yearsold"]
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="16 - 24 years old"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="18yearsoldandolder"
													checked={parentState["18yearsoldandolder"]}
													className={
														parentState["18yearsoldandolder"]
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="18 years old and older"
										/>
									</div>
									<div className="flexRow justifySpaceBetween">
										<button
											className="fontSize16 lineHeight20 btnNoStyle btnNoFocus colorBlue1 underline"
											onClick={() =>
												this.props.clearOneSetOfFilters(
													[
														"Under 18 years old",
														"16 - 24 years old",
														"18 years old and older",
													],
													"ageFilterPopoverOpen"
												)
											}
										>
											Clear
										</button>
										<button
											className="btnWithStyle btnMagenta0 fontSize14 lineHeight16 borderRadius4"
											onClick={() => {
												this.props.closeFilterOverlay("ageFilterPopoverOpen");
												this.props.updateCurrentFilters(
													[
														"Under 18 years old",
														"16 - 24 years old",
														"18 years old and older",
													],
													"ageFilterPopoverOpen"
												);
											}}
										>
											Save
										</button>
									</div>
								</div>
							}
						>
							<Chip
								label="Age"
								aria-describedby={
									Boolean(parentState.ageFilterPopoverOpen)
										? "simple-popover"
										: undefined
								}
								// ref={}
								className={
									parentState.ageFilterPopoverOpen
										? "border1Grey filterBtns open"
										: parentState.Under18yearsold ||
										  parentState["16to24yearsold"] ||
										  parentState["18yearsoldandolder"]
										? "border1Grey filterBtns active"
										: "border1Grey filterBtns"
								}
								clickable={true}
								onClick={() =>
									this.props.openFilterOverlay("ageFilterPopoverOpen")
								}
							/>
						</Tippy>
					</div>

					<div className="filterContainer positionRelative">
						<Tippy
							interactive={true}
							visible={parentState.servicesFilterPopoverOpen}
							onClickOutside={() =>
								this.props.closeFilterOverlay("servicesFilterPopoverOpen")
							}
							placement={"bottom"}
							content={
								<div className="filterPopovers">
									<div className="flexColumn alignFlexStart marginBottom16">
										<FormControlLabel
											control={
												<Checkbox
													name="Housing"
													checked={parentState.Housing}
													className={
														parentState.Housing
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Housing"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="JobTraining"
													checked={parentState.JobTraining}
													className={
														parentState.JobTraining
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Job Training"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="Legal"
													checked={parentState.Legal}
													className={
														parentState.Legal ? "checkbox checked" : "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Legal"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="Financial"
													checked={parentState.Financial}
													className={
														parentState.Financial
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Financial"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="Counseling"
													checked={parentState.Counseling}
													className={
														parentState.Counseling
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Counseling"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="CaseManagement"
													checked={parentState.CaseManagement}
													className={
														parentState.CaseManagement
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Case Management"
										/>
									</div>
									<div className="flexRow justifySpaceBetween">
										<button
											className="fontSize16 lineHeight20 btnNoStyle btnNoFocus colorBlue1 underline"
											onClick={() =>
												this.props.clearOneSetOfFilters(
													[
														"Housing",
														"Job Training",
														"Legal",
														"Financial",
														"Counseling",
														"Case Management",
													],
													"servicesFilterPopoverOpen"
												)
											}
										>
											Clear
										</button>
										<button
											className="btnWithStyle btnMagenta0 fontSize14 lineHeight16 borderRadius4"
											onClick={() => {
												this.props.closeFilterOverlay(
													"servicesFilterPopoverOpen"
												);
												this.props.updateCurrentFilters(
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
											}}
										>
											Save
										</button>
									</div>
								</div>
							}
						>
							<Chip
								label="Types of Services"
								aria-describedby={
									Boolean(parentState.servicesFilterPopoverOpen)
										? "simple-popover"
										: undefined
								}
								// ref={testRef}
								className={
									parentState.servicesFilterPopoverOpen
										? "border1Grey filterBtns open"
										: parentState.Housing ||
										  parentState.JobTraining ||
										  parentState.Legal ||
										  parentState.Financial ||
										  parentState.Counseling ||
										  parentState.CaseManagement
										? "border1Grey filterBtns active"
										: "border1Grey filterBtns"
								}
								clickable={true}
								onClick={() =>
									this.props.openFilterOverlay("servicesFilterPopoverOpen")
								}
							/>
						</Tippy>
					</div>

					<div className="filterContainer positionRelative">
						<Tippy
							interactive={true}
							visible={parentState.locationFilterPopoverOpen}
							onClickOutside={() =>
								this.props.closeFilterOverlay("locationFilterPopoverOpen")
							}
							placement={"bottom"}
							content={
								<div className="filterPopovers">
									<div className="flexColumn alignFlexStart marginBottom16">
										<FormControlLabel
											control={
												<Checkbox
													name="AlamedaCounty"
													checked={parentState.AlamedaCounty}
													className={
														parentState.AlamedaCounty
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Alameda County"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="ContraCostaCounty"
													checked={parentState.ContraCostaCounty}
													className={
														parentState.ContraCostaCounty
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Contra Costa County"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="MarinCounty"
													checked={parentState.MarinCounty}
													className={
														parentState.MarinCounty
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Marin County"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="SanFranciscoCounty"
													checked={parentState.SanFranciscoCounty}
													className={
														parentState.SanFranciscoCounty
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="San Francisco County"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="SanMateoCounty"
													checked={parentState.SanMateoCounty}
													className={
														parentState.SanMateoCounty
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="San Mateo County"
										/>
									</div>
									<div className="flexRow justifySpaceBetween">
										<button
											className="fontSize16 lineHeight20 btnNoStyle btnNoFocus colorBlue1 underline"
											onClick={() =>
												this.props.clearOneSetOfFilters(
													[
														"Alameda County",
														"Contra Costa County",
														"Marin County",
														"San Francisco County",
														"San Mateo County",
													],
													"locationFilterPopoverOpen"
												)
											}
										>
											Clear
										</button>
										<button
											className="btnWithStyle btnMagenta0 fontSize14 lineHeight16 borderRadius4"
											onClick={() => {
												this.props.closeFilterOverlay(
													"locationFilterPopoverOpen"
												);
												this.props.updateCurrentFilters(
													[
														"Alameda County",
														"Contra Costa County",
														"Marin County",
														"San Francisco County",
														"San Mateo County",
													],
													"locationFilterPopoverOpen"
												);
											}}
										>
											Save
										</button>
									</div>
								</div>
							}
						>
							<Chip
								label="Location"
								aria-describedby={
									Boolean(parentState.locationFilterPopoverOpen)
										? "simple-popover"
										: undefined
								}
								// ref={testRef}
								className={
									parentState.locationFilterPopoverOpen
										? "border1Grey filterBtns open"
										: parentState.AlamedaCounty ||
										  parentState.ContraCostaCounty ||
										  parentState.MarinCounty ||
										  parentState.SanFranciscoCounty ||
										  parentState.SanMateoCounty
										? "border1Grey filterBtns active"
										: "border1Grey filterBtns"
								}
								clickable={true}
								onClick={() =>
									this.props.openFilterOverlay("locationFilterPopoverOpen")
								}
							/>
						</Tippy>
					</div>

					<div className="filterContainer positionRelative">
						<Tippy
							interactive={true}
							visible={parentState.gendersFilterPopoverOpen}
							onClickOutside={() =>
								this.props.closeFilterOverlay("gendersFilterPopoverOpen")
							}
							placement={"bottom"}
							content={
								<div className="filterPopovers">
									<div className="flexColumn alignFlexStart marginBottom16">
										<FormControlLabel
											control={
												<Checkbox
													name="Female"
													checked={parentState.Female}
													className={
														parentState.Female ? "checkbox checked" : "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Female"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="TransFemale"
													checked={parentState.TransFemale}
													className={
														parentState.TransFemale
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Trans-Female"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="TransMale"
													checked={parentState.TransMale}
													className={
														parentState.TransMale
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Trans-Male"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="Male"
													checked={parentState.Male}
													className={
														parentState.Male ? "checkbox checked" : "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Male"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="NonBinary"
													checked={parentState.NonBinary}
													className={
														parentState.NonBinary
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Non-Binary"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="Fluid"
													checked={parentState.Fluid}
													className={
														parentState.Fluid ? "checkbox checked" : "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Fluid"
										/>
									</div>
									<div className="flexRow justifySpaceBetween">
										<button
											className="fontSize16 lineHeight20 btnNoStyle btnNoFocus colorBlue1 underline"
											onClick={() =>
												this.props.clearOneSetOfFilters(
													[
														"Female",
														"Trans Female",
														"Trans Male",
														"Male",
														"Non Binary",
														"Fluid",
													],
													"gendersFilterPopoverOpen"
												)
											}
										>
											Clear
										</button>
										<button
											className="btnWithStyle btnMagenta0 fontSize14 lineHeight16 borderRadius4"
											onClick={() => {
												this.props.closeFilterOverlay(
													"gendersFilterPopoverOpen"
												);
												this.props.updateCurrentFilters(
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
											}}
										>
											Save
										</button>
									</div>
								</div>
							}
						>
							<Chip
								label="Genders Served"
								aria-describedby={
									Boolean(parentState.gendersFilterPopoverOpen)
										? "simple-popover"
										: undefined
								}
								// ref={testRef}
								className={
									parentState.gendersFilterPopoverOpen
										? "border1Grey filterBtns open"
										: parentState.Female ||
										  parentState.TransFemale ||
										  parentState.TransMale ||
										  parentState.Male ||
										  parentState.NonBinary ||
										  parentState.Fluid
										? "border1Grey filterBtns active"
										: "border1Grey filterBtns"
								}
								clickable={true}
								onClick={() =>
									this.props.openFilterOverlay("gendersFilterPopoverOpen")
								}
							/>
						</Tippy>
					</div>

					{/* More Filters */}
					<div className="filterContainer positionRelative">
						<Tippy
							interactive={true}
							visible={parentState.moreFilterPopoverOpen}
							onClickOutside={() =>
								this.props.closeFilterOverlay("moreFilterPopoverOpen")
							}
							placement={"bottom"}
							content={
								<div className="filterPopovers">
									<div className="flexColumn alignFlexStart marginBottom16">
										<FormControlLabel
											control={
												<Checkbox
													name="DropInAvailable"
													checked={parentState.DropInAvailable}
													className={
														parentState.DropInAvailable
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Drop-in Available"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="OpenNow"
													checked={parentState.OpenNow}
													className={
														parentState.OpenNow
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Open Now"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="VirtualServices"
													checked={parentState.VirtualServices}
													className={
														parentState.VirtualServices
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Virtual Services"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="FaithBased"
													checked={parentState.FaithBased}
													className={
														parentState.FaithBased
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Faith-based"
										/>
										<FormControlLabel
											control={
												<Checkbox
													name="ChildrenAllowed"
													checked={parentState.ChildrenAllowed}
													className={
														parentState.ChildrenAllowed
															? "checkbox checked"
															: "checkbox"
													}
													onChange={this.props.handleCheckBoxChange}
												/>
											}
											label="Children Allowed"
										/>
									</div>
									<div className="flexRow justifySpaceBetween">
										<button
											className="fontSize16 lineHeight20 btnNoStyle btnNoFocus colorBlue1 underline"
											onClick={() =>
												this.props.clearOneSetOfFilters(
													[
														"Drop In Available",
														"Open Now",
														"Virtual Services",
														"Faith Based",
														"Children Allowed",
													],
													"moreFilterPopoverOpen"
												)
											}
										>
											Clear
										</button>
										<button
											className="btnWithStyle btnMagenta0 fontSize14 lineHeight16 borderRadius4"
											onClick={() => {
												this.props.closeFilterOverlay("moreFilterPopoverOpen");
												this.props.updateCurrentFilters(
													[
														"Drop In Available",
														"Open Now",
														"Virtual Services",
														"Faith Based",
														"Children Allowed",
													],
													"moreFilterPopoverOpen"
												);
											}}
										>
											Save
										</button>
									</div>
								</div>
							}
						>
							<Chip
								label="More Filters"
								aria-describedby={
									Boolean(parentState.moreFilterPopoverOpen)
										? "simple-popover"
										: undefined
								}
								// ref={testRef}
								className={
									parentState.moreFilterPopoverOpen
										? "border1Grey filterBtns open"
										: parentState.DropInAvailable ||
										  parentState.OpenNow ||
										  parentState.VirtualServices ||
										  parentState.FaithBased ||
										  parentState.ChildrenAllowed
										? "border1Grey filterBtns active"
										: "border1Grey filterBtns"
								}
								clickable={true}
								onClick={() =>
									this.props.openFilterOverlay("moreFilterPopoverOpen")
								}
							/>
						</Tippy>
					</div>
					<button
						className="btnNoStyle btnNoFocus fontSize14 lineHeight16 colorBlue1 underline"
						onClick={this.props.clearAllFilters}
					>
						Clear<br></br>Filters
					</button>
				</div>

				<div className="flexRow justifySpaceBetween">
					<div>
						{this.props.tableRefCurrentObj.state ? (
							<p className="fontSize14 lineHeight16 colorBlack2">
								{this.props.tableRefCurrentObj.state.data.length} Organizations
							</p>
						) : null}
					</div>
					<div>
						<button
							className="btnNoStyle btnNoFocus underline fontSize14 lineHeight16 colorBlue1 marginRight20"
							onClick={this.props.openSaveSearchModal}
						>
							<span>Save this Search</span>
						</button>

						<button
							className="btnNoStyle btnNoFocus fontSize14 lineHeight16 colorBlue1"
							onClick={this.props.openSavedSearchesModal}
						>
							<div className="flexRow alignFlexEnd">
								<span className="underline marginRight4">Saved Searches</span>
								<SearchIcon className="iconSize15 colorGrey2" />
							</div>
						</button>
					</div>
				</div>

				{/* Save this Search modal */}
				<SaveASearchModal
					appContext={parentState.appContext}
					saveSearchModalOpen={parentState.saveSearchModalOpen}
					filters={this.props.filters}
					onChangeTextInput={this.props.onChangeTextInput}
					cancelSavedSearch={this.props.cancelSavedSearch}
					saveThisSearch={this.props.saveThisSearch}
				/>

				{/* Save search success message */}
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={parentState.searchSaveSuccess}
					onClose={this.props.closeSearchSaveSuccess}
					message="Successfully saved this search!"
					key={"bottom center"}
					className="saveSearchSuccessSnackbar"
					action={
						<React.Fragment>
							<button
								className="btnNoStyle width14Height14"
								onClick={this.props.closeSearchSaveSuccess}
							>
								<img src={greyCloseIcon} className="width100Percent" alt="X" />
							</button>
						</React.Fragment>
					}
				/>

				{/* Saved Searches modal */}
				<SavedSearchesModal
					appContext={parentState.appContext}
					savedSearchesModalOpen={parentState.savedSearchesModalOpen}
					allSavedSearches={this.props.allSavedSearches}
					savedFiltersClick={this.props.savedFiltersClick}
					closeSavedSearchesModal={this.props.closeSavedSearchesModal}
				/>
			</div>
		);
	}
}
