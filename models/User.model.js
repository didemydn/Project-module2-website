const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    country: String,
    city: String, 
    address: String,
    image: String,
  },
   
   {timestamps: true}
    
);

const User = model("User", userSchema);

module.exports = User;
