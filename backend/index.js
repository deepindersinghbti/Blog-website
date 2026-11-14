const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
const postRoutes = require("./routes/post.js");

const app = express();

// Auth is a JWT sent in the Authorization header, so any origin can be allowed.
app.use(cors({ origin: true, credentials: true }));

mongoose.set("strictQuery", false);
if (keys.MONGO_URI) {
  mongoose
    .connect(keys.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      if (/auth|parse|URL/i.test(error.message)) {
        console.error("  -> Check the database user/password in MONGO_URI (URL-encode special characters like @ : / ? # %).");
      } else if (/whitelist|ENOTFOUND|timed out|Server selection/i.test(error.message)) {
        console.error("  -> Check the cluster host in MONGO_URI and that your IP is allowed in Atlas > Network Access.");
      }
    });
  mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));
} else {
  console.warn("MONGO_URI is not set - copy backend/.env.example to backend/.env and fill it in.");
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(fileUpload({ limits: { fileSize: 8 * 1024 * 1024 }, abortOnLimit: true }));

app.use("/", userRoutes);
app.use("/", uploadRoutes);
app.use("/", postRoutes);

app.listen(keys.PORT, () => {
  console.log(`server running ${keys.PORT}`);
});
