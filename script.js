// 1. Instantly apply saved theme to prevent white flashes on dark mode load
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A. PRODUCTION THEME TOGGLE LOGIC
    // ==========================================================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Configure initial emoji interface icon look
    themeToggleBtn.innerText = savedTheme === "dark" ? "☀️" : "🌙";

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = "light";
        
        if (currentTheme === "light") {
            newTheme = "dark";
            themeToggleBtn.innerText = "☀️";
        } else {
            themeToggleBtn.innerText = "🌙";
        }

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // ==========================================================================
    // B. SIMPLIFIED NODE INTERACTION LOOP FOR ALL POST CARDS
    // ==========================================================================
    const posts = document.querySelectorAll(".fb-post");

    posts.forEach((post) => {
        const likeBtn = post.querySelector(".like-btn");
        const likeCountLabel = post.querySelector(".like-count-value");
        const commentBtn = post.querySelector(".comment-btn");
        const commentInput = post.querySelector(".comment-input-field");
        const commentsList = post.querySelector(".comments-list-container");
        const commentCountLabel = post.querySelector(".comment-count-value");

        // Parse individual starting quantitative like tracking metric values
        let likesCount = parseInt(likeCountLabel.innerText, 10);
        let hasLiked = false;

        // I. Like Interaction Switch Handler
        likeBtn.addEventListener("click", () => {
            if (hasLiked === false) {
                likesCount = likesCount + 1;
                hasLiked = true;
                likeBtn.classList.add("active-liked");
            } else {
                likesCount = likesCount - 1;
                hasLiked = false;
                likeBtn.classList.remove("active-liked");
            }
            likeCountLabel.innerText = likesCount;
        });

        // II. Focus Text Input Field Box on Comment Trigger Click
        commentBtn.addEventListener("click", () => {
            commentInput.focus();
        });

        // III. Dynamic Inline Text Comment Injection String Builder
        commentInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && commentInput.value.trim() !== "") {
                event.preventDefault(); // Halt page jumping behavior
                
                // Read clean inner user string input parameters
                const message = commentInput.value.trim();

                // Generate basic native template bubble framework components
                const commentNode = document.createElement("div");
                commentNode.className = "comment-node";
                commentNode.innerHTML = `
                    <div class="avatar small">TA</div>
                    <div class="comment-bubble">
                        <span class="comment-user">@trackpi_aspirant</span>
                        <p>${escapeHtml(message)}</p>
                    </div>
                `;

                // Add to bottom target comment collection node tree & empty active panel text fields
                commentsList.appendChild(commentNode);
                commentInput.value = "";

                // Calculate updated live text values string count metrics
                let currentCommentsNum = commentsList.children.length;
                if (currentCommentsNum === 1) {
                    commentCountLabel.innerText = "1 Comment";
                } else {
                    commentCountLabel.innerText = currentCommentsNum + " Comments";
                }
            }
        });
    });

    // Helper sanitization helper utility function to prevent parsing element injection crashes
    function escapeHtml(unsafeString) {
        return unsafeString
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
