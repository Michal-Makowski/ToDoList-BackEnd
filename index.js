const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// --- List with task object (task and status) --- //
const taskList = [];
// --- Conection + Heroku port--- //
const port = process.env.PORT || 8888;
app.listen(port, () => {
	console.log("Server connected");
});

app.get("/", (req, res) => {
	res.send("Server connected");
});
// --- Add task from FrontEnd to taskList (new task) --- //
app.post("/task", (req, res) => {
	taskList.push(req.body);
	res.status(200).end();
});
// --- Get task from BackEnd to FrontEnd --- //
app.get("/task", (req, res) => {
	res.json({ taskList });
});
// --- Delete task from BackEnd (search task by task input) --- //
app.delete("/task/:task", (req, res) => {
	const task = req.params.task;
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].taskTodo === task) {
			taskList.splice(i, 1);
		}
	}
	res.status(200).end();
});
// --- Edit task input (search task by old task input) --- //
app.patch("/task", (req, res) => {
	const oldTask = req.body.oldTask;
	const newTask = req.body.newTask;
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].taskTodo === oldTask) {
			taskList[i].taskTodo = newTask;
		}
	}
	res.status(200).end();
});
// --- Edit task status (search task by task input) --- //
app.patch("/task/status", (req, res) => {
	const task = req.body;
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].taskTodo === task.task) {
			if (taskList[i].complete === false) {
				taskList[i].complete = true;
			} else {
				taskList[i].complete = false;
			}
		}
	}
	res.status(200).end();
});
