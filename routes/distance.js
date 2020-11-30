module.exports = (app, db) => {
    app.use("/distance/:city", function(req, res) {
        require("https").request(
            {
                host: "fr.distance24.org",
                path: encodeURI("/route.json?stops=" + req.params.city + "|Chambery"),
                port: 443,
                method: "GET"
            },
            function(result) {
                let body = "";

                result.setEncoding("utf8");
                result.on("data", (chunk) => {
                    body += chunk;
                });
                result.on("end", () => {
                    res.send("" + JSON.parse(body).distance);
                });
                result.on("error", (e) => {
                    console.log("Error: " + e.message);
                });
            }
        ).end();
    });
}
