firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists && doc.data().role === "admin") {
        window.location = "admin.html";
      }
    });
  }
});
