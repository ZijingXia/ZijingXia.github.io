/* =========================================================
   PROJECT SHOWCASE
========================================================= */

const showcaseProjects = [

    {
        category: "COURSE PROJECT",
        title: "8-bit Game",
        description:
            "8-bit game developed with the teaching Game Engine, covering fundamental game development and gameplay systems.",
        tags: ["C++", "Game Engine", "Gameplay"],
        video: "Video/GEA.mp4"
    },

    {
        category: "COURSE PROJECT",
        title: "3D Game",
        description:
            "3D game developed using C++ rendering techniques and the teaching Game Engine.",
        tags: ["C++", "3D", "Rendering"],
        video: "Video/GEDD.mp4"
    },

    {
        category: "COURSE PROJECT",
        title: "ChatRoom",
        description:
            "Online chat system implementing client-server communication and real-time interaction.",
        tags: ["C++", "Networking", "Client / Server"],
        video: "Video/chatroom.mp4"
    },

    {
        category: "COURSE PROJECT",
        title: "Rasterizer",
        description:
            "Software rasterization project exploring graphics pipelines and rendering fundamentals.",
        tags: ["C++", "Graphics", "Rasterization"],
        video: "Video/Raster.mp4"
    },

    {
        category: "GAME PROJECT",
        title: "SkyFire-Uprise",
        description:
            "Unreal Engine multiplayer shooter project focusing on player control, 3C systems and gameplay architecture.",
        tags: ["UE5", "C++", "Gameplay", "Multiplayer"],
        video: "Video/SkyFire.mp4"
    },

    {
        category: "RESEARCH PROJECT",
        title: "LLM-Driven Dynamic Difficulty",
        description:
            "Research project exploring LLM-driven player modeling and dynamic difficulty adjustment in games.",
        tags: ["UE5", "LLM", "AI", "DDA"],
        video: "Video/Game.mp4"
    },

    {
        category: "COURSE PROJECT",
        title: "ACG",
        description:
            "Unreal Engine game project exploring gameplay systems, enemy AI and multiplayer architecture.",
        tags: ["UE5", "C++", "Gameplay"],
        video: "Video/ACG.mp4"
    }

];


/* =========================================================
   HERO SHOWCASE
========================================================= */

let currentProject = 0;

const showcaseVideo =
    document.getElementById("showcase-video");

const showcaseCategory =
    document.getElementById("showcase-category");

const showcaseTitle =
    document.getElementById("showcase-title");

const showcaseDescription =
    document.getElementById("showcase-description");

const showcaseTags =
    document.getElementById("showcase-tags");

const showcaseCurrent =
    document.getElementById("showcase-current");

const showcaseTotal =
    document.getElementById("showcase-total");

const previousButton =
    document.getElementById("previous-project");

const nextButton =
    document.getElementById("next-project");


let showcaseTimer;


/* Update hero project */

function updateShowcase() {

    const project =
        showcaseProjects[currentProject];

    if (!project) {
        return;
    }


    showcaseCategory.textContent =
        project.category;

    showcaseTitle.textContent =
        project.title;

    showcaseDescription.textContent =
        project.description;


    showcaseTags.innerHTML = "";

    project.tags.forEach(tag => {

        const span =
            document.createElement("span");

        span.textContent = tag;

        showcaseTags.appendChild(span);

    });


    showcaseCurrent.textContent =
        String(currentProject + 1).padStart(2, "0");

    showcaseTotal.textContent =
        String(showcaseProjects.length).padStart(2, "0");


    showcaseVideo.src =
        project.video;

    showcaseVideo.load();

    showcaseVideo.play().catch(() => {});

}


/* Next */

function nextProject() {

    currentProject =
        (currentProject + 1) %
        showcaseProjects.length;

    updateShowcase();

    restartShowcaseTimer();

}


/* Previous */

function previousProject() {

    currentProject =
        (currentProject - 1 +
            showcaseProjects.length) %
        showcaseProjects.length;

    updateShowcase();

    restartShowcaseTimer();

}


/* Buttons */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextProject
    );

}

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousProject
    );

}


/* Automatically switch */

function startShowcaseTimer() {

    showcaseTimer =
        setInterval(() => {

            nextProject();

        }, 6000);

}


function restartShowcaseTimer() {

    clearInterval(showcaseTimer);

    startShowcaseTimer();

}


/* Pause when mouse is over hero */

const showcase =
    document.querySelector(".showcase");

if (showcase) {

    showcase.addEventListener(
        "mouseenter",
        () => {

            clearInterval(showcaseTimer);

        }
    );


    showcase.addEventListener(
        "mouseleave",
        () => {

            restartShowcaseTimer();

        }
    );

}


/* =========================================================
   COURSE / GAME CARD VIDEOS
========================================================= */

const projectVideos =
    document.querySelectorAll(
        ".project-card video"
    );


projectVideos.forEach(video => {

    const container =
        video.closest(".project-video");


    if (!container) {
        return;
    }


    /* Hover preview */

    container.addEventListener(
        "mouseenter",
        () => {

            video.play().catch(() => {});

        }
    );


    container.addEventListener(
        "mouseleave",
        () => {

            video.pause();

        }
    );


    /* =====================================================
       OPEN VIDEO MODAL
    ===================================================== */

    container.addEventListener(
        "click",
        () => {

            openVideoModal(
                video.currentSrc ||
                video.src
            );

        }
    );

});


/* =========================================================
   VIDEO MODAL
========================================================= */

const videoModal =
    document.getElementById("video-modal");

const videoModalPlayer =
    document.getElementById(
        "video-modal-player"
    );

const videoModalClose =
    document.getElementById(
        "video-modal-close"
    );

const videoModalBackdrop =
    document.querySelector(
        ".video-modal-backdrop"
    );


/* Open */

function openVideoModal(videoSource) {

    if (!videoModal || !videoModalPlayer) {
        return;
    }


    videoModalPlayer.src =
        videoSource;

    videoModal.classList.add("active");


    /*
       Prevent the page behind the modal
       from scrolling.
    */

    document.body.style.overflow =
        "hidden";


    videoModalPlayer.load();

    videoModalPlayer.play().catch(() => {});

}


/* Close */

function closeVideoModal() {

    if (!videoModal || !videoModalPlayer) {
        return;
    }


    videoModal.classList.remove("active");


    videoModalPlayer.pause();

    videoModalPlayer.removeAttribute("src");

    videoModalPlayer.load();


    document.body.style.overflow =
        "";

}


/* Close button */

if (videoModalClose) {

    videoModalClose.addEventListener(
        "click",
        closeVideoModal
    );

}


/* Click background */

if (videoModalBackdrop) {

    videoModalBackdrop.addEventListener(
        "click",
        closeVideoModal
    );

}


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            videoModal &&
            videoModal.classList.contains("active")
        ) {

            closeVideoModal();

        }

    }
);


/* =========================================================
   SLIDER
========================================================= */

function slide(sliderId, direction) {

    const slider =
        document.getElementById(sliderId);

    if (!slider) {
        return;
    }


    const amount = 390;


    slider.scrollBy({

        left:
            amount * direction,

        behavior:
            "smooth"

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

if (showcaseVideo) {

    updateShowcase();

    startShowcaseTimer();

}
