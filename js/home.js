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
db.collection("aerators").where("Aerators", "!=", 0)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            var KitchenAerators = doc.data()["Kitchen"]["Number"]
            var BathroomAerators = doc.data()["Bathroom"]["Number"]
            var BathroomDate = doc.data()["Bathroom"]["Date"]
            var KitchenDate = doc.data()["Kitchen"]["Date"]

            let TodayDate = new Date();
            let JSBathroomDate = new Date(BathroomDate);
            let Bathroomdifference = TodayDate - JSBathroomDate
            let BathroomTotalDays = Math.ceil(Bathroomdifference / (1000 * 3600 * 24)) - 1
            
            let JSKitchenDate = new Date(KitchenDate);
            let Kitchendifference = TodayDate - JSKitchenDate
            let KitchenTotalDays = Math.ceil(Kitchendifference / (1000 * 3600 * 24)) - 1
            var DocWaterSaved = BathroomTotalDays * Number(BathroomAerators) * WaterCalculation["Bathroom"] + KitchenTotalDays * Number(KitchenAerators) * WaterCalculation["Kitchen"]
        

            WaterSaved += DocWaterSaved
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

    