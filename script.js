### 3. `script.js`
```javascript
// Force immediate execution to block light-theme flashes during render parses
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LIGHT/DARK PRODUCTION THEME SYSTEM
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    function syncThemeButtonIcon(theme) {
        themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }
    
    syncThemeButtonIcon(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = activeTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
        syncThemeButtonIcon(targetTheme);
    });

    // ==========================================
    // 2. QUANTITATIVE LIKE STATE MACHINE ENGAGEMENT
    // ==========================================
    const likeActionButton = document.getElementById("like-toggle-action");
    const likeCountField = document.getElementById("like-count-value");
    
    let baseEngagementLikes = parseInt(likeCountField.innerText, 10);
    let userHasInteracted = false;

    likeActionButton.addEventListener("click", () => {
        userHasInteracted = !userHasInteracted;
        
        if (userHasInteracted) {
            baseEngagementLikes++;
            likeActionButton.classList.add("active-liked");
        } else {
            baseEngagementLikes--;
            likeActionButton.classList.remove("active-liked");
        }
        
        likeCountField.innerText = baseEngagementLikes;
    });

    // ==========================================
    // 3. PROFILE ACCORDION MENU NAVIGATION MODAL
    // ==========================================
    const avatarMenuTrigger = document.getElementById("avatar-menu-trigger");
    const accountDropdownMenu = document.getElementById("account-dropdown");

    avatarMenuTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        accountDropdownMenu.classList.toggle("active");
    });

    // Automatically collapse navigation layers when clicking out of context fields
    document.addEventListener("click", (event) => {
        if (!accountDropdownMenu.contains(event.target) && event.target !== avatarMenuTrigger) {
            accountDropdownMenu.classList.remove("active");
        }
    });

    // ==========================================
    // 4. REAL-TIME REPLY/COMMENT INJECTION ENGINE
    // ==========================================
    const commentTextField = document.getElementById("comment-text-field");
    const commentsBoxRoot = document.getElementById("comments-box-root");
    const commentTriggerCount = document.getElementById("comment-trigger-count");
    const commentFocusAction = document.getElementById("comment-focus-action");

    // Automatically focus the text field when clicking the "Comment" action button
    commentFocusAction.addEventListener("click", () => {
        commentTextField.focus();
    });

    let currentCommentCount = 24; // Seeds data string tracker metric

    commentTextField.addEventListener("keydown", (event) => {
        // Execute input extraction solely on target enter key strike without shift modifying it
        if (event.key === "Enter" && commentTextField.value.trim() !== "") {
            event.preventDefault();
            
            const commentValueText = commentTextField.value.trim();

            // Programmatically construct clean nested node structures matching production UI tree
            const commentNode = document.createElement("div");
            commentNode.className = "comment-node";

            commentNode.innerHTML = `
                <div class="avatar small">TA</div>
                <div class="comment-bubble-wrapper">
                    <div class="comment-bubble">
                        <a href="#" class="comment-user">@trackpi_aspirant</a>
                        <p>${escapeHtml(commentValueText)}</p>
                    </div>
                    <div class="comment-actions-links">
                        <button class="c-link-btn">Like</button>
                        <span class="dot-separator">•</span>
                        <button class="c-link-btn">Reply</button>
                        <span class="dot-separator">•</span>
                        <span class="comment-time">Just now</span>
                    </div>
                </div>
            `;

            // Append onto bottom thread framework node list and empty active layout fields
            commentsBoxRoot.appendChild(commentNode);
            commentTextField.value = "";

            // Dynamic incremental counter adjustment recalculations
            currentCommentCount++;
            commentTriggerCount.innerText = `${currentCommentCount} Comments`;
        }
    });

    // Helper sanitization utility function to prevent parsing string layout injection crashes
    function escapeHtml(unsafeString) {
        return unsafeString
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
