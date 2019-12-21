const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  if(Object.keys(req.cookies).length === 0)   {
    models.Sessions.create().then(query => {
      models.Sessions.get({id: query.insertId})
      .then(result => {
        req.session = result;
        //TODO: update user id
        res.cookies.shortlyid = {value: result.hash};
        next();
      }).catch(err => {
        console.log(err)
      });
    })
  } else {
    models.Sessions.get({hash: req.cookies.shortlyid}).then(result => {
      if(result){
        req.session = result;
        next();
      } else {
        models.Sessions.create().then(query => {
          models.Sessions.get({id: query.insertId})
          .then(result => {
            req.session = result;
            //TODO: update user id
            res.cookies.shortlyid = {value: result.hash};
            next();
          }).catch(err => {
            console.log(err)
          });
        })
      }

    })
  }


};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

