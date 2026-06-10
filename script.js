function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.getElementById("goToDownload").addEventListener("click", () => {
  const target = document.getElementById("downloadForm");

  const y = target.getBoundingClientRect().top + window.scrollY - 100;

  smoothScrollTo(y, 1200);
});


/*
** Popup Management
*/
const form = document.querySelector("downloadForm");
const popup = document.getElementById("popup");


window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("download") === "1") {
    document.getElementById("popup").classList.add("active");

    triggerDownload();
  }
});

function triggerDownload() {
  const url = "https://drive.google.com/uc?export=download&id=XXXX";

  const a = document.createElement("a");
  a.href = url;
  a.download = "livre-blanc.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}