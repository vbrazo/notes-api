const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Notes API. Take notes quickly. Organize and keep track of all your notes."});
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

function listRoutes(routes, stack, parent){
  parent = parent || '';
  if(stack){
    stack.forEach(function(r){
      if (r.route && r.route.path){
        var method = '';

        for(method in r.route.methods){
          if(r.route.methods[method]){
            routes.push({method: method.toUpperCase(), path: parent + r.route.path});
          }
        }

      } else if (r.handle && r.handle.name == 'router') {
        const routerName = r.regexp.source.replace("^\\","").replace("\\/?(?=\\/|$)","");
        return listRoutes(routes, r.handle.stack, parent + routerName);
      }
    });
    return routes;
  } else {
    return listRoutes([], app._router.stack);
  }
}

const routes = listRoutes();

// listen for requests
const server = app.listen(80, function(){
    console.log("Server is listening on port 80");
});

module.exports = server;
