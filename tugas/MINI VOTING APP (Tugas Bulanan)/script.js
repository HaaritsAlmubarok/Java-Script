// =========================
// DATA PROJECT
// =========================

const projects = [
  {
    name: "Mobile Legends",
    emoji: "🎮",
    votes: 0,
  },

  {
    name: "FREE FIRE",
    emoji: "🔥",
    votes: 0,
  },

  {
    name: "PUBG",
    emoji: "🔫",
    votes: 0,
  },

  {
    name: "Stumble Guys",
    emoji: "🤪",
    votes: 0,
  },
];

// =========================
// FUNGSI VOTE
// =========================

function vote(index) {
  // Tambahkan 1 vote
  projects[index].votes++;

  // Update tampilan
  updateVoting(index);
}

// =========================
// RESET VOTING
// =========================

function resetVoting() {
  projects.forEach((project) => {
    project.votes = 0;
  });

  updateVoting();
}

// =========================
// FULLSCREEN
// =========================

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

// =========================
// UPDATE VOTING
// =========================

function updateVoting(selectedIndex) {
  // -------------------------
  // HITUNG TOTAL VOTE
  // -------------------------

  let totalVotes = 0;

  projects.forEach((project) => {
    totalVotes += project.votes;
  });

  // Tampilkan total vote
  document.getElementById("totalVotes").textContent = totalVotes;

  // -------------------------
  // UPDATE CARD
  // -------------------------

  projects.forEach((project, index) => {
    // Jumlah vote
    document.getElementById(`vote-${index}`).textContent = project.votes;

    // -------------------------
    // HITUNG PERSENTASE
    // -------------------------

    let percentage = 0;

    if (totalVotes > 0) {
      percentage = Math.round((project.votes / totalVotes) * 100);
    }

    // Tampilkan persentase
    document.getElementById(`percent-${index}`).textContent = percentage + "%";

    // Update progress bar
    document.getElementById(`progress-${index}`).style.width = percentage + "%";
  });

  // -------------------------
  // CARI LEADER
  // -------------------------

  let leader = projects[0];

  projects.forEach((project) => {
    if (project.votes > leader.votes) {
      leader = project;
    }
  });

  // -------------------------
  // UPDATE LEADER
  // -------------------------

  if (totalVotes > 0) {
    document.getElementById("leaderName").textContent =
      leader.emoji + " " + leader.name;

    document.getElementById("leaderVotes").textContent =
      leader.votes + " vote — sementara berada di posisi pertama 🔥";
  } else {
    document.getElementById("leaderName").textContent = "Belum ada vote";

    document.getElementById("leaderVotes").textContent =
      "Belum ada yang memimpin.";
  }
}
