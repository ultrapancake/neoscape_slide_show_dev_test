const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide')),
  dots = Array.from(document.querySelectorAll('.dot'))

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

// add our event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());
  // touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
  // mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mousemove', touchMove);
  slide.addEventListener('mouseleave', touchEnd);
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex);

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

showSlides(0);

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
  setDots();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function moveSlide(e){
    showSlides(currentIndex += e);
}

function currentSlide(e){
    showSlides(currentIndex = e);
}

function showSlides(e){
    //if next @ end of slide loop to begining
    if(e > slides.length - 1){currentIndex = 0}
    //if prev @ start loop to end
    if(e < 0){currentIndex = slides.length - 1}
    setPositionByIndex();
    setDots();
}

function setDots(){
    //clear dots
    for(let i = 0; i < dots.length; i++){
        dots[i].classList.remove("active");
    }
    //set dot
    dots[currentIndex].classList.add("active");
}