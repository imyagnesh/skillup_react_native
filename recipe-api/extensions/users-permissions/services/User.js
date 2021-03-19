const twilio = {
  id: process.env.TWILIO_ID,
  token: process.env.TWILIO_TOKEN,
  phone: process.env.TWILIO_PHONE,
}

const smsClient = require('twilio')(twilio.id, twilio.token);

module.exports = {
  async sendConfirmationSMS(user, hash) {
    const confirmationSMSToken = Math.floor(Math.random() * 9000) + 1000;

    await this.edit({ id: user.id }, { confirmationSMSToken });

    // Send an email to the user.
    await smsClient.messages.create({
      to: user.phone,
      from: twilio.phone,
      body: `Your verification code is ${confirmationSMSToken} ${hash}`
    });
  },
};
