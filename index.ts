import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import RedisStore from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import { AdminRoute, VendorRoute } from "./routes";
import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  MONGO_URI,
  REDIS_PORT,
  REDIS_HOST,
  SESSION_SECRET,
} from "./config";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;

// Initialize client.
const redisClient = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
})
redisClient.connect().catch(console.error)
// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3000000
    },
    resave: false, 
    saveUninitialized: false,
  }),
)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/admin", AdminRoute);
app.use("/api/vendor", VendorRoute);



app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Hss");
});


const options = {
  dbName: DATABASE_NAME,
  user: DATABASE_USERNAME,
  pass: DATABASE_PASSWORD,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(MONGO_URI, options)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});

app.listen(port, () => {
  console.clear();
  console.log(`Server running on port ${port}`);
});
