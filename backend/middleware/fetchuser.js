const jwt = require("jsonwebtoken");
const JWT_SECRET = "Bjismy$god";

//fetchuser is a middleware function it take three parameters
const fetchuser = (req, res, next) => {
  // get the user details from JWTtoken and add id to req object
 const token = req.header('auth-token')
  if (!token) {
    res
      .status(401)
      .send({ error: "Please Authenticate Through the Valid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please Authenticate Through the Valid Token" });
  }

  
}; 

module.exports = fetchuser;
