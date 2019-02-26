require("dotenv").config;
const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

const AssistantV2 = require("watson-developer-cloud/assistant/v2");
const assistant = new AssistantV2({
  version: "2019-02-15",
  iam_apikey: "hHxYf-dpr_HTgMSlzPL3SuaxOxaWxuFEsg1j8ySz_xFY",
  url: "https://gateway.watsonplatform.net/assistant/api"
});

let sessionId = function(req) {
  return new Promise(async (resolve, reject) => {
    if (req.session.local) {
      return resolve(req.session.local);
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
          // console.log(JSON.stringify(response.session_id, null, 2));
          req.session.local = response.session_id;
          resolve(response.session_id);
        }
      }
    );
  });
};

module.exports = {
  understand: async (req, resp) => {
    const command = req.body.Body.toLowerCase();
    // console.log(req.body);
    // console.log(command);
    const twiml = new MessagingResponse();
    assistant.message(
      {
        assistant_id: "eecb602e-d2c0-45f7-999e-b965e1e11404",
        session_id: await sessionId(req),
        input: {
          message_type: "text",
          text: command
        }
      },
      function(err, response) {
        if (err) {
          console.log("error:", err);
        } else {
          // console.log(JSON.stringify(response, null, 2));
          // console.log(response.output.generic[0].text);
          if (response.output.intents[0].intent === "get_tasks") {
            const db = req.app.get("db");
            db.get_task(req.session.user.id).then(res => {
              const singular = res.map((e, i) => {
                return e.body;
              });
              twiml.message(response.output.generic[0].text + " " + singular);
              resp.writeHead(200, { "Content-Type": "text/xml" });
              resp.end(twiml.toString());
            });
          } else if (response.output.intents[0].intent === "get_contacts") {
            const db = req.app.get("db");
            db.get_contact(req.session.user.id).then(res => {
              const singular = res.map((e, i) => {
                return e.name;
              });
              twiml.message(response.output.generic[0].text + " " + singular);
              resp.writeHead(200, { "Content-Type": "text/xml" });
              resp.end(twiml.toString());
            });
          } else {
            twiml.message(response.output.generic[0].text);
            resp.writeHead(200, { "Content-Type": "text/xml" });
            resp.end(twiml.toString());
          }
        }
      }
    );
  }
};
