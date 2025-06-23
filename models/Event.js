const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    banner: {
      type: String,
    },
    userEmail: String,
    userId: Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", schema);

module.exports = Event;
