document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) return;
  // cargar estado guardado (opcional)
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.textContent = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      toggleButton.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
});
