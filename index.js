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
      var guns = document.getElementsByClassName("guns");

      for (var i = 0; i < guns.length; i++) {
        var gun = guns[i];
        if (gun != undefined) {
          var gunbound = gun.getBoundingClientRect();
          var laserbound = laser.getBoundingClientRect();

          //Condition to check whether the gun and the laser are at the same position..!
          //If so,then we have to destroy that gun

          if (
            laserbound.left >= gunbound.left &&
            laserbound.right <= gunbound.right &&
            laserbound.top <= gunbound.top &&
            laserbound.bottom <= gunbound.bottom
          ) {
            gun.parentElement.removeChild(gun); //Just removing that particular gun;
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

var generateguns = setInterval(() => {
  var gun = document.createElement("div");
  gun.classList.add("guns");
  //Just getting the left of the gun to place it in random position...
  var gunleft = parseInt(
    window.getComputedStyle(gun).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => villain width - gun width
  gun.style.left = Math.floor(Math.random() * 450) + "px";

  villain.appendChild(gun);
}, 1000);

var moveguns = setInterval(() => {
  var guns = document.getElementsByClassName("guns");

  if (guns != undefined) {
    for (var i = 0; i < guns.length; i++) {
      //Now I have to increase the top of each gun,so that the guns can move downwards..
      var gun = guns[i]; //getting each gun
      var guntop = parseInt(
        window.getComputedStyle(gun).getPropertyValue("top")
      );
      //475 => villainheight - gunheight + 25
      if (guntop >= 475) {
        alert("Game Over");
        clearInterval(moveguns);
        window.location.reload();
      }

      gun.style.top = guntop + 25 + "px";
    }
  }
}, 450);