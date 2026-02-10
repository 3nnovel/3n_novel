const firebaseConfig = {
  apiKey: "AIzaSyAbVpUncGYuGntuZsLTXXXXXXXX",
  authDomain: "n-novel.firebaseapp.com",
  projectId: "n-novel",
  storageBucket: "n-novel.appspot.com",
  messagingSenderId: "647987747126",
  appId: "1:647987747126:web:c966990a1ad069762fb97"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup Successful!");
      window.location = "index.html";
    })
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location = "index.html")
    .catch(err => alert(err.message));
}
