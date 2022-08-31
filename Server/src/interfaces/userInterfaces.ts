import { Request, Response } from "express"

export interface customUser extends Request{
    body:{
        userName:string
        firstName: string
        lastName: string
        email:string
        password:string
        role: string
    }
  }

export interface User{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}