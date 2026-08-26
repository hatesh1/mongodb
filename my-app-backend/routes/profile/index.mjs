import express from 'express'
import { UserModel } from '../../models/index.mjs'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.get('/profile', async (req, res, next) => {
    try {
        return res.send({
            message: 'fetched profile',
            data: req.currentUser
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error'
        })
    }
})

// edit profile
router.put('/profile', async (req, res, next) => {
    try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname

        const user = await UserModel.findOne({ _id: req.currentUser._id })

        if (!user) {
            return res.status(404).send({
                message: 'account not found'
            })
        }

        if (firstname) {
            user.firstname = firstname
        }

        if (lastname) {
            user.lastname = lastname
        }

        await user.save()

        return res.send({
            message: 'profile updated',
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error'
        })
    }
})

// edit password
router.put('/password', async (req, res, next) => {
    try {
        const currentPassword = req.body.currentPassword
        const newPassword = req.body.newPassword

        const isCurrentPasswordTrue = await bcrypt.compare(currentPassword, req.currentUser.password)

        if (!isCurrentPasswordTrue) {
            return res.status(400).send({
                message: 'current password is invalid',
            })
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 12)

        await UserModel.findByIdAndUpdate({ _id: req.currentUser._id }, {
            $set: {
                password: newPasswordHash
            }
        })

        return res.send({
            message: 'password updated',
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error'
        })
    }
})

// update pf picture
// update email

export default router