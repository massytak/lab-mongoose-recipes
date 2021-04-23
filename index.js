const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function (self) {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async function (ret) {
    // let doc = await Recipe.create(data[0]);
    // console.log(doc.title);
    let docs = await Recipe.insertMany(data, { bypassDocumentValidation: false });
    docs.forEach((doc) => console.log(doc.title));
    let docUpdate = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(
      `Success document with _id: ${docUpdate._id} and title: ${docUpdate.title} have now duration set to ${docUpdate.duration}`
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Removing recipe with title 'Carrot Cake' !!! ");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
// .then(async (test) => {
//   // console.log(
//   //   // Run your code here, after you have insured that the connection was made
//   //   await Recipe.create(data[0]).then((ret) => {
//   //     console.log(ret.title);
//   //     return ret;
//   //   })
//   // );
//   // console.log(data.length);
//   // Toute les erreurs eventuel sont catcher par le catch en dessous
//   // let docsFromInsertMany =
//   console.log(
//     await Recipe.insertMany(data, {
//       bypassDocumentValidation: false,
//     })
//       .then((docs) => {
//         docs.forEach((doc) => console.log(doc.title));
//         return docs;
//       })
//       .catch((err) => console.log(err))
//   );
//   // docsFromInsertMany.forEach((doc) => console.log(doc.title));

// })
