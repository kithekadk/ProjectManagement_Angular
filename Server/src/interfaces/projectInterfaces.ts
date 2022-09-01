import { Request } from "express"

export interface customProject extends Request{
    body:{
        projectId: number
        projectName: string
        description: string
        deadline: string
        userName: string
        status: string
        issent: string
    }
}

export interface Data{
    projectId : number;
    projectName: string,
    description: string,
    password: string,
    endDate:string,
    userName:string,
    email:string,
    role:string,
    iat:number,
    exp:number
}