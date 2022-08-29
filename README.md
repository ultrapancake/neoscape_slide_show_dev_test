# neoscape_slide_show_dev_test
Front End Dev Test for Neoscape. Build a responsive slideshow from scratch.
# Design Decisions
I honestly did not put much thought into the design of this project, the majority of my time was spent on simply getting the functionality completed.
# Development Decisions
My first pass at the slide show was to add and remove style display none from the slide div that contains the image.  I also added some animation to the slides fading in and out.  This worked well for navigating through the slides using the arrows or navigation dots.  I realized that part of the dev test was to also add swiping functionality.
Swiping was very difficult for me to implement, I had to completely re-think my approach to the project.  I ended up using the style transform: translateX(0) to manipulate the slides and give the feeling of dragging the slide.  I also added a break point to snap to the next slide and re-used that snapping function to also navigate by the buttons and dots. 
# Future Improvement
I would like to improve the Design of this project and add some of the Bonus functionality.