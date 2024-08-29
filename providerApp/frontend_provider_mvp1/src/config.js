const dev = {
	apiGateway: {
		REGION: "us-east-2",
		URL: "https://i77i4mdcoj.execute-api.us-east-2.amazonaws.com/dev/",
	},
	cognito: {
		REGION: "us-east-2",
		USER_POOL_ID: "us-east-2_obWhZvWKB",
		APP_CLIENT_ID: "46l6mrln8rmkv3517ipeo9jb1",
		IDENTITY_POOL_ID: "us-east-2:fcab4878-ddba-4134-8243-7a258a05ba2a",
	},
};

const staging = {
	apiGateway: {
		REGION: "us-east-2",
		URL: "https://4ojxgybmc6.execute-api.us-east-2.amazonaws.com/staging/",
	},
	cognito: {
	  	REGION: "us-east-2",
		USER_POOL_ID: "us-east-2_vofjrgoXY",
		APP_CLIENT_ID: "3ag4j0osl6q8mqnnkn4ra7ra7t",
		IDENTITY_POOL_ID: "us-east-2:57d89ef8-5f9d-44fe-92a8-19663d585e81",
	},
};

const config = process.env.REACT_APP_STAGE === "production" ? dev : staging;


// eslint-disable-next-line import/no-anonymous-default-export
export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	...config,
};
