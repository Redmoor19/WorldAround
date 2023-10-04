import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  avatarUrl?: string;
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
