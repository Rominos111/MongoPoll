request("http://mongo.learninglab.eu/gr3_info14/prenoms", (json) => {
    tableaux("prenoms", "Prénom", "prenom", json);
});
