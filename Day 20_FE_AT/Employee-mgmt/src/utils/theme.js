// Shared helpers for the Appearance (light/dark) theme toggle in Settings.
// The theme is persisted inside the existing "decorNestSettings" object in
// localStorage and applied via a data-theme attribute on <html>, which
// theme-light.css targets.

const SETTINGS_KEY = "decorNestSettings";

export function getStoredTheme() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return saved.theme === "light" ? "light" : "dark";
  } catch (e) {
    return "dark";
  }
}

export function applyTheme(theme) {
  const resolved = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", resolved);
}

// Applies whatever is currently stored — call once on app start.
export function applyStoredTheme() {
  applyTheme(getStoredTheme());
}
