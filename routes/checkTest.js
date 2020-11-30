module.exports = (app, db) => {
    app.use("/checkTest", function(req, res) {
        db.collection("locomotion").mapReduce(
            function () {
                if (this["no-test"] === "on")
                    emit("no-test", 1);
                else
                    emit("test", 1);
            },
            function (key, values) {
                return Array.sum(values);
            },
            {out: {inline: 1}},
            function (err, data) {
                if (err)
                    console.log(err);
                else {
                    let obj = {};

                    if (data[0]._id === "no-test") {
                        obj.noTest = data[0].value;
                        obj.haveTest = data[1].value;
                    }
                    else {
                        obj.haveTest = data[0].value;
                        obj.noTest = data[1].value;
                    }

                    res.send(JSON.stringify(obj));
                }

                return data;
            }
        );
    });
}
