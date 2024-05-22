const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is required."],
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required."],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      text: true,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      text: true,
    },
    picture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fhu%2Fsearch%2Fimages%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw3Dk8Ak93Sp-WViZMJm4sDE&ust=1665429853709000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDL1Ofv0_oCFQAAAAAdAAAAABAE",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {},
    following: {},
    requests: {},
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      nickname: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      bio: {
        type: String,
      },
      college: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a Relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
