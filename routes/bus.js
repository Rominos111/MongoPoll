module.exports = (app, db) => {
    app.use("/bus", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (this["bus-affluence"])
                    emit("affluence-" + this["bus-affluence"], 1);
            },
            function (key, values) {
                return Array.sum(values);
            },
            { out: { inline: 1 } },
            function(err, data) {
                if (err)
                    console.log(err);
                else {
                    let obj = {}

                    for (let i = 0; i < data.length; i++) {
                        obj[data[i]._id] = data[i].value;
                        delete data[i]._id;
                        delete data[i].value;
                    }

                    res.send(JSON.stringify(obj));
                }

                return data;
            }
        );
    });
}
