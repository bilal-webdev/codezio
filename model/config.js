const mongoose = require("mongoose");
// const mongoURL = require("./key").link.URL;

exports.Connection = (URL) => {
  mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log(err));
};
