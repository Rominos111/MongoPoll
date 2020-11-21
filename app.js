let db = null;
require("mongodb").MongoClient.connect(
    "mongodb://info508:info508@localhost:27017/info508",
    { useUnifiedTopology: true },
    function(err, client) {
        if (err)
            console.log("erreur");
        else
            db = client.db("info508");
    }
);

let express = require("express");
let app = express();

app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/public"));
app.listen(13014, function() {
    console.log("Lancement");
});

const fs = require("fs");

fs.readdirSync("routes").forEach(file => {
    eval(fs.readFileSync("routes/" + file) + '');
});
