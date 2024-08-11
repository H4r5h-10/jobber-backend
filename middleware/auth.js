import jwt from "jsonwebtoken";
import client from "../database/dbconnection.js";


//********** REMEMBER TO ADD BEARER IN FRONTEND WHEN SENDING REQUEST**************/
export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Login First",
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
        // console.log(decoded.user_id);
        const result = await client.query('SELECT * FROM USERS WHERE USER_ID = $1',[decoded.user_id]);
        req.user = result.rows[0];
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};