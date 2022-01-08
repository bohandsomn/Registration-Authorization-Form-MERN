import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"

import User from "../entities/User.js"
import config from "../config.js"

const generateAccessToken = id => {
    const payload = { id }
    const { secret } = config
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class Controller {
    registration = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при регистрации', 
                    errors: errors.errors.map( obj => obj.msg ),
                    isSuccess: false
                })
            }

            const { name, login, email, password} = req.body
            
            const candidateLogin = await User.findOne( { login } )
            if (candidateLogin) {
                return res.json({
                    message: 'Пользователь с таким логином уже существует',
                    isSuccess: false
                })
            }

            const candidateEmail = await User.findOne( { email } )
            if (candidateEmail) {
                return res.json({
                    message: 'Пользователь с такой почтой уже существует',
                    isSuccess: false
                })
            }

            const nashPassword = bcrypt.hashSync(password, 7)

            const user = new User({
                name, 
                login, 
                email, 
                password: nashPassword, 
                oldPasswords: [nashPassword]
            })
            user.save()

            res.json({
                message: 'Пользователь был успешно добавлен',
                isSuccess: true
            })
        } catch (error) {
            res.json({
                message: 'Ошибка регистрации',
                isSuccess: false
            })
            console.log(error)
        }
    }
    authorization = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при авторизации', 
                    errors: errors.errors.map( obj => obj.msg ),
                    isSuccess: false
                })
            }

            const { login, password } = req.body

            const candidate = await User.findOne( { login } )
            if (!candidate) {
                return res.json({
                    message: 'Пользователь с таким login не найден',
                    isSuccess: false
                })
            } 

            const isValidPassword = bcrypt.compareSync(password, candidate.password)
            if (!isValidPassword) {
                return res.json({
                    message: 'Не верный пароль',
                    isSuccess: false
                })
            } 

            const token = generateAccessToken(candidate._id)
            req.headers.authorization = token

            res.json({
                token,
                message: 'Пользователь был успешно авторизован',
                isSuccess: true
            })
        } catch (error) {
            console.log(error)
            return res.status(403).json({
                message: 'Ошибка авторизации',
                isSuccess: false
            })
        }
    }
    getAccess = async (req, res) => {
        try {
            const [ , token] = req.headers.authorization.split(' ')
            if (!token) {
                return res.status(403).json({
                    message: 'Пользователь не авторизован',
                    isSuccess: false
                })
            }

            const { secret } = config
            const decodeData = jwt.verify(token, secret)

            const candidate = await User.findOne({ _id: decodeData.id })
            if (!candidate) {
                return res.status(403).json({
                    message: 'Пользователь не авторизован',
                    isSuccess: false
                })
            }

            res.json({
                message: 'Пользователь успешно авторизован',
                isSuccess: true,
                user: {
                    name: candidate.name, 
                    login: candidate.login, 
                    email: candidate.email
                }
            })
        } catch (error) {
            console.log(error)

            return res.status(403).json({
                message: 'Ошибка авторизации',
                isSuccess: false
            })
        }
    }
    changeData = async (req, res) => {
        try {
            const [ , token] = req.headers.change.split(' ')

            const { confirmPassword, name, login, email, password, gender, phone, place } = req.body.changeData

            if (confirmPassword === '' || confirmPassword === undefined) {
                return res.json({
                    message: `Подтвердите пароль`,
                    isSuccess: false
                })
            }
            
            const { secret } = config
            const decodeData = jwt.verify(token, secret)
            
            const candidate = await User.findOne({ _id: decodeData.id })
            if (!candidate) {
                return res.json({
                    message: 'Пользователь не найден',
                    isSuccess: false
                })
            }

            const isValidPassword = bcrypt.compareSync(confirmPassword, candidate.password)
            if (!isValidPassword) {
                return res.json({
                    message: 'Не верный пароль',
                    isSuccess: false
                })
            }

            const candidateLogin = await User.findOne( { login } )
            if (candidateLogin && (candidate._id.toString() !== candidateLogin._id.toString())) {
                return res.json({
                    message: 'Пользователь с таким login уже существует',
                    isSuccess: false
                })
            }
            const candidateEmail = await User.findOne( { email } )
            if (candidateEmail && (candidate._id.toString() !== candidateEmail._id.toString())) {
                return res.json({
                    message: 'Пользователь с таким email уже существует',
                    isSuccess: false
                })
            }
            const candidatePhone = await User.findOne( { phone } )
            if (candidatePhone && (candidate._id.toString() !== candidatePhone._id.toString())) {
                return res.json({
                    message: 'Пользователь с таким phone уже существует',
                    isSuccess: false
                })
            }

            await candidate.updateOne({ name, login, email, gender, phone, place })
            
            if (password !== '') {
                await candidate.updateOne({
                    password: bcrypt.hashSync(password, 7),
                    oldPasswords: [...candidate.oldPasswords, bcrypt.hashSync(password, 7)]
                })
            }

            return res.status(200).json({
                message: `Данные успешно обновлены`,
                isSuccess: true
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Ошибка обновнения',
                isSuccess: false
            })
        }
    }
    getData = async (req, res) => {
        try {
            const [ , token] = req.headers.change.split(' ')
            
            const { secret } = config

            const decodeData = jwt.verify(token, secret)
            
            const candidate = await User.findOne({ _id: decodeData.id })
            if (!candidate) {
                return res.json({
                    message: 'Пользователь не найден',
                    isSuccess: false
                })
            }

            const { name, login, email, gender, phone, place } = candidate
            
            return res.status(200).json({
                name, login, email, gender, phone, place, password: '',
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Ошибка получения данных',
                isSuccess: false
            })
        }
    }
}

export default new Controller()