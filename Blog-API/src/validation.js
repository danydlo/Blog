import Joi from '@hapi/joi'

const registerValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
  return Schema.validate(data)
}

const loginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
  return Schema.validate(data)
}

const postValidation = (data) => {
  const Schema = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    author: Joi.object().required(),
    publish: Joi.boolean(),
  })
  return Schema.validate(data)
}

const updateValidation = (data) => {
  const Schema = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    publish: Joi.boolean(),
  })
  return Schema.validate(data)
}

export { registerValidation, loginValidation, postValidation, updateValidation }
