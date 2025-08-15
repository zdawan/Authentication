import userModel from "../models/userModel.js";

export const getUser = async (req, res) => {
  //"async" mst be thre if "await" is used
  try {
    //adding userId to body by middleware
    // const { userId } = req.body;

    const userId = req.user?.id;

    //finding user in db

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //response in postman
    res.json({
      //Fields which ill be shon on Postman for user details
      success: true,
      userData: {
        name: user.name, // name fetch from Mongodb
        email: user.email, // email fetch from Mongodb
        isAccountVerified: user.isAccountVerified, // t or f
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
