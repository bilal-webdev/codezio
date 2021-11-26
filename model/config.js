const mongoose = require("mongoose");
const mongoURL = require("./key").link.URL;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));
