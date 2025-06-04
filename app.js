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

// List all allowed origins here
const allowedOrigins = [
//   "http://localhost:5173",  
  "https://gym-frontend-lyart.vercel.app/" // Your deployed frontend URL — replace this with your actual URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please Provide all Details",
      })
    );
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
