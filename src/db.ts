import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://admin:admin_password@localhost:27017/admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as any);
    console.log('MongoDB Connected');
  } catch (error:any) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
