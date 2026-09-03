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
