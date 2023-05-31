const mongoose = require("mongoose");
let DB_URL = process.env.DB_URL;

module.exports = async function connection() {
    try {
	mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
      })
	  console.log('Mongo connected')
	}
	catch(error) {
        console.log(error)
        process.exit()
    }
}
