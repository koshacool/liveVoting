module.exports = {
  tokenTime: 2592000, // 60*60*24*30 -> 30 days
  maxLimitPerQuery: 1000, // -> max count of items GET api/v1/modes
  timeZone: 'Europe/Copenhagen',
  mailer : {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'rcyntest@gmail.com', // generated ethereal users
      pass: 'rcyn-test-12345' // generated ethereal password
    }
  }
};