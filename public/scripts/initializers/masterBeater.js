(function(exports){

  var lookahead = 25.0;
  initializeMasterBeater = function(){
    masterBeater.onmessage = function(e) {
      if (e.data == "tick") {
        scheduler.schedule();
      } else {
        console.log("Message: " + e.data);
      };
    };

    masterBeater.postMessage({"interval":lookahead})
    masterBeater.postMessage("start");
  }

  function toggleMasterBeaterState() {
    scheduler.isPlaying = !scheduler.isPlaying;

    if (scheduler.isPlaying) {
      scheduler.nextBeatNumber = 0;
      scheduler.nextBeatTime = audioContext.currentTime;
      masterBeater.postMessage("start");
    } else {
      masterBeater.postMessage('stop');
    }
  }
  exports.toggleMasterBeaterState = toggleMasterBeaterState;
  exports.initializeMasterBeater = initializeMasterBeater;
})(this)
