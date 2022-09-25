const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({

	title: { type: String, required: true },
	status: { type: Boolean, required: true,default:false },
	userId: { type: String, required: true }
},
	{
		versionKey: false
	})

const TodosModel = mongoose.model("note", noteSchema);

module.exports = TodosModel