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

export const projectDelete = async(req:customProject, res:Response)=>{
    try {
        const projectName=req.params.projectname

        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('projectName',mssql.VarChar, projectName)
        .execute('deleteProject')

        return res.json({message: `PROJECT ${projectName} deleted`}) 
    } catch (error) {
        console.log(error);
        
        if(error instanceof RequestError){
            return res.status(404).json({
                message:"No Task With That Name."
            })
        }
    }

}


export const updateComplete = async (req:customProject, res:Response)=>{
    try {
        const projectName= req.params.projectname;

        const pool = await mssql.connect(sqlConfig);

        await pool.request()
        .input('projectName', mssql.VarChar, projectName)
        .execute('setComplete')

        return res.status(200).json({
            message: "Task completed"
        })
    } catch (error) {
        if(error instanceof RequestError){
            res.status(404).json({
                message:error.message
            })
        }
        else{
            res.status(500).json({
                message:"Internal Server Error"})
        }
    }
}
