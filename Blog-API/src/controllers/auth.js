import 'dotenv/config'
import Author from '../models/author'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation'

const register = async (req, res) => {
  // validate the user
  const { error } = registerValidation(req.body)

  if (error) return res.status(400).json({ error: error.details[0].message })

  const isEmailExist = await Author.findOne({ email: req.body.email })

  // throw error when email already registered
  if (isEmailExist) return res.status(400).json({ error: 'Email already exists' })

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  const user = new Author({
    name: req.body.name,
    email: req.body.email,
    password,
  })

  try {
    const savedUser = await user.save()
    res.json({ error: null, data: savedUser })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const login = async (req, res) => {
  // validate the user
  const { error } = loginValidation(req.body)

  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message })

  const user = await Author.findOne({ email: req.body.email })

  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: 'Invalid login' })

  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (!validPassword) return res.status(400).json({ error: 'Invalid login' })

  // create token
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  )

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      id: user._id,
    },
  })
}

export { register, login }
