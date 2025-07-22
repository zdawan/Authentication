import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token, user } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  // // Simply need to be dltd
  // if (!user) {
  //   return res.json({ success: false, message: "Not Authorized. Login Again" });
  // }

  //If token available
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); //verify the token and decode it

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id; //If id available it ill add to the req.body;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Try Login Again",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export default userAuth;
