import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/simple_product_api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as any);
    console.log('MongoDB Connected');
  } catch (error:any) { // Remove any type annotation for error
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
