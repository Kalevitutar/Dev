function Tasks(description) {
  this.description = description;
  this.done = false;
  this.isDone = function() {
    this.done = true;
  }
}

var newTask = new Tasks("clean sink");
newTask.isDone();