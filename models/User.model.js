const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    gender: {
      type: String,
      enum: ["female", "male"],
      required: true,
    }, 
    dateOfBirth: Date,
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    country: String,
    city: String, 
    address: String,
    image: String,
    items: [{
      types: Schema.Types.ObjectId,
      ref: "Item",
    }],
    reviews:[{
      types: Schema.Types.ObjectId,
      ref: "Review",
  }],
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
