# Snake

can be played at https://tgates.icp.xyz/snake.html

Creating Snake with my little brother on my week off
![Alt text](/readmeImages/image.png)

## What tools were used to make this

- javascript
- css
- html
- Aseprite (to make all the cool pngs 😊)

## How this game works

This game is powered by an html canvas and a game loop that uses [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to loop the process of updating then drawing state. Making use of setTimeout to set the desired speed of the loop and overall game.

## Things I did because I thought they were cool

Fade in/out the controls at the beginning
![](/readmeImages/pulsatingControls.gif)

Pulsate the snake on death, and decrease the opacity of the lose text to showcase what you accomplished in a run
![](/readmeImages/pulsatingSnake.gif)
Add a one move store for when you press two moves too fast before the game state can update and draw. _Thanks smash bros and darks souls for doing this, you are the realest_

Sounds for when you munch an apple

Allow for the entire field to be covered in apples with an apple count adjuster

Add a highscore counter!

## Things that didn't go well

- My website is hosted on the Internet Computer, a decentralized cloud alternative, and due to the cryptography at work, runs slower than when I developed locally. Sounds are delayed, images can be delayed as well.
- Randomized apples at the higher numbers (100+) have a bias towards the top. In a perfect world they would be truly randomly placed!
