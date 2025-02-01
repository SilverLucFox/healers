import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
}
 ,{ timestamps: true,});

const adminModel = mongoose.Model.admin || mongoose.model("admin", adminSchema);
export default adminModel;
