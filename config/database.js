import mongoose from 'mongoose';
let connected = false;

//all mongoose methods are async
const connectDB = async () => {
  mongoose.set('strictQuery', true); //ensures that only fields specified in our schema will be saved to the database
  //if the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected');
    return;
  }

  //connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
