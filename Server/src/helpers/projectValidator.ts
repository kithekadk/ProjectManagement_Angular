import Joi from "joi";

export const taskValidator = Joi.object({
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    deadline:Joi.date().required(),
    userName:Joi.string().required()
})
