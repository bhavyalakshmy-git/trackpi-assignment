// Run instantly to prevent visual flashing before layout completes
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. THEME SWITCHER LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    function updateToggleInterface(theme) {
        themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }
    
    updateToggleInterface(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleInterface(newTheme);
    });

    // ==========================================
    // 2. FACEBOOK LIKE ENGAGEMENT TOGGLE
    // ==========================================
    const likeBtn = document.getElementById("like-action-btn");
    const likeCountDisplay = document.getElementById("like-count");
    
    let baseLikes = parseInt(likeCountDisplay.innerText, 10);
    let userHasLiked = false;

    likeBtn.addEventListener("click", () => {
        userHasLiked = !userHasLiked;
        
        if (userHasLiked) {
            baseLikes++;
            likeBtn.classList.add("active-like");
        } else {
            baseLikes--;
            likeBtn.classList.remove("active-like");
        }
        
        likeCountDisplay.innerText = baseLikes;
    });

    // ==========================================
    // 3. PROFILE ACCORDION MENU NAV DROPDOWN
    // ==========================================
    const profileBtn = document.getElementById("profile-dropdown-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle("active");
    });

    // Close settings dropdown automatically if clicking outside the elements
    document.addEventListener("click", (e) => {
        if (!profileDropdown.contains(e.target) && e.target !== profileBtn) {
            profileDropdown.classList.remove("active");
        }
    });
});
