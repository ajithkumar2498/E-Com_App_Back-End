import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import AppRoutes from './routes/index.js'
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api',AppRoutes)



connectDB().then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log('DB COnnected') 
        console.log(`server listening in ${process.env.PORT}`)
    } )
})
app.get('/',(req,res)=>{
    res.status(200).send({
        message:`server running in ${process.env.PORT}`
    })
})

