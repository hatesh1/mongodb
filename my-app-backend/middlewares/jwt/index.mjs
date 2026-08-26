import jwt from 'jsonwebtoken'
import { UserModel} from '../../models/index.mjs'

export const authGuardJWT = async (req, res, next) => {
    try {
        console.log('middleware running..')
        const token = req.headers.token

        if (!token) {
            return res.status(401).send({
                message: 'unauthorized!'
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const currentUser = await UserModel.findOne({ _id: decodedToken._id })
        // console.log('currentUser----->', currentUser)

        req.currentUser = currentUser
        next()

    } catch (error) {
        console.error(error)
        return res.status(401).send({
            message: 'unauthorized!'
        })
    }
}