document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. DYNAMIC THEME TOGGLE LOGIC
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Check local storage for existing theme preferences
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateToggleInterface(savedTheme);

    // Toggle button event action
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleInterface(newTheme);
    });

    function updateToggleInterface(theme) {
        themeToggleBtn.innerHTML = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    // ==========================================
    // 2. REAL-TIME INTERACTIVE LIKE BUTTONS
    // ==========================================
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
        // Target the first button (Like button) inside the actions container
        const likeBtn = post.querySelector(".post-actions .action-btn:first-child");
        
        // Generate realistic initial real-time engagement data (e.g., between 5 and 150 likes)
        let totalLikes = Math.floor(Math.random() * 145) + 5;
        let userHasLiked = false;

        // Dynamically insert a live tracking badge next to the text
        const countDisplay = document.createElement("span");
        countDisplay.className = "count-badge";
        countDisplay.style.fontWeight = "normal";
        countDisplay.style.marginLeft = "4px";
        countDisplay.innerText = totalLikes;
        likeBtn.appendChild(countDisplay);

        // Click handler to process immediate state updates
        likeBtn.addEventListener("click", () => {
            if (!userHasLiked) {
                totalLikes++;
                userHasLiked = true;
                likeBtn.style.color = "var(--primary-color)";
                likeBtn.style.fontWeight = "bold";
            } else {
                totalLikes--;
                userHasLiked = false;
                likeBtn.style.color = ""; 
                likeBtn.style.fontWeight = "";
            }
            // Seamlessly redraw the updated metrics text onto the page
            countDisplay.innerText = totalLikes;
        });
    });
});
