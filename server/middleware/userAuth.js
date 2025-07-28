// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized. Login Again" });
//   }

//   //If token available
//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET); //verify the token and decode it

//     if (tokenDecode.id) {
//       req.body.userId = tokenDecode.id; //If id available it ill add to the req.body;
//     } else {
//       return res.json({
//         success: false,
//         message: "Not Authorized. Try Login Again",
//       });
//     }

//     next();
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// export default userAuth;

//CHATGPT corrected code
//change in " if(tokenDecode.id)"
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // ✅ safer way
      next();
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
