// import express from "express"

// import {config} from "dotenv"
// import cors from "cors"
// import {sendEmail} from "./utils/sendEmail.js"

// const app = express();
// const router = express.Router();

// config({path: "./config.env"});

// app.use(

//     // TO connect with FrontEnd
//     cors({
//         origin:[process.env.FrontEnd_Url],
//         methods:["POST"],
//         credentials:true,
//     })
// );

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// router.post("/send/mail", async (req,res,next) => {
//     const {name,email,message} = req.body;
//     if(!name || !email || !message){
//         return next(res.status(400).json({
//             success:false,
//             message:"Please Provide all Details",
            
//             })
//         );
//     }

//     try{
//         await sendEmail({
//             email:"pasupuletiharshavardhini271@gmail.com",  //mail for  receiving 
//             subject:"GYM WEBSITE CONTACT",
//             message,
//             userEmail : email,
//         });
//         res.status(200).json({
//             success :true,
//             message:"Message sent Successfully."
//         })
//     } catch (error){
//         res.status(500).json({
//             success:false,
//             message: "Internal Server Error.",
//         });
//     }
// });


// app.use(router);


// app.listen(process.env.PORT, ()=>{
//     console.log(`Server listening at port ${process.env.PORT}`);
    
// });


import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

// Allowed origins (include deployed frontend URL without trailing slash)
const allowedOrigins = [
  "https://gym-frontend-lyart.vercel.app",
  // add more URLs if needed, like local dev URL
  // "http://localhost:5173"
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests like curl/postman with no origin
      if (!origin) return callback(null, true);

      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error(
            `CORS policy: Origin ${origin} is not allowed by CORS policy`
          ),
          false
        );
      }

      return callback(null, true);
    },
    methods: ["POST", "OPTIONS"], // allow OPTIONS for preflight
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your POST route
router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please Provide all Details",
    });
  }

  try {
    await sendEmail({
      email: "pasupuletiharshavardhini271@gmail.com", // recipient mail
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message sent Successfully.",
    });
  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
