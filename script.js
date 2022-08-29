let index = 1;
showSlides(index);
// arrow functions
function moveSlide(e){
    showSlides(index += e);
}
// dot function
function currentSlide(e){
    showSlides(index = e);
}
//manipulate slide
function showSlides(e){
    //get front-end elements
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    //if next @ end of slide loop to begining
    if(e > slides.length){index = 1}
    //if prev @ start loop to end
    if(e < 1){index = slides.length}
    //clear slides
    for (let i = 0; i < slides.length; i++){
        slides[i].style.display = "none"
    }
    //clear dots
    for(let i = 0; i < dots.length; i++){
        dots[i].classList.remove("active");
    }
    //set slide
    slides[index-1].style.display = "block";
    //set dot
    dots[index-1].classList.add("active");
}