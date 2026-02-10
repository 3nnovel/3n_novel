firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    userEmail.innerText = "Email: " + user.email;

    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists && doc.data().premium) {
        userType.innerText = "Membership: Premium 💎";
      } else {
        userType.innerText = "Membership: Free";
      }
    });
  }
});

function logout() {
  auth.signOut().then(() => window.location = "login.html");
}
