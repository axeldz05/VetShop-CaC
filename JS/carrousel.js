



const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list")
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button")
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar")
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    //hanadle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        //Actualiza la posicion del thum on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;


            const boundPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundPosition / maxThumbPosition) * maxScrollLeft;


            scrollbarThumb.style.left = `${boundPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        // Remove evente listener on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }


        //Agrega un evento de escucho para la interaccion "drag"
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    });

/*ESTO ES PARA LOS BOTONOES*/
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    })

    const handleSlideButtons =  () => {
        slideButtons[0].style.display =  imageList.scrollLeft <= 0 ? "none" : "block"
        slideButtons[1].style.display =  imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    // uptade crollbar thumb psiiton based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth)
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })

}

window.addEventListener("load", initSlider);