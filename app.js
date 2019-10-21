const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const characterRouter = require("./routes/characters");
const db = require("./helpers/database");
const app = express();

app.use(
    session({
        secret: "Ags shut down ole piss",
        resave: false,
        saveUninitialized: true
    })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/characters", characterRouter);

app.listen(3000);