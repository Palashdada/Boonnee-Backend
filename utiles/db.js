const { default: mongoose } = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connect .....", mongoose.connection.name);
  } catch (err) {
    console.log(err.message);
  }
};
