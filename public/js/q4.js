request("http://mongo.learninglab.eu/gr3_info14/filiere", (json) => {
    let chartData = [];
    let chartLabels = [];
    for (let i = 0; i < json.length; i++) {
        chartData.push(json[i].count);
        chartLabels.push(json[i].filiere === null ? "Vide" : json[i].filiere);
    }

    graph("graphFiliere", "pie", "Filière", chartData, chartLabels);
});
