let db = null;
require("mongodb").MongoClient.connect(
    "mongodb://info508:info508@localhost:27017/info508",
    { useUnifiedTopology: true },
    function(err, client) {
        if (err)
            console.log("erreur");
        else {
            db = client.db("info508");
            require("./routes/bus")(app, db);
            require("./routes/checkTest")(app, db);
            require("./routes/covoit")(app, db);
            require("./routes/department")(app, db);
            require("./routes/distance")(app, db);
            require("./routes/filieres")(app, db);
            require("./routes/locomotion")(app, db);
            require("./routes/locomotionTime")(app, db);
            require("./routes/postal")(app, db);
            require("./routes/prenoms")(app, db);
            require("./routes/satisfaction")(app, db);
        }
    }
);

let express = require("express");
let app = express();

app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/public"));
app.listen(13014, function() {
    console.log("Lancement");
});

/*
const fs = require("fs");

fs.readdirSync("routes").forEach(file => {
    eval(fs.readFileSync("routes/" + file) + '');
});
*/
