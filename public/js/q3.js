request("http://mongo.learninglab.eu/gr3_info14/prenoms", (json) => {
    let arr = [];
    arr[null] = 0;

    for (let i = 0; i < json.length; i++) {
        if (json[i].prenom === null)
            arr[null]++;
        else {
            let c = json[i].prenom[0].toUpperCase()
            arr[c] === undefined ? arr[c] = 1 : arr[c]++;
        }
    }

    let jsonArr = [];
    let chartData = [];
    let chartLabels = [];

    for (let key of Object.keys(arr)) {
        jsonArr.push({
            prenom: (key === "null") ? null : key[0],
            count: arr[key]
        });
        chartData.push(arr[key]);
        chartLabels.push((key === "null") ? "Vide" : key[0]);
    }

    graph("graphInitiales", "line", "Initiales", chartData, chartLabels);
});
