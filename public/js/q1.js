request("http://mongo.learninglab.eu/gr3_info14/checkTest", (json) => {
    let noTest = json.noTest;
    let haveTest = json.haveTest;

    document.getElementById("noTest").innerText = noTest;
    document.getElementById("totalTest").innerText = noTest + haveTest;

    graph("graphNoTest", "pie", "Coché", [noTest, haveTest], ["Non test", "Test"]);
});
