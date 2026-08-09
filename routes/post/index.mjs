import express from 'express'
import { PostModel } from '../../models/posts/index.mjs'
import { isValidObjectId } from 'mongoose'


const router = express.Router()
router.post('/post', async (req, res, next) => {
    try {

        if (!req.body.title) {
            return res.status(400).send({
                message: 'title is required!'
            })
        }

        if (!req.body.description) {
            res.status(400).send({
                message: 'description is required!'
            })
        }

        await PostModel.create({
            title: req.body.title,
            description: req.body.description,
        })

        return res.send({
            message: 'post created successfully!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})


router.get('/post', async (req, res, next) => {
    try {
        const allPosts = await PostModel.find()
        return res.send({
            message: 'all posts fetched!',
            data: allPosts
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})


router.get('/post/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        if (!postId) {
            return res.status(400).send({
                message: 'id is required!'
            })
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: 'invalid id!'
            })
        }

        const singlePost = await PostModel.findOne({ _id: req.params.postId })

        if (!singlePost) {
            return res.status(404).send({
                message: 'post not found!'
            })
        }

        return res.send({
            message: 'single post fetched successfully!',
            data: singlePost
        })


    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})


router.delete('/post/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
       if (!postId) {
            return res.status(400).send({
                message: 'id is required!'
            })
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: 'invalid id!'
            })
        }

        await PostModel.findByIdAndDelete(postId)

        return res.send({
            message: 'single post deleted!'
        })


    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})

router.put('/post/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId
        if (!postId) {
            return res.status(400).send({
                message: 'id is required!'
            })
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: 'invalid id!'
            })
        }

        if (!req.body.title) {
            return res.status(400).send({
                message: 'title is required!'
            })
        }

        if (!req.body.description) {
            res.status(400).send({
                message: 'description is required!'
            })
        }

        await PostModel.findByIdAndUpdate({ _id: postId }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
            }
        })

        return res.send({
            message: 'single post updated successfully!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})

export default router