var hero = document.getElementById("hero");
var villain = document.getElementById("villain");

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(hero).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    hero.style.left = left - 10 + "px";
  }
  //460  =>  villain width - hero width
  else if (e.key == "ArrowRight" && left <= 460) {
    hero.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    var laser = document.createElement("div");
    laser.classList.add("lasers");
    villain.appendChild(laser);

    var movelaser = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var laserbound = laser.getBoundingClientRect();

          //Condition to check whether the rock/rock and the laser are at the same position..!
          //If so,then we have to destroy that rock

          if (
            laserbound.left >= rockbound.left &&
            laserbound.right <= rockbound.right &&
            laserbound.top <= rockbound.top &&
            laserbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock); //Just removing that particular rock;
            //Score
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var laserbottom = parseInt(
        window.getComputedStyle(laser).getPropertyValue("bottom")
      );

      //Stops the laser from moving outside the gamebox
      if (laserbottom >= 500) {
        clearInterval(movelaser);
      }

      laser.style.left = left + "px"; //laser should always be placed at the top of my rose..!
      laser.style.bottom = laserbottom + 3 + "px";
    });
  }
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  //Just getting the left of the rock to place it in random position...
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => villain width - rock width
  rock.style.left = Math.floor(Math.random() * 450) + "px";

  villain.appendChild(rock);
}, 1000);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      var rock = rocks[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => villainheight - rockheight + 25
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);