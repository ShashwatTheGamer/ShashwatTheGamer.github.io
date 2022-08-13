openNav()
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var retry = 0

let check = function() {
  setTimeout(function () {
    if (firebase.auth().currentUser === null && retry < 5) {
      retry+=1;
      check();

    } else {
      if (firebase.auth().currentUser){

        $("#login").text("logout")

        closeNav()

        db.collection("aerators").doc(firebase.auth().currentUser.uid).get().then((doc) => {
          if (doc.exists) {
            
            var KitchenAerators = doc.data()["Kitchen"]["Number"]
            var BathroomAerators = doc.data()["Bathroom"]["Number"]
            var BathroomDate = doc.data()["Bathroom"]["Date"]
            var KitchenDate = doc.data()["Kitchen"]["Date"]
            
            let TodayDate = new Date();
            let BathroomTotalDays
            let KitchenTotalDays

            if (BathroomDate != ""){
              let JSBathroomDate = new Date(BathroomDate);
              let Bathroomdifference = TodayDate - JSBathroomDate
              BathroomTotalDays = Math.ceil(Bathroomdifference / (1000 * 3600 * 24)) - 1  
            } else {
              BathroomTotalDays = 0
            }
            if (KitchenDate != ""){
              let JSKitchenDate = new Date(KitchenDate);
            let Kitchendifference = TodayDate - JSKitchenDate
            KitchenTotalDays = Math.ceil(Kitchendifference / (1000 * 3600 * 24)) - 1
            
            } else {
              KitchenTotalDays = 0
            }
            var WaterSaved = BathroomTotalDays * Number(BathBathroomTotalDaysroomAerators) * WaterCalculation["Bathroom"] + KitchenTotalDays * Number(KitchenAerators) * WaterCalculation["Kitchen"]
            
              document.getElementById("WaterSaved").innerHTML = WaterSaved + "Ltrs";
              document.getElementById("Aerators").innerHTML = doc.data()["Aerators"] + " AERATORS INSTALLED";
              document.getElementById("number-kitchen").value = doc.data()["Kitchen"]["Number"];
              document.getElementById("number-bathroom").value = doc.data()["Bathroom"]["Number"];
              document.getElementById("date-bathroom").value = doc.data()["Bathroom"]["Date"];
              document.getElementById("date-kitchen").value = doc.data()["Kitchen"]["Date"];

          } else {
              location.href = "/UserProfile"
          }
        }).catch((error) => {
          console.log("Error getting userprofile:", error);
        });

      } else {
        location.href = "/Login"
      }

    }
  }, 500);
};
check();

var today = new Date().toISOString().split('T')[0];
document.getElementById("date-bathroom").setAttribute('max', today);
document.getElementById("date-kitchen").setAttribute('max', today);

$("#WaterForm").submit(function(e) {
  console.log("hello");
  e.preventDefault();
  
  var KitchenAerators = document.getElementById("number-kitchen").value
  var BathroomAerators = document.getElementById("number-bathroom").value
  var BathroomDate = document.getElementById("date-bathroom").value
  var KitchenDate = document.getElementById("date-kitchen").value

  console.log("yelliopoo", KitchenAerators, BathroomAerators, BathroomDate, KitchenDate);
  UpdateAeratorsList(KitchenAerators, BathroomAerators, BathroomDate, KitchenDate);
  
});


document.getElementById('login').addEventListener('click', function() {
    firebase.auth().signOut();
    location.href = "/";
  });
  


var UpdateAeratorsList = function(KitchenAerators, BathroomAerators, BathroomDate, KitchenDate) {

      var Aerators = Number(KitchenAerators) + Number(BathroomAerators)

      db.collection("aerators").doc(firebase.auth().currentUser.uid).update({
        Aerators: Aerators,
        Kitchen: {
         Number: Number(KitchenAerators),
         Date: KitchenDate
        },
        Bathroom: {
           Number: Number(BathroomAerators),
           Date: BathroomDate
        }
     })
     .then(() => {
         console.log("Successful :D");
         location.reload()
     })
     .catch((error) => {
         console.error("Error adding document: ", error);
     });
   }