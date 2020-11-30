module.exports = (app, db) => {
    app.use("/department/:dep", function(req, res) {
        require("https").request(
            {
                host: "api-adresse.data.gouv.fr",
                path: encodeURI("/search/?q=" + req.params.dep),
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
                    let json = JSON.parse(body);

                    try {
                        let features = json.features;
                        let elem = features[0];
                        let geometry = elem.geometry;
                        let coordinates = geometry.coordinates;
                        let lat = coordinates[0], lon = coordinates[1];

                        res.send(JSON.stringify({
                            lat: lat,
                            lon: lon
                        }));
                    }
                    catch (e) {
                        res.send("err");
                    }
                });
                result.on("error", (e) => {
                    console.log("Error: " + e.message);
                });
            }
        ).end();
    });
}
