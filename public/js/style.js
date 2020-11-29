let darkMode = true;

function setDarkMode() {
    darkMode = true;

    let root = document.documentElement;
    root.style.setProperty("--text-color", getComputedStyle(document.documentElement).getPropertyValue("--primary-text-dark"));
    root.style.setProperty("--background-color", getComputedStyle(document.documentElement).getPropertyValue("--background-dark"));
}

function unsetDarkMode() {
    darkMode = false;

    let root = document.documentElement;
    root.style.setProperty("--text-color", getComputedStyle(document.documentElement).getPropertyValue("--primary-text-light"));
    root.style.setProperty("--background-color", getComputedStyle(document.documentElement).getPropertyValue("--background-light"));
}

// $('#themeModal').modal('show')
