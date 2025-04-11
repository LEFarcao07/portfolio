document.addEventListener("DOMContentLoaded", function () {
// Custom Cursor
const cursorOuter = document.querySelector(".cursor-outer");
const cursorInner = document.querySelector(".cursor-inner");
const links = document.querySelectorAll(
  "a, button, .link, .btn, input, textarea"
);

if (cursorOuter && cursorInner) {
  let mouseX = 0;
  let mouseY = 0;
  let innerX = 0;
  let innerY = 0;
  let outerX = 0;
  let outerY = 0;

  const innerSpeed = 0.15;
  const outerSpeed = 0.1;

  function updateCursor() {
    const dx = mouseX - outerX;
    const dy = mouseY - outerY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    innerX = mouseX;
    innerY = mouseY;
    cursorInner.style.left = innerX + "px";
    cursorInner.style.top = innerY + "px";

    outerX += dx * outerSpeed;
    outerY += dy * outerSpeed;
    cursorOuter.style.left = outerX + "px";
    cursorOuter.style.top = outerY + "px";

    cursorOuter.style.transform = `translate(-50%, -50%) rotate(${
      angle + 90
    }deg)`;

    requestAnimationFrame(updateCursor);
  }

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      document.body.classList.add("link-hover");
      cursorOuter.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    link.addEventListener("mouseleave", function () {
      document.body.classList.remove("link-hover");
      cursorOuter.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

  // Initialize cursor animation
  updateCursor();
}
});