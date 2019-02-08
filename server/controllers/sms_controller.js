require("dotenv").config;
const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = {
  understand: (req, res) => {
    const command = req.body.Body.split(" ")[0].toLowerCase();
    const twiml = new MessagingResponse();
    if (command === "hi") {
      twiml.message("Hello! How are you?");
    } else {
      twiml.message(
        "Im sorry I did not quite understand that? Please try again"
      );
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
};
