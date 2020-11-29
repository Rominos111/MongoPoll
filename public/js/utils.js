const request = function (url, arg) {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (typeof arg === "string")
                document.getElementById(arg).innerText = this.responseText;
            else {
                try {
                    arg(JSON.parse(this.responseText));
                }
                catch (e) {
                    console.log(this.responseText);
                }
            }
        }
    };
    xmlHttpRequest.open("GET", url);
    xmlHttpRequest.send();
};

const MAX_LENGTH = 16;

const tableaux = (id, title, name, json) => {
    let table = document.querySelector("#" + id);

    let tr = document.createElement("tr");

    let thPrenom = document.createElement("th");
    thPrenom.style.color = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    thPrenom.innerText = title;

    let thNb = document.createElement("th");
    thNb.style.color = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    thNb.innerText = "Nombre";

    tr.appendChild(thPrenom);
    tr.appendChild(thNb);

    table.appendChild(tr);

    for (let i = 0; i < json.length; i++) {
        let tr = document.createElement("tr");

        let tdPrenom = document.createElement("td");

        if (json[i][name] === null)
            tdPrenom.innerHTML = "<i>(Non rempli)</i>";
        else
            tdPrenom.innerText = (json[i][name].length >= MAX_LENGTH) ? json[i][name].slice(0, MAX_LENGTH) + "..." : json[i][name];

        let tdNb = document.createElement("td");
        tdNb.innerText = json[i].count;

        tr.appendChild(tdPrenom);
        tr.appendChild(tdNb);

        table.appendChild(tr);
    }
}
const palette      = Array.from({length: 4}, (_, i) => getComputedStyle(document.documentElement).getPropertyValue("--color-" + i).trim())
const paletteLight = Array.from({length: 4}, (_, i) => getComputedStyle(document.documentElement).getPropertyValue("--color-" + i + "-light").trim())
const paletteDark  = Array.from({length: 4}, (_, i) => getComputedStyle(document.documentElement).getPropertyValue("--color-" + i + "-dark").trim())

const graph = (id, type, name, data, labels, name2, data2) => {
    let fg         = getComputedStyle(document.documentElement).getPropertyValue("--text-color").trim();
    let fgOpposite = getComputedStyle(document.documentElement).getPropertyValue("--text-opposite-color").trim();
    let bg         = getComputedStyle(document.documentElement).getPropertyValue("--background-color").trim();

    let datasets = [{
        borderColor: (type === "line" || type === "radar") ? palette[1] : bg,
        fill: type === "radar",
        label: name,
        data: data
    }];

    if (type === "line")
        datasets[0].backgroundColor = palette[0];
    else if (type === "radar")
        datasets[0].backgroundColor = palette[0] + "7f";
    else
        datasets[0].backgroundColor = palette;

    if (name2 !== undefined) {
        datasets.push({
            backgroundColor: paletteDark,
            borderColor: bg,
            fill: false,
            label: name2,
            data: data2
        });
    }

    let options = {
        responsive: true,
        legend: {
            display: true,
            position: "bottom",
            fullWidth: false,
            labels: {
                fontColor: fg
            }
        }
    }

    if (type === "line" || type === "bar")
        options.scales = {
            xAxes: [{
                gridLines: {
                    color: fgOpposite
                },
                ticks: {
                    fontColor: fg,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: fgOpposite
                },
                ticks: {
                    fontColor: fg,
                }
            }]
        }
    else if (type === "radar")
        options.scale = {
            pointLabels: {
                fontColor: fg,
            },
            gridLines: {
                color: fgOpposite
            },
            ticks: {
                beginAtZero: true,
                max: 5
            }
        }

    new Chart(
        document.querySelector("#" + id).getContext("2d"), {
            type: type,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: options
        }
    );
}
