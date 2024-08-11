import client from "../database/dbconnection.js";
import bcryptjs from 'bcryptjs'
import sendCookie from "./cookiefeature.js";

export const getAllUsers = async (req,res) => {
    try{
        const result = await client.query('select * from users');
        res.json({status:'Success', data: result.rows});
    }
    catch(err)
    {
        res.json({status:'Failure', data:err.message});
    }
}
export const registerUser = async (req,res) => {
    var {firstname,lastname, email, password, type} = req.body;
    email = email.toLowerCase()
    try{
        const result = await client.query(`SELECT * FROM USERS WHERE USER_EMAIL = $1`,[email]);
        if(result.rows.length == 0)
        {
            const hashedPassword = bcryptjs.hashSync(password, 10);
            const insertion = await client.query("insert into users (first_name,last_name, user_email, user_password, user_type) values($1, $2, $3, $4, $5)", [firstname, lastname,email, hashedPassword, type]);
            const result = await client.query('SELECT USER_ID FROM USERS WHERE USER_EMAIL=$1',[email]);
            sendCookie(result.rows[0].user_id,res,"Registered");
        }else{
            res.status(400).send({status:"Failure", data:"Email already exists"})
        }
    }
    catch(err)
    {
        res.status(500).send({status:"Failure", data:err.message})
    }
}
export const loginUser = async (req, res) => {
    try {
        var { email, password } = req.body;
        email = email.toLowerCase();
        const result = await client.query(`SELECT * FROM USERS WHERE USER_EMAIL = $1`, [email]);
        if (result.rows.length > 0) {
            const passwordFetch = result.rows[0].user_password;
            const passwordMatch = bcryptjs.compareSync(password,passwordFetch);
            if(passwordMatch){
                sendCookie(result.rows[0].user_id, res, 'Logged In');
            }
            else{
                res.status(404).send({status:"Failure", data: "Invalid Credentials" });
            }
        } else {
            res.status(404).send({status:"Failure", data: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
};
