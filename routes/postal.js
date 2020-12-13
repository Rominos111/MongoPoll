module.exports = (app, db) => {
    app.use("/postal", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (this.postal)
                    emit(this.postal, 1);
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
                        data[i].postal = data[i]._id;
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
