import express from 'express'
import { UserModel } from '../../models/user/index.mjs'
import { isValidObjectId } from 'mongoose'
import { emailPattern } from '../../utils/core.mjs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async (req, res, next) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const age = req.body.age
        const email = req.body.email
        const password = req.body.password

        if (!firstName) {
            return res.status(400).send({
                message: 'firstname is required!'
            })
        }

        if (!lastName) {
            return res.status(400).send({
                message: 'lastname is required!'
            })
        }

        if (!age) {
            return res.status(400).send({
                message: 'age is required!'
            })
        }

        if (!email) {
            return res.status(400).send({
                message: 'email is required!'
            })
        }

        if (!password) {
            return res.status(400).send({
                message: 'password is required!'
            })
        }

        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: 'email is invalid!'
            })
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() })

        if (user) {
            return res.status(400).send({
                message: 'user already exists!'
            })
        }

        // hash password generating
        const hashedPassword = await bcrypt.hash(password, 12)

        await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: hashedPassword,
        })

        return res.send({
            message: 'signup successfully!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            return res.status(400).send({
                message: 'email is required!'
            })
        }
        if (!password) {
            return res.status(400).send({
                message: 'password is required!'
            })
        }

        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: 'invalid credentials!'
            })
        }

        const userAccount = await UserModel.findOne({ email: email.toLowerCase() })

        if (!userAccount) {
            return res.status(400).send({
                message: 'invalid credentials!'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userAccount.password)

        if (!isPasswordMatch) {
            return res.status(400).send({
                message: 'invalid credentials!'
            })
        }

        // token generating if login successfully
        const token = jwt.sign(
            {
                email: userAccount.email,
                _id: userAccount._id
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )

        return res.send({
            message: 'login successful!',
            data: {
                token: token,
                user: userAccount
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})

export default router