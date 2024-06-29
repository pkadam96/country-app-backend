const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/dbConnect");
const { UserRouter } = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running..........");
});

app.use("/user", UserRouter);

app.listen(3200, async () => {
    await connectToDB();
    console.log("Server is running on port 3200");
});
