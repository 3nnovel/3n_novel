firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveChapter() {
  const no = chapterNo.value;
  const text = chapterText.value;

  db.collection("chapters").doc("ch" + no).set({
    number: no,
    content: text
  }).then(() => alert("Chapter Saved!"));
}

function loadChapter() {
  const no = chapterNo.value;

  db.collection("chapters").doc("ch" + no).get().then(doc => {
    if (doc.exists) {
      chapterText.value = doc.data().content;
    } else alert("Not Found");
  });
}
