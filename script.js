const showcaseProjects = [
    {
        title: "8-bit Game",
        category: "COURSE PROJECT",
        description:
            "8-bit game developed with the teaching Game Engine.",
        video: "Video/GEA.mp4",
        tags: ["C++", "Game Engine", "Gameplay"]
    },
    {
        title: "3D Game",
        category: "COURSE PROJECT",
        description:
            "3D game developed using C++ rendering techniques and the teaching Game Engine.",
        video: "Video/GEDD.mp4",
        tags: ["C++", "3D", "Rendering"]
    },
    {
        title: "ChatRoom",
        category: "COURSE PROJECT",
        description:
            "Online chat system implementing client-server communication and real-time interaction.",
        video: "Video/chatroom.mp4",
        tags: ["C++", "Networking", "Client / Server"]
    },
    {
        title: "Rasterizer",
        category: "COURSE PROJECT",
        description:
            "Software rasterization project exploring graphics pipelines and rendering fundamentals.",
        video: "Video/Raster.mp4",
        tags: ["C++", "Graphics", "Rasterization"]
    },
    {
        title: "SkyFire-Uprise",
        category: "COLLABORATIVE PROJECT",
        description:
            "UE5.4 third-person space shooter. Developed the complete controllable character and 3C system.",
        video: "Video/SkyFire.mp4",
        tags: ["UE5.4", "C++", "3C", "Gameplay"]
    },
    {
        title: "LLM-Driven Dynamic Difficulty",
        category: "RESEARCH PROJECT",
        description:
            "UE5 tower defense project using LLM-driven player threat modeling for dynamic difficulty adjustment.",
        video: "Video/Game.mp4",
        tags: ["UE5", "LLM", "DDA", "AI"]
    },
    {
        title: "ACG",
        category: "PERSONAL PROJECT",
        description:
            "ACG game project.",
        video: "Video/ACG.mp4",
        tags: ["Game", "Gameplay"]
    }
];


const showcaseVideo = document.getElementById("showcase-video");
const showcaseTitle = document.getElementById("showcase-title");
const showcaseCategory = document.getElementById("showcase-category");
const showcaseDescription = document.getElementById("showcase-description");
const showcaseTags = document.getElementById("showcase-tags");
const showcaseCurrent = document.getElementById("showcase-current");
const showcaseTotal = document.getElementById("showcase-total");

const previousButton = document.getElementById("previous-project");
const nextButton = document.getElementById("next-project");

let currentProject = 0;
let showcaseTimer = null;


function updateShowcase() {

    const project = showcaseProjects[currentProject];

    showcaseVideo.src = project.video;
    showcaseVideo.load();

    showcaseVideo.play().catch(() => {});

    showcaseCategory.textContent = project.category;
    showcaseTitle.textContent = project.title;
    showcaseDescription.textContent = project.description;

    showcaseTags.innerHTML = "";

    project.tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        showcaseTags.appendChild(span);
    });

    showcaseCurrent.textContent =
        String(currentProject + 1).padStart(2, "0");

    showcaseTotal.textContent =
        String(showcaseProjects.length).padStart(2, "0");
}


function nextProject() {

    currentProject =
        (currentProject + 1) % showcaseProjects.length;

    updateShowcase();
}


function previousProject() {

    currentProject =
        (currentProject - 1 + showcaseProjects.length) %
        showcaseProjects.length;

    updateShowcase();
}


function startShowcaseTimer() {

    clearInterval(showcaseTimer);

    showcaseTimer = setInterval(() => {
        nextProject();
    }, 6000);
}


previousButton.addEventListener("click", () => {
    previousProject();
    startShowcaseTimer();
});


nextButton.addEventListener("click", () => {
    nextProject();
    startShowcaseTimer();
});


showcaseVideo.addEventListener("ended", () => {
    nextProject();
});


showcaseVideo.addEventListener("mouseenter", () => {
    clearInterval(showcaseTimer);
});


showcaseVideo.addEventListener("mouseleave", () => {
    startShowcaseTimer();
});


document.querySelectorAll(".project-video video").forEach(video => {

    video.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});


function slide(sliderId, direction) {

    const slider = document.getElementById(sliderId);

    if (!slider) {
        return;
    }

    const amount = 390;

    slider.scrollBy({
        left: amount * direction,
        behavior: "smooth"
    });
}


document.querySelectorAll(".slider-buttons button").forEach(button => {

    button.addEventListener("click", () => {

        const sliderId = button.dataset.slider;
        const direction = Number(button.dataset.direction);

        slide(sliderId, direction);

    });

});


showcaseTotal.textContent =
    String(showcaseProjects.length).padStart(2, "0");

updateShowcase();
startShowcaseTimer();
