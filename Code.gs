function IntervalTodo() {

  taskLists = Tasks.Tasklists.list().items
  listIds = []
  for  (var i=0; i<taskLists.length; i++) {
    // Logger.log("Title: " + taskLists[i].title + "\nid: " + taskLists[i].id)
    listIds.push(taskLists[i].id)
  }

  // Uncomment the following if you want to specify your list ids manually
  // listIds = ["yourListId", "yourAnotherListId"]

  function computeDelayFromTitle(task) {
    // Regular expression to match the task "~[number][letter]"
    const regex = /~(\d+)([dwm])/;
    const match = task.match(regex);
    
    if (match) {
      // Extract the number and the letter from the match
      const number = parseInt(match[1]);
      const unit = match[2];
      
      // Determine the total number of days based on the unit
      switch (unit) {
        case 'd':
          return number; // If it's in days, return the number directly
        case 'w':
          return number * 7; // If it's in weeks, multiply by 7
        case 'm':
          return number * 30; // If it's in months, multiply by 30
        default:
          return null; // If no match, return 0
      }
    } else {
      // If the pattern does not match, return 0
      return null;
    }
  }

  for (var j=0; j<listIds.length; j++) {
    const today = new Date();
    var tasks = Tasks.Tasks.list(
      listIds[j],
      {
        "resultsMax": 100,
        "showHidden": true
      }
    ).items

    for (var i=0; i<tasks.length; i++) {
      if (tasks[i].status === "completed") {
        var completionDate = new Date(tasks[i].completed)
      
        // Try to find a ~[number][letter] valid pattern
        var delayValue = computeDelayFromTitle(tasks[i].title)
        
        // If valid delay pattern has been detected...
        if (delayValue !== null) {

          // ...compute a date at which the task should be reopened...
          var reopeningDate = new Date(completionDate);
          reopeningDate.setDate(completionDate.getDate() + delayValue);
          
          // ...and reopen the task if it's due today 
          if (reopeningDate.toDateString() === today.toDateString()) {
            var resource = {
              status: "needsAction",
              completed: null,
              // Uncomment the following line to add a due date:
              // due: Utilities.formatDate(targetDate, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'"),
            };
            Tasks.Tasks.patch(resource, listIds[j], tasks[i].id)
          }
        }
      }
    }
  }
}
