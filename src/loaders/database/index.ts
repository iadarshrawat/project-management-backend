import mongoose from 'mongoose';
const mongooseIntl = require('mongoose-intl');

mongoose.set('debug', true);
mongoose.plugin(mongooseIntl, {languages: ['en', 'hi'], defaultLanguage: 'en'});
const databaseLoader = async () => new Promise<any>((resolve, reject) => {
  console.log('Connecting to the database...', process.env.MONGO_URI);
  mongoose.connect(String(process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(db => {
      console.log('Database connection established');
      resolve(db);
    })
    .catch(reject);
});

export { databaseLoader };
