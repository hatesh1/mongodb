import express from 'express'

const router = express.Router()

router.post('/post', (req, res, next) => {
    try {
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


router.get('/post', (req, res, next) => {
    try {
        return res.send({
            message: 'all posts fetched!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})


router.get('/post/:postId', (req, res, next) => {
    try {
        const postId = req.params.postId
        return res.send({
            message: 'single post fetched!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})


router.delete('/post/:postId', (req, res, next) => {
    try {
        const postId = req.params.postId
        return res.send({
            message: 'single post deleted successfully!'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error!'
        })
    }
})

router.put('/post/:postId', (req, res, next) => {
    try {
        const postId = req.params.postId

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