module.exports = (app, db) => {
    app.use("/satisfaction", function(req , res){
        db.collection("locomotion").mapReduce(
            function () {
                if (this["moto-feeling"])
                    emit("Moto", parseInt(this["moto-feeling"]));
                else if (this["bike-feeling"])
                    emit("Vélo", parseInt(this["bike-feeling"]));
                else if (this["bus-feeling"])
                    emit("Bus", parseInt(this["bus-feeling"]));
                else if (this["car-feeling"])
                    emit("Voiture", parseInt(this["car-feeling"]));
                else if (this["foot-feeling"])
                    emit("Pieds", parseInt(this["foot-feeling"]));
                else
                    emit(null, 0);
            },
            function(key, values) {
                let count = 0;
                let sum = 0;

                for (let item of values) {
                    if (typeof item === "number") {
                        count++;
                        sum += item;
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
            function(err , data) {
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
            }
        )
    });
}
