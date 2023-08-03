const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
// const dotenv = require('dotenv');
const auth = require('./middleware/auth');

// dotenv.config();

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const graphqlSchema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');


app.use(auth);

app.use('/graphql',graphqlHTTP({
  schema:graphqlSchema,
  rootValue:resolver,
  graphiql:true,
  formatError(err){
    if(!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An Error occurred';
    const code = err.originalError.code || 500 ;
    return {
      message : message,
      status : code,
      data : data,
    }
  }
}))
app.use(morgan('tiny'))
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const mongoUrl = process.env.MONGO_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect('mongodb://127.0.0.1:27017/graphQL', options)
  .then(() => console.log('DB connected'))
  .catch(() => console.log('DB connection failed'));

app.listen(8080, ()=>{
  console.log(`The server is running on port "${8080}"`);

});
