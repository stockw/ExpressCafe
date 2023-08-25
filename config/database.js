const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI
// , {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });
// let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@practice.eepjlaq.mongodb.net/Cafe?retryWrites=true&w=majority`;

let connectionString = process.env.MONGO_URI
//by default mongoose has a strictQuery that is set to true (meaning we cant ask for info that is not in our schema)
// https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

//
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

