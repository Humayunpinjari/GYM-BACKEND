import express from "express"

import {config} from "dotenv"
import cors from "cors"
import {sendEmail} from "./utils/sendEmail.js"

const app = express();
const router = express.Router();

config({path: "./config.env"});

app.use(

    // TO connect with FrontEnd
    cors({
        origin:[process.env.FrontEnd_Url],
        methods:["POST"],
        credentials:true,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

router.post("/send/mail", async (req,res,next) => {
    const {name,email,message} = req.body;
    if(!name || !email || !message){
        return next(res.status(400).json({
            success:false,
            message:"Please Provide all Details",
            
            })
        );
    }

    try{
        await sendEmail({
            email:"pasupuletiharshavardhini271@gmail.com",  //mail for  receiving 
            subject:"GYM WEBSITE CONTACT",
            message,
            userEmail : email,
        });
        res.status(200).json({
            success :true,
            message:"Message sent Successfully."
        })
    } catch (error){
        res.status(500).json({
            success:false,
            message: "Internal Server Error.",
        });
    }
});


app.use(router);


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
    
});