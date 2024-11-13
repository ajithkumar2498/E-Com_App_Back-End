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

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ];

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
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

