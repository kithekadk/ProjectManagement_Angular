import express, { json, NextFunction, Request, Response } from 'express'
import router from './routes/projectRoutes';
import cors from 'cors'
import UserRouter from './routes/userRoutes/userRouter';

const app = express()

app.use(json());

app.use(cors())
app.use('/project', router)
app.use('/user', UserRouter)


app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message: err.message})
})

app.listen (5491, ()=>{
    console.log('Server listening on 5491')
})

