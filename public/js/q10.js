function getDistance(origin, destination) {
    let lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    let deltaLat = lat2 - lat1;
    let deltaLon = lon2 - lon1;

    let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree*Math.PI/180;
}

const chambery = [45.64325, 5.8720];

request("http://mongo.learninglab.eu/gr3_info14/postal", (json) => {
    let postalMap = L.map("postalMap").setView(chambery, 10);
    let totalDist = 0.;

    for (let item of json) {
        request("http://mongo.learninglab.eu/gr3_info14/department/" + item.postal, (json2) => {
            let lat = json2.lat, lon = json2.lon;
            let dist = getDistance(chambery, [lon, lat]);

            totalDist += dist;

            dist = Math.ceil(dist/100)/10;

            L.circle([lon, lat], {
                color: palette[1],
                fillColor: paletteDark[1],
                fillOpacity: 0.5,
                radius: 500 + 25*item.count
            })
                .addTo(postalMap)
                .bindPopup("Emplacement: " + item.postal + ", " + item.count + " personnes, " + dist + " km");

            let distCool = totalDist / json.length;
            distCool = Math.ceil(distCool/100)/10;
            document.querySelector("#meanDist").innerHTML = "" + distCool;
        });
    }

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(postalMap);
});
