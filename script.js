/* =========================================================
   PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PROJECT DATA
    ===================================================== */

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
            category: "COLLABORATIVE PROJECT",
            title: "SkyFire-Uprise",
            description:
                "UE5.4 third-person space shooter. Developed the complete controllable character and 3C system.",
            tags: ["UE5.4", "C++", "3C", "Gameplay"],
            video: "Video/SkyFire.mp4"
        },

        {
            category: "RESEARCH PROJECT",
            title: "LLM-Driven Dynamic Difficulty",
            description:
                "UE5 tower defense project using LLM-driven player threat modeling for dynamic difficulty adjustment.",
            tags: ["UE5", "LLM", "DDA", "AI"],
            video: "Video/Game.mp4"
        },

        {
            category: "PERSONAL PROJECT",
            title: "ACG",
            description:
                "Unreal Engine game project exploring gameplay systems, enemy AI and multiplayer architecture.",
            tags: ["UE5", "C++", "AI", "Multiplayer"],
            video: "Video/ACG.mp4"
        }

    ];


    /* =====================================================
       HERO SHOWCASE
    ===================================================== */

    let currentProject = 0;
    let showcaseTimer = null;


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


    /* =====================================================
       UPDATE HERO
    ===================================================== */

    function updateShowcase() {

        if (!showcaseVideo) {
            return;
        }

        const project =
            showcaseProjects[currentProject];

        if (!project) {
            return;
        }


        /* Text */

        if (showcaseCategory) {
            showcaseCategory.textContent =
                project.category;
        }

        if (showcaseTitle) {
            showcaseTitle.textContent =
                project.title;
        }

        if (showcaseDescription) {
            showcaseDescription.textContent =
                project.description;
        }


        /* Tags */

        if (showcaseTags) {

            showcaseTags.innerHTML = "";

            project.tags.forEach(tag => {

                const span =
                    document.createElement("span");

                span.textContent = tag;

                showcaseTags.appendChild(span);

            });

        }


        /* Counter */

        if (showcaseCurrent) {

            showcaseCurrent.textContent =
                String(currentProject + 1)
                    .padStart(2, "0");

        }

        if (showcaseTotal) {

            showcaseTotal.textContent =
                String(showcaseProjects.length)
                    .padStart(2, "0");

        }


        /* Video */

        showcaseVideo.pause();

        showcaseVideo.src =
            project.video;

        showcaseVideo.load();

        showcaseVideo.play().catch(() => {});

    }


    /* =====================================================
       NEXT / PREVIOUS
    ===================================================== */

    function nextProject() {

        currentProject =
            (currentProject + 1) %
            showcaseProjects.length;

        updateShowcase();

        restartShowcaseTimer();

    }


    function previousProject() {

        currentProject =
            (currentProject - 1 +
                showcaseProjects.length) %
            showcaseProjects.length;

        updateShowcase();

        restartShowcaseTimer();

    }


    /* =====================================================
       HERO BUTTONS
    ===================================================== */

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


    /* =====================================================
       HERO AUTO PLAY
    ===================================================== */

    function startShowcaseTimer() {

        clearInterval(showcaseTimer);

        showcaseTimer =
            setInterval(() => {

                nextProject();

            }, 6000);

    }


    function restartShowcaseTimer() {

        clearInterval(showcaseTimer);

        startShowcaseTimer();

    }


    /* =====================================================
       PAUSE HERO WHEN MOUSE IS OVER IT
    ===================================================== */

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

                startShowcaseTimer();

            }
        );

    }


    /* =====================================================
       PROJECT CARD VIDEOS
    ===================================================== */

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


        /* ---------------------------------------------
           Hover preview
        --------------------------------------------- */

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


        /* ---------------------------------------------
           Click → open modal
        --------------------------------------------- */

        container.addEventListener(
            "click",
            () => {

                const videoSource =
                    video.currentSrc ||
                    video.getAttribute("src");

                if (videoSource) {

                    openVideoModal(
                        videoSource
                    );

                }

            }
        );

    });


    /* =====================================================
       VIDEO MODAL
    ===================================================== */

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


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openVideoModal(videoSource) {

        if (
            !videoModal ||
            !videoModalPlayer
        ) {

            console.error(
                "Video modal elements not found."
            );

            return;

        }


        /* Set source */

        videoModalPlayer.src =
            videoSource;


        /* Show modal */

        videoModal.classList.add(
            "active"
        );


        /* Disable page scrolling */

        document.body.style.overflow =
            "hidden";


        /* Start video */

        videoModalPlayer.load();

        const playPromise =
            videoModalPlayer.play();


        if (playPromise !== undefined) {

            playPromise.catch(() => {

                /*
                   Browser may block autoplay.
                   Controls are still available.
                */

            });

        }

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeVideoModal() {

        if (
            !videoModal ||
            !videoModalPlayer
        ) {

            return;

        }


        /* Hide */

        videoModal.classList.remove(
            "active"
        );


        /* Stop video */

        videoModalPlayer.pause();

        videoModalPlayer.removeAttribute(
            "src"
        );

        videoModalPlayer.load();


        /* Restore page scrolling */

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       MODAL CLOSE BUTTON
    ===================================================== */

    if (videoModalClose) {

        videoModalClose.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeVideoModal();

            }
        );

    }


    /* =====================================================
       CLICK BACKGROUND TO CLOSE
    ===================================================== */

    if (videoModalBackdrop) {

        videoModalBackdrop.addEventListener(
            "click",
            () => {

                closeVideoModal();

            }
        );

    }


    /* =====================================================
       ESC TO CLOSE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                videoModal &&
                videoModal.classList.contains(
                    "active"
                )
            ) {

                closeVideoModal();

            }

        }
    );


    /* =====================================================
       SLIDER
    ===================================================== */

    window.slide =
        function(sliderId, direction) {

            const slider =
                document.getElementById(
                    sliderId
                );

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

        };


    /* =====================================================
       SLIDER BUTTONS
       
       Supports:
       data-slider="course-slider"
       data-direction="1"
    ===================================================== */

    const sliderButtons =
        document.querySelectorAll(
            ".slider-buttons button"
        );


    sliderButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const sliderId =
                    button.dataset.slider;

                const direction =
                    Number(
                        button.dataset.direction
                    );


                if (
                    sliderId &&
                    !Number.isNaN(direction)
                ) {

                    window.slide(
                        sliderId,
                        direction
                    );

                }

            }
        );

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateShowcase();

    startShowcaseTimer();

});
