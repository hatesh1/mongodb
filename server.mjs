import 'dotenv/config'
import express from 'express'
import { authRoutes, postRoutes } from "./routes/index.mjs"
import cors from 'cors'
import { connectDatabase } from './libs/mongodb.mjs'

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: '*'
}))

const PORT = process.env.PORT || 4001

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Post Manager App</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif; }
                body { background: #9f9ebf; padding: 40px 20px; display: flex; justify-content: center; }
                .container { width: 100%; max-width: 600px; border: 1px solid #334155; padding: 20px 30px; border-radius: 10px;}
                h1 { text-align: center; margin-bottom: 20px; }
                .card { padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 24px; }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; font-weight: bold; }
                input, textarea { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #475569; font-size: 1rem; }
                button { width: 100%; background: #0284c7; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
                button:hover { background: #0369a1; }
                h2 { font-size: 1.2rem; margin-bottom: 10px; }
                .post-item { border: 1px solid #334155; border-radius: 8px; padding: 15px; margin-top: 12px; position: relative; }
                .post-item h3 { margin-bottom: 6px; }
                .post-item p { color: #2d3034; line-height: 1.4; }
                .delete-btn { position: absolute; top: 12px; right: 70px; background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; width: auto; }
                .delete-btn:hover {background: #d51d1d;}
                .edit-btn { position: absolute; top: 12px; right: 12px; background: #6bcf59; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; width: auto;}
                .edit-btn:hover { background: #389029;}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Manage Posts</h1>
                
                <div class="card">
                    <form id="postForm">
                        <div class="form-group">
                            <label>title</label>
                            <input type="text" id="title" placeholder="enter post title" required />
                        </div>
                        <div class="form-group">
                            <label>description</label>
                            <textarea id="description" rows="4" placeholder="enter post description" required></textarea>
                        </div>
                        <button type="submit">publish post</button>
                    </form>
                </div>

                <h2>all posts</h2>
                <div id="postsContainer">loading posts</div>
            </div>

            <script>
                const form = document.getElementById('postForm')
                const postsContainer = document.getElementById('postsContainer')

                async function fetchPosts() {
                    try {
                        const res = await fetch('/api/v1/post')
                        const data = await res.json()
                        
                        postsContainer.innerHTML = ''
                        
                        const posts = Array.isArray(data) ? data : (data.data || [])

                        if (posts.length === 0) {
                            postsContainer.innerHTML = '<p style="color:#2d3034;">no posts found yet</p>'
                            return
                        }

                        posts.forEach(post => {
                            const postEl = document.createElement('div')
                            postEl.className = 'post-item'
                            postEl.innerHTML = \`
                                <h3>\${post.title}</h3>
                                <p>\${post.description}</p>
                                <button class="delete-btn" onclick="deletePost('\${post._id}')">Delete</button>
                                <button class="edit-btn" onclick="editPost('\${post._id}')">Edit</button>
                            \`
                            postsContainer.appendChild(postEl)
                        })
                    } catch (err) {
                        postsContainer.innerHTML = '<p style="color:#ef4444;">error fetching posts!</p>'
                    }
                }

                form.addEventListener('submit', async (e) => {
                    e.preventDefault()
                    const title = document.getElementById('title').value
                    const description = document.getElementById('description').value

                    const res = await fetch('/api/v1/post', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title, description })
                    })

                    if (res.ok) {
                        form.reset()
                        fetchPosts()
                    } else {
                        alert('failed to save post')
                    }
                })

                
                async function editPost(id, currentTitle, currentDescription) {
                    const newTitle = prompt("edit post title:", currentTitle)
                    const newDescription = prompt("edit post description:", currentDescription)

                    if (newTitle !== null && newDescription !== null) {
                        if (!newTitle.trim() || !newDescription.trim()) {
                            alert("title and description cannot be empty!")
                            return
                        }

                        try {
                            const res = await fetch('/api/v1/post/' + id, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ 
                                    title: newTitle, 
                                    description: newDescription 
                                })
                            })

                            if (res.ok) {
                                fetchPosts()
                            } else {
                                alert("failed to update post!")
                            }
                        } catch (err) {
                            console.error("error updating post:", err)
                        }
                    }
                }

                async function deletePost(id) {
                    if (confirm('are you sure you want to delete this post?')) {
                        await fetch(\`/api/v1/post/\${id}\`, { method: 'delete' })
                        fetchPosts()
                    }
                }

                fetchPosts()
            </script>
        </body>
        </html>
    `)
})

app.use('/api/v1', postRoutes)
app.use('/api/v1', authRoutes)

app.listen(PORT, () => {
    console.log('server is running on http://localhost:${PORT}')
    connectDatabase()
})