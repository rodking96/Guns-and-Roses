// We'll use these variables to track the counts of each player
let gb = 0      // Soccer Ball
let cc = 0      // Beer
let apple = 0   // Apple

// Event listener for clicks on the "+" button for Ginger Bread cookies
document.getElementById('add-gb').addEventListener('click', function () {
    gb += 1;
    document.getElementById('qty-gb').textContent = gb;
    document.getElementById('qty-total').textContent = (gb + cc + apple);
})

document.getElementById('minus-gb').addEventListener('click', function () {
    if (gb >= 1) {
        gb -= 1;
        document.getElementById('qty-gb').textContent = gb;
        document.getElementById('qty-total').textContent = (gb + cc + apple);
    }
})

document.getElementById('add-cc').addEventListener('click', function () {
    cc += 1;
    document.getElementById('qty-cc').textContent = cc;
    document.getElementById('qty-total').textContent = (gb + cc + apple);
})

document.getElementById('minus-cc').addEventListener('click', function () {
    if (cc >= 1) {
        cc -= 1;
        document.getElementById('qty-cc').textContent = cc;
        document.getElementById('qty-total').textContent = (gb + cc + apple);
    }
})

document.getElementById('add-apple').addEventListener('click', function () {
  apple += 1;
    document.getElementById('qty-apple').textContent = apple;
    document.getElementById('qty-total').textContent = (gb + cc + apple);
})

document.getElementById('minus-apple').addEventListener('click', function () {
    if (apple >= 1) {
      apple -= 1;
        document.getElementById('qty-apple').textContent = apple;
        document.getElementById('qty-total').textContent = (gb + cc + apple);
    }
})


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
      var roses = document.getElementsByClassName("roses");

      for (var i = 0; i < roses.length; i++) {
        var rose = roses[i];
        if (rose != undefined) {
          var rosebound = rose.getBoundingClientRect();
          var laserbound = laser.getBoundingClientRect();

          //Check whether the rose and the laser are at the same position
          //If so,destroy the roses

          if (
            laserbound.left >= rosebound.left &&
            laserbound.right <= rosebound.right &&
            laserbound.top <= rosebound.top &&
            laserbound.bottom <= rosebound.bottom
          ) {
            rose.parentElement.removeChild(rose); //Just removing that particular rose;
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

      laser.style.left = left + "px"; //laser should always be placed at the top of my gun
      laser.style.bottom = laserbottom + 3 + "px";
    });
  }
});

var generateroses = setInterval(() => {
  var rose = document.createElement("div");
  rose.classList.add("roses");
  //Just getting the left of the rose to place it in random position
  var roseleft = parseInt(
    window.getComputedStyle(rose).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => villain width - rose width
  rose.style.left = Math.floor(Math.random() * 450) + "px";

  villain.appendChild(rose);
}, 2100);

var moveroses = setInterval(() => {
  var roses = document.getElementsByClassName("roses");

  if (roses != undefined) {
    for (var i = 0; i < roses.length; i++) {
      //Now I have to increase the top of each rose,so that the roses can move downwards
      var rose = roses[i]; //getting each rose
      var rosetop = parseInt(
        window.getComputedStyle(rose).getPropertyValue("top")
      );
      //475 => villainheight - roseheight + 25
      if (rosetop >= 475) {
        alert("Game Over");
        clearInterval(moveroses);
        window.location.reload();
      }

      rose.style.top = rosetop + 25 + "px";
    }
  }
}, 450);
