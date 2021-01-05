request("http://mongo.learninglab.eu/gr3_info14/covoit", (json) => {
    let pooling = json.pooling;
    let noPooling = json["no-pooling"];
    let total = pooling + noPooling;

    document.querySelector("#poolingPercent").innerText = Math.ceil(1000 * json.pooling / total) / 10;

    graph("graphPooling", "pie", "Covoiturage", [noPooling, pooling], ["Pas de covoiturage", "Covoiturage"]);
});
