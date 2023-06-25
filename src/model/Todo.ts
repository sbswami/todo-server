import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["todo", "done"],
  },
  creationDate: {
    type: Date,
    required: true,
  },
  doneDate: {
    type: Date,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;