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
        
        location.href = "/Dashboard"       

      } else {
        closeNav()
      }

    }
  }, 500);
};
check();


document.getElementById('login').addEventListener('click', function() {
    firebase.auth().signOut();
    location.href = "/";
  });
  