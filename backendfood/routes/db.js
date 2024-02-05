const mongoose = require("mongoose");
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");

    const collection = mongoose.connection.db.collection("food");
    const fetcheddata = await collection.find({}).toArray();

    try {
      const foodCategoryCollection = await mongoose.connection.db.collection(
        "category"
      );
      const fetchedcategorydata = await foodCategoryCollection
        .find({})
        .toArray();
      global.food_items = fetcheddata;
      global.foodCategory = fetchedcategorydata;
    } catch (error) {
      console.error("connection error:", error.message);
    }
  } catch (error) {
    console.error("connection error:", error.message);
  }
};

module.exports = mongoDB;
