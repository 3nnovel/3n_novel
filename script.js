// 🔥 Firebase Config (अपने वाले से replace करना)
const firebaseConfig = {
  apiKey: "AIzaSyAbVpUncGYuGntuZsLTXXXXXXXX",
  authDomain: "n-novel.firebaseapp.com",
  projectId: "n-novel",
  storageBucket: "n-novel.appspot.com",
  messagingSenderId: "647987747126",
  appId: "1:647987747126:web:c966990a1ad069762fb97"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let chapter = 1;
let isPremium = false; // बाद में Firebase user से आएगा

// 📖 Open Novel Page
function openNovel() {
  document.getElementById("novelPage").classList.remove("hidden");
  loadChapter(chapter);
}

// 🔓 Load Chapter with Lock System
function loadChapter(num) {
  if (num > 3 && !isPremium) {
    document.getElementById("chapterContent").innerText =
      "🔒 This chapter is locked. Please upgrade to Premium.";
    return;
  }

  db.collection("chapters").doc("ch" + num).get().then(doc => {
    if (doc.exists) {
      document.getElementById("chapterContent").innerText = doc.data().content;
    } else {
      document.getElementById("chapterContent").innerText = "No Chapter Found.";
    }
  });
}

// ➡ Next Chapter
function nextChapter() {
  chapter++;
  loadChapter(chapter);
}

// ⬅ Previous Chapter
function prevChapter() {
  if (chapter > 1) chapter--;
  loadChapter(chapter);
}

// 🔗 Share
function shareNovel() {
  navigator.clipboard.writeText(window.location.href);
  alert("📎 Link copied!");
}

// ⭐ Rating
function rate(star) {
  db.collection("ratings").add({
    star: star,
    time: Date.now()
  });
  alert("Thanks for rating ⭐");
}

// 💬 Add Comment
function addComment() {
  let text = document.getElementById("commentInput").value;
  if (!text) return;

  db.collection("comments").add({
    text: text,
    time: Date.now()
  });

  document.getElementById("commentInput").value = "";
}

// 🔄 Real-Time Comments Load
db.collection("comments").orderBy("time").onSnapshot(snapshot => {
  const list = document.getElementById("commentList");
  list.innerHTML = "";

  snapshot.forEach(doc => {
    let li = document.createElement("li");
    li.innerText = doc.data().text;
    list.appendChild(li);
  });
});

// 🌙 Dark Mode Toggle
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};

// 🔍 Search (Basic Demo)
document.getElementById("searchBar").addEventListener("keyup", function () {
  let val = this.value.toLowerCase();
  document.querySelectorAll(".novel-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(val)
      ? "block"
      : "none";
  });
});
