function VideoObject(title, uploader, seconds) {
    this.title = title;
    this.uploader = uploader;
    this.seconds = seconds;
    this.watch = function() {
      console.log("You watched all " + seconds + " seconds of " + uploader + "'s " + title + ".");
    };
}

var blackadder = new VideoObject("Blackadder", "BBC", 192);
blackadder.watch();

var turbulence = new VideoObject("Turbulence", "Key & Peele", 214);
turbulence.watch();