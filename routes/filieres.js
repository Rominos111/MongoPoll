module.exports = (app, db) => {
    app.use("/filiere", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                emit(this.field, 1);
            },
            function (key, values) {
                return Array.sum(values);
            },
            {out: {inline: 1}},
            function (err, data) {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].filiere = data[i]._id;
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
