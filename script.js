// script.js

// Wait until the DOM is ready before running Typed.js
document.addEventListener("DOMContentLoaded", () => {
  const typingTarget = document.querySelector("#typing");

  // Only run if #typing exists on the page
  if (typingTarget) {
    new Typed("#typing", {
      strings: [
        "Hi! ^500",
        "My name is LUMSOLDOM.^700",
        "I am a Computer Science student,^500 majoring in Cybersecurity."
      ],
      typeSpeed: 50,       // typing speed in ms
      backSpeed: 0,        // backspace speed
      backDelay: 500,      // delay before retyping
      loop: true,          // loop through the strings
      smartBackspace: false,
      showCursor: false
    });
  }
});
