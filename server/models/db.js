const mongoose = require("mongoose");
let DB_URL = process.env.DB_URL;

module.exports = async function connection() {
    try {
	mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
      })
	}
	catch(error) {
        process.exit()
    }
}
