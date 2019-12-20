
const parseCookies = (req, res, next) => {
  if(req.headers.cookie){
    let parsedCookie = {};
    console.log(req.headers.cookie)
    console.log(req)
    req.headers.cookie.split(' ').forEach(cookie => {
      let splited = cookie.split('=');
      parsedCookie[splited[0]] = splited[1];
    });
    req.cookies = parsedCookie;

    // res.cookies = parsedCookie;
    next(req, res);
  } else {
    res.status(401).send();
  }
};

module.exports = parseCookies;