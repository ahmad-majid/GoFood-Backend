import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log("connected");
  const fetched_data = mongoose.connection.db.collection("food_items");
  const data = await fetched_data.find({}).toArray();

  const foodCategory = await mongoose.connection.db.collection("foodCategory");
  const catData = await foodCategory.find({}).toArray();
  global.food_items = data;
  global.foodCategory = catData;
};

export default connect;
