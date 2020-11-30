module.exports = (app, db) => {
    app.use("/locomotion", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (Object.keys(this).some(
                    function(k) {
                        return ~k.indexOf("bus")
                    })
                )
                    emit("Bus", 1);
                else if (Object.keys(this).some(
                    function(k) {
                        return ~k.indexOf("car")
                    })
                )
                    emit("Voiture", 1);
                else if (Object.keys(this).some(
                    function(k) {
                        return ~k.indexOf("foot")
                    })
                )
                    emit("Pieds", 1);
                else
                    emit(null, 1);
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
                        data[i].vehicule = data[i]._id;
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
