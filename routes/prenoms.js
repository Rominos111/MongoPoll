module.exports = (app, db) => {
    app.use("/prenoms", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                emit(this["first-name"], 1);
            },
            function (key, values) {
                return values.length;
            },
            {out: {inline: 1}},
            function (err, data) {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].prenom = data[i]._id;
                        data[i].count = data[i].value;
                        delete data[i]._id;
                        delete data[i].value;
                    }

                    res.send(data);
                }

                return data;
            }
        );
    });
}
