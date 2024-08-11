import express from 'express'; 
import dotenv from 'dotenv';
import client from './database/dbconnection.js';
import userRouter from './routes/userRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import candidateRouter from './routes/candidateRoutes.js';
import cors from 'cors'

client.connect();
const app = express();

//middlewares
dotenv.config();
app.use(
    cors({
      origin: ["http://localhost:5173","http://192.168.1.3:5173","https://jobber-frontend.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(express.json());
app.use('/users',userRouter);
app.use('/jobs',jobRouter);
app.use('/candidate',candidateRouter);


//routes
app.get('/',(req,res) =>{
    res.send('<h1>Hello world</h1>')
})

app.get('/users', async (req,res) =>{
    
})

app.listen(process.env.DEVELOPMENT_PORT,()=>{
    console.log(`Server running at port ${process.env.DEVELOPMENT_PORT}`)
})
