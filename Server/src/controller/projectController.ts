import { json, Request, Response } from "express";
import { customProject } from "../interfaces/projectInterfaces";
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from "../config/config";
import { taskValidator } from "../helpers/projectValidator";


export const createProject = async (req:customProject, res:Response)=> {
    try {
        const {projectName, description, deadline, userName} = req.body

        const {error, value}= taskValidator.validate(req.body)
        
        if(error){            
            return res.status(400).json({
                message:error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig)

        await pool.request()
        .input('projectName', mssql.VarChar, projectName)
        .input('description', mssql.VarChar, description)
        .input('deadline', mssql.VarChar, deadline)
        .input('userName', mssql.VarChar, userName)
        .execute ('createProject')

        return res.json({message: 'Project created successfully'})
    } catch (error) {
        if (error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}

export const allProjects = async (req: customProject, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        const projects =(await pool.request()
        .execute('allProjects')).recordset

        return res.json(projects)

    } catch (error) {
        if (error instanceof RequestError){
            res.json({message: error.message})
        }
    }
}