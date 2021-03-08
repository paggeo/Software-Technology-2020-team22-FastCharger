const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
  const authHeader = req.get('XOBSERVATORY-AUTH');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some Authorization headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }

  //   const token = req.get('Authorization').split(' ')[1]; // if a have Bearer(convention) i use this.
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
  } catch (err) {
    err.statusCode = 500; //TODO maybe this must not be here
    res.status(err.statusCode).send(err.message);
    throw err;
  }
  // we come here if decoding worked
  // now we check if the token was valid or not
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
    throw error;
  }
  // now we have a valid token
  // we put the valid token into the req.usedId so we can use it in the other places this request goes.
  req.userId = decodedToken.userId;
  req.rank = decodedToken.rank;
  next();
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.get('XOBSERVATORY-AUTH');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some Authorization headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }

  //   const token = req.get('Authorization').split(' ')[1]; // if a have Bearer(convention) i use this.
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
  } catch (err) {
    err.statusCode = 500; //TODO maybe this must not be here
    res.status(err.statusCode).send(err.message);
    throw err;
  }
  // we come here if decoding worked
  // now we check if the token was valid or not
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
    throw error;
  }
  // now we have a valid token
  // we put the valid token into the req.usedId so we can use it in the other places this request goes.
  req.userId = decodedToken.userId;
  req.rank = decodedToken.rank;
  if (req.rank.toLowerCase() != 'admin') {
    const error = new Error('Not authenticated. You have no admin rights!');
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }
  next();
};

exports.isAdminOrStationAdmin = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some XOBSERVATORY-AUTH headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }

  //   const token = req.get('Authorization').split(' ')[1]; // if a have Bearer(convention) i use this.
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
  } catch (err) {
    err.statusCode = 500; //TODO maybe this must not be here
    res.status(err.statusCode).send(err.message);
    throw err;
  }
  // we come here if decoding worked
  // now we check if the token was valid or not
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
    throw error;
  }
  // now we have a valid token
  // we put the valid token into the req.usedId so we can use it in the other places this request goes.
  req.userId = decodedToken.userId;
  req.rank = decodedToken.rank;
  console.log(req.rank);
  if (
    req.rank.toLowerCase() == 'admin' ||
    req.rank.toLowerCase() == 'stationadmin'
  ) {
    next();
  } else {
    const error = new Error('Not authenticated. You have no admin rights!');
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }
};
