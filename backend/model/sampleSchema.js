import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema(
  {
    comments: {
      type: [String],
    },
  },
  { timestamps: false }
);

const Sample = mongoose.model("Sample", sampleSchema);

export default Sample;
