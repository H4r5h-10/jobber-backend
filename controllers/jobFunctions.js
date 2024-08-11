import client from "../database/dbconnection.js";

export const getAllJobs = async (req, res) =>{
    const result = await client.query('SELECT * FROM JOBDEETS');
    res.send({success:"Success",data:result.rows});
}
