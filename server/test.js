const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateJwt = async () => {
  // Replace the example values below (remove the brackets).
  // Store secrets securely based on your team's best practices.
  // See: https://help.tableau.com/current/online/en-us/connected_apps_direct.htm

  //const secret = "12edf817-96db-475f-a73a-8c532efdb930";
  //const secretId = "8Gg0ga6p9wVKh4AEgxcoeAnN6TmsOQSpRLN58x5n3CU=";

  const secretId = "3b295c0d-aa81-4d0c-beb4-1dc58b847372";
  const secretValue = "X1UUKcOYcRi9op8BcR6an/0kH8gcM1N9VL8lcRnDPy8=";

  const clientId = "b2607474-8d41-4d95-900d-d1b4f3884771";
  //const scopes = ["tableau:views:embed", "tableau:views:embed_authoring"];
  const scopes = [
    "tableau:views:embed",
    "tableau:views:embed_authoring",
    "tableau:ask_data:embed",
  ];
  const userId = "ashragautam25@gmail.com";
  const tokenExpiryInMinutes = 10; // Max of 10 minutes.

  const userAttributes = {
    //  User attributes are optional.
    //  Add entries to this dictionary if desired.
    //  "[User Attribute Name]": "[User Attribute Value]",
  };

  const options = {
    algorithm: "HS256",
    expiresIn: tokenExpiryInMinutes * 60,
    header: {
      alg: "HS256",
      typ: "JWT",
      kid: secretId,
      iss: clientId,
    },
  };

  const data = {
    jti: uuidv4(),
    aud: "tableau",
    sub: userId,
    scp: scopes,
    ...userAttributes,
  };

  //const token = jwt.sign(data, secret, options);
  const token = jwt.sign(data, secretValue, options);
  console.log("Token: ", token);
  return token;
};

generateJwt()
  .then((token) => console.log(token))
  .catch((err) => console.error(err));
