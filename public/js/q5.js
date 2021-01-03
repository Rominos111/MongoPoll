request("http://mongo.learninglab.eu/gr3_info14/locomotion", (json) => {
    let chartData = [];
    let chartLabels = [];

    for (let i = 0; i < json.length; i++) {
        chartData.push(json[i].count);
        chartLabels.push(json[i].vehicule === null ? "Aucun" : json[i].vehicule);
    }

    chartData.push(chartData.shift());
    chartLabels.push(chartLabels.shift());

    graph("graphLocomotion", "pie", "Véhicules", chartData, chartLabels);
});
