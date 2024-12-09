import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/mongodb.js";
import connectCloudianry from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import messagesRouter from "./routes/messagesRouter.js";
import assistantRoute from "./routes/assistantRoute.js";

//config

const app = express();
const port = process.env.port || 4000;
connect();
connectCloudianry();
//mid ware

app.use(express.json());
app.use(cors());

// api end point
app.use("/api/admin", adminRouter);
app.use('/api/doctor', doctorRouter); 
app.use('/api/user', userRouter); 
app.use('/api/messages', messagesRouter); 
app.use('/api/assistant', assistantRoute); 


//local 4000

app.get("/", (req, res) => {
  res.send("Silver-F0X/Luci");
});

app.listen(port, () => (
    
    console.log("  |\\_/|        ****************************   (\\_/)"),
    console.log(" / @ @ \\       *   jawad atef choucair    *  (='.'=)"),
    console.log("( > º < )      *         SilverF0x        *  (\")_(\")"),
    console.log(" `>>x<<´       *   (jawadc444@gamil.com)  *"),
    console.log(" /  O  \\       ****************************"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠶⢦⣤⠶⠶⣄⠀⠀⠀⠀⠀"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣿⠀⠀⠁⠀ ⣿⠀⠀⠀⠀  ∧__∧"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⣄⠀⣠⠞⠁⠀    (｀•ω•)づ__∧"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠉⠛⠃⣠⣄⡀⠀⠀    つ /( •ω•。)"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠙⢳⣄⢀⡾⠁⠈⣿    しーＪ (nnノ) pat pat"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀⠙⢿⡇⠀⢰⠇⠀⠀⠀⠀      "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦⡀⠀⠀⠹⣦⡟⠀⠀⠀⠀        "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⠈⠻⣄⠀⠀⠀⠀⠀⠀     "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠋⠛⢧⡀⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀      ฅ^•ﻌ•^ฅ"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡴⠾⣧⡀⠀⠀⠹⣦⠀⠀⠈⢿⡄⠀⠀⠀⠀       "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠈⠻⣄⠀⠀⠀⠀ ⠀⠀⠈⣷⠀⠀⠀⠀       ₍˄·͈༝·͈˄₎◞ ̑̑"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⢠⡟⠉⠛⢷⣄⠀⠀⠈⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀⠀⠀      "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⢷⡀⠀⠀⠉⠃⠀⠀⠀⠀⠀⠀⠀⣴⠏⠀⠀⠀⠀⠀⠀     "),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀⠀⠀⠀⠀⠀⠀⢀⣠⠞⠁⠀⠀⠀⠀⠀⠀⠀  ฅ^•ﻌ•^ฅ⠀"),
    console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣤⣤⣤⡤⠶⠋⠁⠀⠀⠀⠀"),
    console.log('\x1b[35m%s\x1b[0m', "██╗░░░░░ ░█████╗░ ██╗░░░██╗ ██╗░░░░░ ░█████╗░"),
    console.log('\x1b[35m%s\x1b[0m', "██║░░░░░ ██╔══██╗ ██║░░░██║ ██║░░░░░ ██╔══██╗"),
    console.log('\x1b[35m%s\x1b[0m', "██║░░░░░ ██║░░██║ ██║░░░██║ ██║░░░░░ ███████║"),
    console.log('\x1b[35m%s\x1b[0m', "██║░░░░░ ██║░░██║ ██║░░░██║ ██║░░░░░ ██╔══██║"),
    console.log('\x1b[35m%s\x1b[0m', "███████╗ ╚█████╔╝ ╚██████╔╝ ███████╗ ██║░░██║"),
    console.log('\x1b[35m%s\x1b[0m', "╚══════╝ ░╚════╝░ ░╚═════╝░ ╚══════╝ ╚═╝░░╚═╝"),
    console.log("\x1b[90m"),
    console.log(
      "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣶⣦⠀⠀\n",
      "⠀⠀⣠⣤⣤⣄⣀⣾⣿⠟⠛⠻⢿⣷⠀\n",
      "⢰⣿⡿⠛⠙⠻⣿⣿⠁⠀⠀ ⠀⣶⢿⡇\n",
      "⢿⣿⣇⠀⠀⠀⠈⠏⠀⠀⠀ SilverFox\n",
      "⠀⠻⣿⣷⣦⣤⣀⠀⠀⠀ ⠀⣾⡿⠃⠀\n",
      "⠀⠀⠀⠀⠉⠉⠻⣿⣄⣴⣿⠟⠀⠀⠀\n",
      "⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠟⠁⠀⠀⠀\n",
      "-----------------------\n",
    ),
    console.log("\x1b[0m"),
    console.log("\x1b[36m"),
    console.log("server starting :", port),
    console.log("\x1b[0m")
));
