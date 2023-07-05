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
    country: {
      type: String,
      required: true},
    city: {
      type: String,
      required: true}, 
    address: {
      type: String,
      required: true},
    image: String,
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item',
    }],
    reviews: [{
      // type: Schema.Types.ObjectId,
      // ref: 'Review',
      reviewer: String,
      content: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },

  { timestamps: true }

);

const User = model("User", userSchema);

module.exports = User;