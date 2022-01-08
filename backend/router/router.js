import Router from "express"
import { check } from "express-validator"

import controller from "./controller.js"

const router = new Router()

router.post('/reg', [
    check('name', 'Введите Ваше имя').notEmpty(),
    check('login', 'Введите Ваш логин').notEmpty(),
    check('email', 'Введите Вашу почту').notEmpty(),
    check('password', 'Введите Ваш пароль').notEmpty(),
    check('password', 'Ваш пароль не валидный. Длина пароля должна быть с 8 до 12 символов').isLength({min: 8, max: 12})
], controller.registration)
router.post('/auth', [
    check('login', 'Введите Ваш логин').notEmpty(),
    check('password', 'Введите Ваш пароль').notEmpty(),
], controller.authorization)
router.get('/cabinet', controller.getAccess)
router.get('/cabinet/get-data', controller.getData)
router.post('/cabinet/change-data', controller.changeData)

export default router