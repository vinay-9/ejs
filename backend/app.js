var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


const mongoose=require('mongoose');
const userRoutes=require('./routes/users');
var app = express();

mongoose
  .connect(
    "mongodb+srv://vinay:" +
    "HZbpldPvIcPHOqq6" +
      "@cluster0-gpac9.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser:
        true,useUnifiedTopology: true  ,createIndexes:true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next) {
   res.send({message:"successfull"})
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// error handlers

// development error handler
// will print stacktrace
                                        // if (app.get('env') === 'development') {
                                        //   app.use(function(err, req, res, next) {
                                        //     res.status(err.status || 500);
                                        //     res.render('error', {
                                        //       message: err.message,
                                        //       error: err
                                        //     });
                                        //   });
                                        // }

// production error handler
// no stacktraces leaked to user
                                                      // app.use(function(err, req, res, next) {
                                                      //   res.status(err.status || 500);
                                                      //   res.render('error', {
                                                      //     message: err.message,
                                                      //     error: {}
                                                      //   });
                                                      // });

app.use('/api/user',userRoutes);

const server = app.listen(5000, () => console.log(`Express server listening on port 5000`));    

module.exports = app;
