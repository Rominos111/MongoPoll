request("http://mongo.learninglab.eu/gr3_info14/satisfaction", (json) => {
    let chartData = [];
    let chartLabels = [];

    for (let i = 0; i < json.length; i++) {
        chartData.push(json[i].mean);
        chartLabels.push(json[i].locomotion === null ? "Aucun" : json[i].locomotion);
    }

    chartData.shift();
    chartLabels.shift();

    graph("graphLocomotionSatisfaction", "radar", "Satisfaction par moyen de transport", chartData, chartLabels);
});
