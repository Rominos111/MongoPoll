request("http://mongo.learninglab.eu/gr3_info14/locomotionTime", (json) => {
    let chartCount = [];
    let chartTime = [];
    let chartLabels = [];

    for (let i = 0; i < json.length; i++) {
        chartCount.push(json[i].count);
        chartTime.push(json[i].mean);
        chartLabels.push(json[i].locomotion === null ? "Aucun" : json[i].locomotion);
    }

    chartCount.push(chartCount.shift());
    chartTime.push(chartTime.shift());
    chartLabels.push(chartLabels.shift());

    graph("graphLocomotionTime", "bar", "Nombre de personnes", chartCount, chartLabels, "Temps de trajet", chartTime);
});
