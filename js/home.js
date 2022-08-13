function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

var WaterSaved = 0;
var Aerators = 0;
var Houses = 0;
db.collection("aerators").where("WaterSaved", "!=", null)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            WaterSaved += doc.data()["WaterSaved"]
            Aerators += doc.data()["Aerators"]
            Houses += 1
        });

        document.getElementById("WaterSaved").innerHTML = nFormatter(WaterSaved) +"+";
    document.getElementById("Aerators").innerHTML = Aerators;
    document.getElementById("Homes").innerHTML = Houses;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    