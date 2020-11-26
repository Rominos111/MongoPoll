window.addEventListener("load", event => {
    let paths = [];

    paths.push("js/style.js");

    for (let i = 0; i <= 10; i++) {
        paths.push("js/q" + i + ".js");
    }

    for (let path of paths) {
        let imported = document.createElement("script");
        imported.src = path;
        document.body.appendChild(imported);
    }
})
