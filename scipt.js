document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic copyright year in the footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Light / Dark mode persisted in localStorage)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("site-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  htmlRoot.setAttribute("data-theme", initialTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlRoot.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    htmlRoot.setAttribute("data-theme", nextTheme);
    localStorage.setItem("site-theme", nextTheme);
  });

  // 3. One-click "Copy Email" interaction
  const copyBtn = document.getElementById("copy-email-btn");
  const statusMsg = document.getElementById("copy-status");

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      try {
        await navigator.clipboard.writeText(email);
        statusMsg.textContent = "Copied to clipboard!";
        setTimeout(() => {
          statusMsg.textContent = "";
        }, 2500);
      } catch (err) {
        statusMsg.textContent = "Failed to copy. Email: " + email;
      }
    });
  }
});
