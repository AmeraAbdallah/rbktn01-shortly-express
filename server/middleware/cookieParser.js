
const parseCookies = (req, res, next) => {
  if( req.headers.cookie ) {
    let parsedCookie = {};
    req.headers.cookie.split('; ').forEach(cookie => {
      let splited = cookie.split('=');
      parsedCookie[splited[0]] = splited[1];
    });
    req.cookies = parsedCookie;
    next();
  } else {
    res.status(401).send();
  }
};

module.exports = parseCookies;