const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();

const db = require("./app/models");
// const Role = db.role;
const dbConfig = require("./app/config/db.config");
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.use('/', (req, res) =>  {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/guilherme-de-oliveira.github.io/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/guilherme-de-oliveira.github.io/index.html'));
  }
});

db.mongoose.set("strictQuery", true);
db.mongoose
  .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PWD}@${dbConfig.HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  // function initial() {
  //   Role.estimatedDocumentCount((err, count) => {
  //     if (!err && count === 0) {
  //       new Role({
  //         name: "user"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'user' to roles collection");
  //       });
  
  //       new Role({
  //         name: "admin"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'admin' to roles collection");
  //       });
  //     }
  //   });
  // }