const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6976c1653b7bf8bcb7b65e62e7646a31';
const authToken = '944ed78e1ef760abb1d64fb181cab72e';
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "sms_2fa",
    from: "+17372508034",
    to: "+917569345945",
  });

  console.log(message.sid);
}

createMessage();