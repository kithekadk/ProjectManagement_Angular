import Joi from 'joi'

export const userValidator = Joi.object({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

export const LoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})