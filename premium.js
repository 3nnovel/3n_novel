firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function buyPremium() {
  const userId = "demoUser"; // बाद में auth से आएगा

  db.collection("users").doc(userId).set({
    premium: true
  }, { merge: true });

  alert("🎉 You are now Premium!");
}
