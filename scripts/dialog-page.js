const dialog = document.getElementById("dialog-container");
const openBtn = document.getElementById("open-dialog");
const closeBtn = document.getElementById("close-dialog");

openBtn.addEventListener("click", () => {
  dialog.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.style.display = "none";
  }
});


