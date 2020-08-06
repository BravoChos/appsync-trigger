const axios = require("axios");
exports.handler = async (event, context, callback) => {

  let to = "Nadia",
    body = "Hello, World";

  let headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "***-paste your Appsync-API-Key here***"
  };

  const result = await axios({
    method: "post",
    url:
      "https://YOUR-APPSYNC-ENDPOINT.amazonaws.com/graphql",
    data: {
      query: `mutation Page($to: String!, $body: String!) { 
        page(to: $to, body: $body) { 
          to 
          body
        } 
      }`,
      variables: {
        to,
        body
      }
    },
    headers
  });
  
  return result.data;
};
