$(document).ready(function () {
    const buttonBreak = $("#break-label button");
    const buttonSession = $("#session-label button");
    const breakLength = $("#break-length");
    const sessionLength = $("#session-length");
    const timeDisplay = $("#time-left");
    const startStop = $("#start_stop");
    const reset = $("#reset");
  
    buttonBreak.click(onClickBreak);
    buttonSession.click(onClickSession);
  
    let timeSession = "25:00";
    let timeBreak = "05:00";
  
    function onClickBreak(e) {
      if (e.currentTarget.id === "break-decrement") {
        if (breakLength.text() >= 2 && breakLength.text() <= 60) {
          breakLength.text(breakLength.text() - "" - 1);
        }
      } else {
        if (breakLength.text() >= 1 && breakLength.text() <= 59) {
          breakLength.text(breakLength.text() - "" + 1);
        }
      }
      timeBreak =
        breakLength.text().length === 1
          ? "0" + breakLength.text() + ":00"
          : breakLength.text() + ":00";
    }
    function onClickSession(e) {
      if (e.currentTarget.id === "session-decrement") {
        if (sessionLength.text() >= 2 && sessionLength.text() <= 60) {
          sessionLength.text(sessionLength.text() - "" - 1);
        }
      } else {
        if (sessionLength.text() >= 1 && sessionLength.text() <= 59) {
          sessionLength.text(sessionLength.text() - "" + 1);
        }
      }
      timeSession =
        sessionLength.text().length === 1
          ? "0" + sessionLength.text() + ":00"
          : sessionLength.text() + ":00";
      timeDisplay.text(timeSession);
    }
  
    startStop.click(onClickStartStop);
    let clickCountStartStop = 0;
    let currentTime;
    function onClickStartStop(e) {
      if (e) {
        clickCountStartStop++;
      }
  
      if (clickCountStartStop % 2 !== 0) {
        if (timeSession !== "00:00") {
          currentTime = timeSession;
        } else if (timeSession === "00:00" && timeBreak !== "00:00") {
          currentTime = timeBreak;
          $("#timer-label h1").text("Break");
        } else if (timeSession === "00:00" && timeBreak === "00:00") {
          timeSession =
            sessionLength.text().length === 1
              ? "0" + sessionLength.text() + ":00"
              : sessionLength.text() + ":00";
          timeBreak =
            breakLength.text().length === 1
              ? "0" + breakLength.text() + ":00"
              : breakLength.text() + ":00";
          currentTime = timeSession;
          $("#timer-label h1").text("Session");
        }
        timeDisplay.text(currentTime);
        currentTime = subtractTime(currentTime.split(":"));
        setTimeout(onClickStartStop, 100);
      } else {
        clearInterval(onClickStartStop);
      }
    }
  
    function subtractTime(time) {
      if (time[1] > 0) {
        time[1] - 1 < 10 ? (time[1] = "0" + (time[1] - 1)) : (time[1] = time[1] - 1);
      } else if (time[0] > 0) {
        time[0] - 1 < 10 ? (time[0] = "0" + (time[0] - 1)) : (time[0] = time[0] - 1);
        time[1] = 59;
      }
      if (time[0] == 0 && time[1] <= 10) {
        timeDisplay.css("color", "rgb(168, 25, 0)");
      } else {
        timeDisplay.css("color", "rgb(24, 29, 26)");
      }
  
      if (time.join(":") === "00:00") {
        $("#beep")[0].volume = 1.0;
        $("#beep")[0].play();
        timeDisplay.text("00:00");
      }
  
      if (timeSession !== "00:00") {
        timeSession = time.join(":");
      } else if (timeSession === "00:00" && timeBreak !== "00:00") {
        timeBreak = time.join(":");
      }
      return time.join(":");
    }
  
    reset.click(onClickReset);
  
    function onClickReset() {
      $("#timer-label h1").text("Session");
      $("#beep")[0].pause();
      $("#beep")[0].currentTime = 0;
      breakLength.text("5");
      sessionLength.text("25");
      timeDisplay.text("25:00");
      timeBreak = "05:00";
      timeSession = "25:00";
      clickCountStartStop = 2;
    }
  });