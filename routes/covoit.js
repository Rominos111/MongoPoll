module.exports = (app, db) => {
    app.use("/covoit", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (this["car-pooling"])
                    emit("pooling", 1)
                else if (Object.keys(this).some(
                    function(k) {
                        return ~k.indexOf("car")
                    })
                )
                    emit("no-pooling", 1)
                else
                    emit("not-concerned", 1)
            },
            function (key, values) {
                return Array.sum(values);
            },
            { out: { inline: 1 } },
            function(err, data) {
                if (err)
                    console.log(err);
                else {
                    let obj = {};

                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id === "pooling")
                            obj.pooling = data[i].value;
                        else if (data[i]._id === "no-pooling")
                            obj["no-pooling"] = data[i].value;
                        else
                            obj["not-concerned"] = data[i].value;

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
