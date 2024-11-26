# Interval Todo.
This Google Apps Script connects to your selected Google Tasks list and reopens specified tasks after a given interval. You can activate this behaviour for each individual task by simply adding a short suffix to it:

- `Water plants ~2d` will be reopened two days after you last completed it.
- `Call mom ~1w` will be reopened one week (1*7 days) after you last completed it.
- `Clean garage ~2m` will be reopened two months (2*30 days) after you last completed it.

Given that the task name is all you need to parametrize each task behaviour, you can continue to use any task manager that works with Google Tasks (task managers embedded in Google websites, official app, widget, and third-party solutions). 

## Setting up the script

- Head to https://script.google.com/
- Create a new project using a button on the top left. You can (and probably should) rename it.
- Put the script code into the `Code.gs` file that has been automatically created for you.
- In the toolbar on the left, add a new Service. Select "Google Tasks API" and leave its default "Tasks" identifier.
- You can test the script. In order to do so, open your favorite Google Tasks manager, add a new task such called "Test ~0d" and mark it as complete. Run the script manually using Run button on the Google Apps Script interface. You will need to validate the access to the Tasks service on your account, accept it in the pop-up window. After that, your task should be reopened in which case everything works as intended. You can delete this test task.
- In the toolbar on the left, set up a new Trigger. Create a new Trigger that is Time-based and runs the script Daily early in the morning (typically between midnight and 1 a.m.).
- Everything is now set up, congrats! 

## Using the script
