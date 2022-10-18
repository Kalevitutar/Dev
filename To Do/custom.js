var chomping = {
  description: "Chomp (aka shred) everything with my info on it",
  done: false,
  whenDone: function() {
    this.done = true;
  }
}

console.log(chomping);
chomping.whenDone();
console.log(chomping);