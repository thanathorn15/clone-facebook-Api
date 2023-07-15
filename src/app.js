require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const friendRoute = require("./routes/friendRoute");
const postRoute = require('./routes/postRoute')

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 2000,
    message: { message: "too many requests" },
  })
);
app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded({extended:false}))

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/friends", authenticate, friendRoute);
app.use("/posts", authenticate, postRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, () =>
  console.log("Server runnning on port " + process.env.PORT)
);
