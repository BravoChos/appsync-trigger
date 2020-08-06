require("isomorphic-fetch");
const AWS = require("aws-sdk/global");
const AUTH_TYPE = require("aws-appsync").AUTH_TYPE;
const AWSAppSyncClient = require("aws-appsync").default;
const gql = require("graphql-tag");

const config = {
  url: "-----------YOUR AWS APPSYNC ENDPOINT------------", //    "https://API_ID.appsync-api.REGION.amazonaws.com/graphql",
  region: "AWS REGION",
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials
  },
  disableOffline: true
};

const client = new AWSAppSyncClient(config);

exports.handler = (event, context, callback) => {
  // An expected payload has the following format:
  // event = { to:"Nadia", body:"Hello!"}
  const { to, body } = event;

  (async () => {
    try {
      const result = await client.mutate({
        mutation: gql(`mutation Page($to: String!, $body: String!) { 
          page(to: $to, body: $body) { 
            to 
            body
          } 
        }`),
        variables: {
          to,
          body
        }
      });
      console.log(result.data);
      callback(null, result.data);
    } catch (e) {
      console.warn("Error sending mutation: ", e);
      callback(Error(e));
    }
  })();
};
