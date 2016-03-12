var level = 0; // level AKA number of button presses.
var seq = []; // array to hole button sequence
var sounds = true;
var gameMode = "off"; // can be "off", "input", or "playback". sBtn presses are only recorded when in "input" mode.
var strictMode = false; // if true, game starts over on incorrect press.
var inputNum = 0; // during input phase, check if this index in seq matches button press

function doRound() {
  // generate and play back seq

  if (level == 20) {
    // win
    console.log("You won! Congrats!");
    alert("You won! Congrats!");
    startGame();
  } else {

    // inc level and display
    level++;
    $('#levelCount').text(level);

    // add a random button id to seq
    seq.push("#sBtn" + Math.floor(Math.random() * 3));

    console.log(seq);
    playback();
  }

}

function playback() {
  // play seq

  var i = 0;

  function PlaySeq() {
    pressButton(seq[i]);
    i++;
    if (i == seq.length) {
      clearInterval(seqInterval);
      gameMode = "input";
      inputNum = 0;
    }
  }

  var seqInterval = setInterval(PlaySeq, 750);
}

function checkInput(btnID) {
  if (seq[inputNum] == btnID) {
    // correct press
    console.log("Correct button press");
    inputNum++;
    if (inputNum == level) {
      console.log("Last press");
      inputNum = 0;
      doRound();
    }
  } else if (seq[inputNum] != btnID) {
    // incorrect press
    console.log("Incorrect button press");
    if (strictMode) {
      console.log("Incorrect press in strict mode. Starting over from beginning...");
      alert("Incorrect press in strict mode. Starting over from beginning...");
      startGame();
    } else {
      alert("Incorrect button press. Starting round over.");
      playback();
    }
  }
}

function startGame() {
  seq = [];
  level = 0;
  $('#levelCount').text(level);
  doRound();
}

function pressButton(buttonID) {
  if (buttonID) {
    if (sounds) {
      $(buttonID + "Sound")[0].play();
    }

    // TODO maybe use jquery color to animate this?

    $(buttonID).addClass("selected");
    setTimeout(function () {
      $(buttonID).removeClass("selected");
    }, 250);
  }
}


$(function () {

  $(".sBtn").click(function (event) {
    if (gameMode == "input") {
      var thisID = "#" + this.id;
      console.log("Pressed " + thisID);
      pressButton(thisID);
      checkInput(thisID);
    }
  });

  $("#pwrBtn").click(function (event) {
    if (gameMode == "input" || gameMode == "playback") {
      gameMode = "off";
      $("#pwrBtn").removeClass("ctrlOn");
      $("#pwrBtn").addClass("ctrlOff");
    } else {
      gameMode = "playback";
      startGame();
      $("#pwrBtn").removeClass("ctrlOff");
      $("#pwrBtn").addClass("ctrlOn");
    }
  });

  $('#strictToggle').click(function (event) {
    if (strictMode) {
      strictMode = false;
      $('#strictToggle').removeClass("ctrlOn");
      $('#strictToggle').addClass("ctrlOff");
    } else {
      strictMode = true;
      $('#strictToggle').removeClass("ctrlOff");
      $('#strictToggle').addClass("ctrlOn");
    }
  });

  $('#soundToggle').click(function (event) {
    if (sounds) {
      sounds = false;
      $('#soundToggle').removeClass("ctrlOn");
      $('#soundToggle').addClass("ctrlOff");
    } else {
      sounds = true;
      $('#soundToggle').removeClass("ctrlOff");
      $('#soundToggle').addClass("ctrlOn");
    }
  });

});