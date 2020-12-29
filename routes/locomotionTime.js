module.exports = (app, db) => {
    app.use("/locomotionTime", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (this["bus-time"])
                    emit("Bus", isNaN(parseInt(this["bus-time"])) ? 0 : parseInt(this["bus-time"]));
                else if (this["car-time"])
                    emit("Voiture", isNaN(parseInt(this["car-time"])) ? 0 : parseInt(this["car-time"]));
                else if (this["foot-time"])
                    emit("Pieds", isNaN(parseInt(this["foot-time"])) ? 0 : parseInt(this["foot-time"]));
                else
                    emit(null, 1);
            },
            function (key, values) {
                let count = 0;
                let sum = 0;

                for (let item of values) {
                    if (typeof item === "number") {
                        if (item < 150) {
                            count++;
                            sum += item;
                        }
                    }
                    else {
                        count += item.count;
                        sum += item.sum;
                    }
                }

                return {
                    count: count,
                    sum: sum
                };
            },
            {out: {inline: 1}},
            function (err, data) {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < data.length; i++) {
                        data[i].locomotion = data[i]._id;
                        data[i].count = data[i].value.count;
                        data[i].mean = data[i].value.sum / data[i].value.count;
                        data[i].mean = Math.ceil(data[i].mean * 10) / 10;
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
