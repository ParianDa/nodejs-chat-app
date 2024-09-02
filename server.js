const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.port || '3000'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection',(socket)=>{

    console.log('A user connected')
    //on incoming message
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg)
    })

    //handle disconnection
    socket.on('disconnect', () => {
        console.log("disconnected")
    })
})

server.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})