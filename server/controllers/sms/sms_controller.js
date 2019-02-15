require("dotenv").config;
const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
// const { assistant } = require("../../index");
// const { sessionId } = require("../../index");

const AssistantV2 = require("watson-developer-cloud/assistant/v2");
const assistant = new AssistantV2({
  version: "2019-02-15",
  iam_apikey: "hHxYf-dpr_HTgMSlzPL3SuaxOxaWxuFEsg1j8ySz_xFY",
  url: "https://gateway.watsonplatform.net/assistant/api"
});
// console.log(assistant);

let local;
let sessionId = function() {
  console.log(local);
  return new Promise(async (resolve, reject) => {
    if (local) {
      return resolve(local);
    }

    assistant.createSession(
      {
        assistant_id: "eecb602e-d2c0-45f7-999e-b965e1e11404"
      },
      function(err, response) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(JSON.stringify(response.session_id, null, 2));
          // resolve(JSON.stringify(response.session_id, null, 2));
          resolve(response.session_id);
          local = response.session_id;
        }
      }
    );
  });
};

module.exports = {
  understand: async (req, res) => {
    console.log("assistant", assistant);
    const command = req.body.Body.toLowerCase();
    console.log(command);
    const twiml = new MessagingResponse();
    assistant.message(
      {
        assistant_id: "eecb602e-d2c0-45f7-999e-b965e1e11404",
        session_id: await sessionId(),
        input: {
          message_type: "text",
          text: command
        }
      },
      function(err, response) {
        if (err) {
          console.log("error:", err);
        } else {
          console.log(JSON.stringify(response, null, 2));
          console.log(response.output.generic[0].text);
          twiml.message(response.output.generic[0].text);
          res.writeHead(200, { "Content-Type": "text/xml" });
          res.end(twiml.toString());
        }
      }
    );
  }
};
