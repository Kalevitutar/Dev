import React, { Component } from "react";
import facebookIcon from "../../Assets/facebookIcon.png";
import instagramIcon from "../../Assets/instagramIcon.png";

export class OrgDetailPage extends Component {
	// constructor(props) {
	//     super(props);
	// }

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const { orgDetailsToShow, orgDetailsAddresses } = this.props;
		// console.log(orgDetailsToShow)

		var agesServed = "";

		if (orgDetailsToShow.provider_ages_served) {
			// Details are not in a real array so have to make them into one
			var ageArray = orgDetailsToShow.provider_ages_served.toString();
			ageArray = ageArray.split(",");
			agesServed = ageArray.map((age, i) => {
				return (
					<p className="marginLeft15 marginBottom10" key={i}>
						{age}
					</p>
				);
			});
		}

		var servicesOffered = "";

		if (orgDetailsToShow.provider_services_offered) {
			// Details are not in a real array so have to make them into one
			var serviceArray = orgDetailsToShow.provider_services_offered.toString();
			serviceArray = serviceArray.split(",");
			servicesOffered = serviceArray.map((service, i) => {
				return (
					<p className="marginLeft15 marginBottom10" key={i}>
						{service}
					</p>
				);
			});
		}

		var gendersServed = "";

		if (orgDetailsToShow.provider_genders_served) {
			// Details are not in a real array so have to make them into one
			var gendersArray = orgDetailsToShow.provider_genders_served.toString();
			gendersArray = gendersArray.split(",");
			gendersServed = gendersArray.map((genders, i) => {
				return (
					<p className="marginLeft15 marginBottom10" key={i}>
						{genders}
					</p>
				);
			});
		}

		var otherCharacteristics = "";

		if (orgDetailsToShow.provider_other_characteristics) {
			// Details are not in a real array so have to make them into one
			var otherArray =
				orgDetailsToShow.provider_other_characteristics.toString();
			otherArray = otherArray.split(",");
			otherCharacteristics = otherArray.map((others, i) => {
				return (
					<p className="marginLeft15 marginBottom10" key={i}>
						{others}
					</p>
				);
			});
		}

		return (
			<div className="width75Percent">
				<button
					className="btnNoStyle underline marginBottom45"
					onClick={this.props.backToProviderTable}
				>
					Back
				</button>
				<div className="width80Percent">
					<div className="flexRow alignCenter marginBottom40">
						{orgDetailsToShow.avatar_colors ? (
							<div
								className="orgAvatars borderRadius5 marginRight20"
								style={{
									borderTopColor: orgDetailsToShow.avatar_colors[0],
									borderLeftColor: orgDetailsToShow.avatar_colors[0],
									borderRightColor: orgDetailsToShow.avatar_colors[1],
									borderBottomColor: orgDetailsToShow.avatar_colors[1],
								}}
							/>
						) : (
							<div></div>
						)}
						<span className="fontSize20 lineHeight22 bold">
							{orgDetailsToShow.provider_name}
						</span>
					</div>

					{orgDetailsToShow.provider_phone ? (
						<div className="flexRow marginBottom15">
							<span className="width60 fontSize16 lineHeight21 bold marginRight20">
								Phone
							</span>
							<a
								className="colorBlue1"
								href={"tel:" + orgDetailsToShow.provider_phone}
							>
								{orgDetailsToShow.provider_phone}
							</a>
						</div>
					) : null}

					{orgDetailsToShow.provider_hotline ? (
						<div className="flexRow alignCenter marginBottom15">
							<span className="width60 fontSize16 lineHeight21 bold marginRight20">
								24hr Hotline
							</span>
							<a
								className="colorBlue1"
								href={"tel:" + orgDetailsToShow.provider_hotline}
							>
								{orgDetailsToShow.provider_hotline}
							</a>
						</div>
					) : null}

					{orgDetailsToShow.provider_start_hours &&
					orgDetailsToShow.provider_close_hours ? (
						<div className="flexRow marginBottom15">
							<span className="width60 fontSize16 lineHeight21 bold marginRight20">
								Hours
							</span>
							<span>
								{orgDetailsToShow.provider_start_hours} -{" "}
								{orgDetailsToShow.provider_close_hours}
							</span>
						</div>
					) : null}

					{orgDetailsAddresses ? (
						<div className="flexRow marginBottom40">
							<span className="width60 fontSize16 lineHeight21 bold marginRight20">
								Address
							</span>
							<div>{orgDetailsAddresses}</div>
						</div>
					) : null}

					{orgDetailsToShow.org_for_who ? (
						<div className="marginBottom40">
							<p className="fontSize16 lineHeight21 bold marginBottom10">
								Who We Help
							</p>
							<p>{orgDetailsToShow.org_for_who}</p>
						</div>
					) : null}

					{orgDetailsToShow.org_our_services ? (
						<div className="marginBottom40">
							<p className="fontSize16 lineHeight21 bold marginBottom10">
								Our Services
							</p>
							<p>{orgDetailsToShow.org_our_services}</p>
						</div>
					) : null}

					{orgDetailsToShow.org_we_are ? (
						<div className="marginBottom40">
							<p className="fontSize16 lineHeight21 bold marginBottom10">
								Who We Are
							</p>
							<p>{orgDetailsToShow.org_we_are}</p>
						</div>
					) : null}
				</div>

				{/* Ages served... */}
				<div className="marginBottom40">
					<div className="flexRow marginBottom40">
						{orgDetailsToShow.provider_ages_served && agesServed ? (
							<div className="flexColumn flex1">
								<p className="fontSize16 lineHeight20 bold marginBottom10">
									Ages Served
								</p>
								{agesServed}
							</div>
						) : null}

						{orgDetailsToShow.provider_genders_served && gendersServed ? (
							<div className="flexColumn flex1">
								<p className="fontSize16 lineHeight20 bold marginBottom10">
									Genders Served
								</p>
								{gendersServed}
							</div>
						) : null}
					</div>

					<div className="flexRow marginBottom40">
						{orgDetailsToShow.provider_services_offered && servicesOffered ? (
							<div className="flexColumn flex1">
								<p className="fontSize16 lineHeight20 bold marginBottom10">
									Types of Services Offered
								</p>
								{servicesOffered}
							</div>
						) : null}

						{orgDetailsToShow.provider_other_characteristics &&
						otherCharacteristics ? (
							<div className="flexColumn flex1">
								<p className="fontSize16 lineHeight20 bold marginBottom10">
									Other Characteristics
								</p>
								{otherCharacteristics}
							</div>
						) : null}
					</div>
				</div>

				{/* Social Media */}
				{orgDetailsToShow.provider_website ||
				orgDetailsToShow.provider_facebook ||
				orgDetailsToShow.provider_instagram ? (
					<p className="fontSize16 lineHeight21 bold marginBottom10">
						Website & Social Media
					</p>
				) : null}

				{orgDetailsToShow.provider_website ? (
					<p>
						<a
							className="colorBlue1"
							href={"https://www.thisIsMySite.com"}
							target="_blank"
							rel="noopener noreferrer"
						>
							{orgDetailsToShow.provider_website}
						</a>
					</p>
				) : null}

				{orgDetailsToShow.provider_facebook ? (
					<a
						href={orgDetailsToShow.provider_facebook}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={facebookIcon}
							className="width28Height28 marginRight10"
							alt="Facebook"
						/>
					</a>
				) : null}

				{orgDetailsToShow.provider_instagram ? (
					<a
						href={orgDetailsToShow.provider_instagram}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={instagramIcon}
							className="width28Height28"
							alt="Instagram"
						/>
					</a>
				) : null}
			</div>
		);
	}
}
