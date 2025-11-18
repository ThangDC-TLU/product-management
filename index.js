const express = require("express");
const app = express();
require("dotenv").config();

const route = require("./routes/client/index.route")
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

//route
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
