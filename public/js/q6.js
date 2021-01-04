request("http://mongo.learninglab.eu/gr3_info14/bus", (json) => {
    let graphData = [];
    let graphLabels = [];

    for (let i = 1; i <= 4; i++) {
        graphLabels.push("Affluence " + i);
        graphData.push(json["affluence-" + i]);
    }

    graph("graphBus", "bar", "Bus", graphData, graphLabels);
});
