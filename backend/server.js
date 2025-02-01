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
import MedicalRecordRoute from "./routes/MedicalRecordRoute.js";

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
app.use('/api/medicalrecord', MedicalRecordRoute); 


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
    console.log("\x1b[93m"),
    console.log(
    "------------------------ <=() SliVer~Luci~F0X ()=> ------------------------\n",
"I, Jawad Choucair, aka: SilverF0x Luci, dedicate this server to:\n",
"The IT that needs support, my good friends(mingo,Jad,JM,elie^2,alex,Carl,Charbel)\n","All IT group, who helped me along the way\n",
"Maroun S. Horkoss, who stood next to me while we faced all the bugs\n",
"Elio,omar and Joe,Lynn,Lynn and zeina who gave me inspiration\n",
"Dr. Philepe Riachie, Dr. Fadi Khamar, Dr Ali Rachine  and Dr. Salem Khalife, gods among men\n",
"My family especially my uncles rawad and mazen \n",
"The best for last, the one and only, the one who made me realize what I am, what I can do\n",
"The one that I can’t function without thinking about,\n the one that I gave my heart to and want her to keep till I die.\n Layal Abou Daher \n",
),
    console.log("\x1b[0m"),
    console.log("\x1b[36m"),
    console.log("server starting :", port),
    console.log("\x1b[0m")
));
