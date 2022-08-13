openNav()
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var retry = 0

var Aerators = 0
var KitchenAerators = 0
var BathroomAerators = 0
var BathroomDate = ""
var KitchenDate = ""


let check = function() {
  setTimeout(function () {
    if (firebase.auth().currentUser === null && retry < 5) {
      retry+=1;
      check();

    } else {
      if (firebase.auth().currentUser){

        var user = firebase.auth().currentUser

        $("#login").text("logout")

        if (user.photoURL) {
          var photoURL = user.photoURL;
          // Append size to the photo URL for Google hosted images to avoid requesting
          // the image with its original resolution (using more bandwidth than needed)
          // when it is going to be presented in smaller size.
          if ((photoURL.indexOf('googleusercontent.com') != -1) ||
              (photoURL.indexOf('ggpht.com') != -1)) {
                
            photoURL = photoURL + '?sz=' +
                document.getElementById('photo').clientHeight;
          }
          document.getElementById('photo').style.backgroundImage = 'url('+photoURL+')';
          document.getElementById('photo').style.display = 'block';
        } 
        closeNav()

        
        db.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          document.getElementById("first").value = doc.data()["First"];
          document.getElementById("last").value = doc.data()["Last"];
          document.getElementById("email").value = doc.data()["Email"];
          document.getElementById("phone").value = doc.data()["Phone"];
          document.getElementById("city").value = doc.data()["City"];
          document.getElementById("pincode").value = doc.data()["Pincode"];
          document.getElementById("school").value = doc.data()["School"];
          document.getElementById("grade").value = doc.data()["Grade"];

        } 

        }).catch((error) => {
          console.log("Error getting document:", error);
        });



        db.collection("aerators").doc(firebase.auth().currentUser.uid).get().then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());

            Aerators = doc.data()["Aerators"];
            KitchenAerators = doc.data()["Kitchen"]["Number"];
            BathroomAerators = doc.data()["Bathroom"]["Number"];
            BathroomDate = doc.data()["Bathroom"]["Date"];
            KitchenDate = doc.data()["Kitchen"]["Date"];
  
          } 
  
          }).catch((error) => {
            console.log("Error getting document:", error);
          });

      } else {
        location.href = "/Login"
      }

    }
  }, 500);
};
check();



$("#ProfileForm").submit(function(e) {
    console.log("hello");
    e.preventDefault();
    
    var first = document.getElementById("first").value;
    var last = document.getElementById("last").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var pincode = document.getElementById("pincode").value;
    var school = document.getElementById("school").value;
    var grade = document.getElementById("grade").value;

    console.log("yelliopoo", first, last, email, phone, city, pincode, school, grade);
    UpdateUserProfile(first, last, email, phone, city, pincode, school, grade);
    // $("#ProfileForm").hide();
  });
  


document.getElementById('login').addEventListener('click', function() {
  firebase.auth().signOut();
  location.href = "/";
});

var UpdateUserProfile = function(first, last, email, phone, city, pincode, school, grade) {

    console.log("reeeee", BathroomAerators)
    db.collection("users").doc(firebase.auth().currentUser.uid).set({
     First: first,
     Last: last,
     Email: email,
     Phone: phone,
     City: city,
     Pincode: pincode,
     School: school,
     Grade: grade,
   })
   .then(() => {
       console.log("Successful :D");
       location.href = "/Dashboard"
   })
   .catch((error) => {
       console.error("Error adding document: ", error);
   });



   db.collection("aerators").doc(firebase.auth().currentUser.uid).set({
    Aerators: Aerators,
    Kitchen: {
     Number: KitchenAerators,
     Date: KitchenDate
    },
    Bathroom: {
       Number: BathroomAerators,
       Date: BathroomDate
    }
  })
  .then(() => {
      console.log("Successful :D");
      location.href = "/Dashboard"
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
 }