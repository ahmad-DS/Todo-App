const { Router } = require("express");
// const authorization  = require("../Middlewares/authorization");
const authenticate = require("../Middlewares/authentication")
const TodosModel = require("../Models/todos.model");

const notes = Router();

// Authentication middleware
notes.use(authenticate);

// Get all todos
notes.get("/", async (req, res) => {
	const { userId } = req.body;
	console.log("user id ::", userId)
	try {
		let allTodos = await TodosModel.find({ userId });
		console.log("all todos", allTodos)
		res.json({ data: allTodos })
	}
	catch (err) { res.status(404).send({ msg: "please login" }) }
})

// Get todos by quadrant
notes.get("/quadrant/:quadrant", async (req, res) => {
	const { userId } = req.body;
	const { quadrant } = req.params;
	
	let query = { userId };
	
	switch(quadrant) {
		case '1': // Urgent & Important
			query.isUrgent = true;
			query.isImportant = true;
			break;
		case '2': // Important but Not Urgent
			query.isUrgent = false;
			query.isImportant = true;
			break;
		case '3': // Urgent but Not Important
			query.isUrgent = true;
			query.isImportant = false;
			break;
		case '4': // Neither Urgent nor Important
			query.isUrgent = false;
			query.isImportant = false;
			break;
		default:
			return res.status(400).json({ msg: "Invalid quadrant" });
	}

	try {
		const todos = await TodosModel.find(query);
		res.json({ data: todos });
	} catch (err) {
		res.status(500).json({ msg: "Error fetching todos" });
	}
});

const validate = (req, res, next) => {
	const { title } = req.body;
	if (title) {
		next()
	} else res.json({ msg: "title is required" })
}

notes.post("/create", validate, async (req, res) => {
	const new_note = new TodosModel(req.body);
	console.log("new Note-->", new_note)
	await new_note.save()

	res.send({msg:"new todo added successfully"})
})

notes.patch("/:todoId", async (req, res) => {
	// console.log('params: ', req.params, ' query: ', req.query, ' body: ', req.body);
	const todoId = req.params.todoId;
	const { userId } = req.body;

	// let allNotes=await NoteModel.find();
	await TodosModel.updateOne({ _id: todoId, userId }, { $set: req.body })
	res.send({ msg: `todo with id ${todoId} has been updated` })
})

notes.delete("/:todoId", async (req, res) => {
	const todoId = req.params.todoId;
	const { userId } = req.body;

	// let allNotes=await NoteModel.find();
	await TodosModel.deleteOne({ _id: todoId, userId })
	res.send({msg:`the note of UserId ${userId} and note with ID ${todoId} has been deleted`})
})

module.exports = notes