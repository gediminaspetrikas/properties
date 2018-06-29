const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

const db = require('./databases');

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.status) {
      return res.status(err.status)
        .json({
          message: err.message,
          error: err.error,
        });
    }

    // Unknown error which details we do not want to expose
    return res.status(500)
      .json({
        message: 'Contact your local administrator',
        error: 'InternalServerError',
      });
  });
}

db
  .sequelize
  .sync({ force: false })
  .then(() => {
    const server = app.listen(app.get('port'), () => {
      console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
    });

    process.on('exit', (code) => {
      // eslint-disable-next-line no-console
      server.close();
      console.log('EXITING WITH code:', code);
      process.exit(code);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });


process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(`UNCAUGHT EXCEPTION: ${err.name}:${err.message}stack: ${err.stack}`);
  process.exit(30);
});

process.on('unhandledRejection', () => {
  console.log('FATAL');
});

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('EXIT WITH SIGINT');
  process.exit(32);
});


module.exports = app;
