import jwt from "jsonwebtoken";

export const sendCookie = (user,res, message, statusCode = 200) => {
  // console.log(user);
  const token = jwt.sign({ user_id: user },process.env.APP_SECRET_KEY);
  res.status(statusCode)
    .json({
      success: true,
      message,
      token
    });
};
export default sendCookie;