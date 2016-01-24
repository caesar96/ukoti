// Lib Side
var express = require("express"),
        web = express();
// Config Side
web.set("view engine", "jade");
web.use(express.static("./public"));

// View Side
web.get("/", function (req, res) {
    res.render("home");
});

// Server side
web.listen(8080);