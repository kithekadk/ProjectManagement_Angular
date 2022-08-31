import { Response } from "express";
import { customUser, User } from "../interfaces/userInterfaces";
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from "../config/config";
import { LoginValidator, userValidator } from "../helpers/userValidator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const createNewUser = async (req:customUser, res:Response)=>{
    try {
        const {userName, firstName,lastName,email,password} = req.body

        const {error, value}= userValidator.validate(req.body)
        const hashedPwd = await bcrypt.hash(password,8)
        if(error){
            return res.status(400).json({
                message:error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig)

        await pool.request()

        .input('userName', mssql.VarChar, userName)
        .input('firstName', mssql.VarChar, firstName)
        .input('lastName', mssql.VarChar, lastName)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, hashedPwd)
        .execute('createUser')

        return res.json({message: 'Account created successfully'})

    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}

export const inactiveUser = async (req:customUser, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        const idleUsers = (await pool.request()
        .execute('IdleUsers')).recordset

        return res.json(idleUsers)
    } catch (error) {
        if (error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}

export const allUsers = async (req: customUser, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)
        const users = (await pool.request()
        .execute('displayAllUsers')).recordset
    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}

export const loginUser = async (req:customUser, res:Response)=>{
    try {
        const {email, password}= req.body;

        const {error, value}= LoginValidator.validate(req.body);
        if(error){
            return res.status(404).json({
                message: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const user:User[] = ( await pool.request()
        .input('email', mssql.VarChar, email)
        .execute('loginUser')).recordset

        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword){
            return res.status(400).json({
                message:"invalid password"
            })
        }
        const logins = user.map(item =>{
            const{password,...rest}=item;
            return rest;
        })
        const token = jwt.sign (logins[0], process.env.KEY as string, {expiresIn:'300s'})
        return res.status(200).json({
            message: "Logged in successfully", token
        })

    } catch (error) {
        if(error instanceof RequestError){
            res.json({message: error.message})
        }
        else{
            console.log(error);
            
        }
    }
}