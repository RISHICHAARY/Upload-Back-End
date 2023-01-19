const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "manageladen01@gmail.com",
            pass : "ckbjwjcgtddjdadc"
        }
    }
);

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://Rishichaary:rishi1234@ac-yx8v9oa-shard-00-00.por1vin.mongodb.net:27017,ac-yx8v9oa-shard-00-01.por1vin.mongodb.net:27017,ac-yx8v9oa-shard-00-02.por1vin.mongodb.net:27017/?ssl=true&replicaSet=atlas-qm83pl-shard-0&authSource=admin&retryWrites=true&w=majority", 
{
    useNewUrlParser:true,
});

const user_model = require('./models/User_Mode');

//--------------------------------------------------------------------User_Mailer----------------------------------------------------------------------

app.post('/userMailer' , (req , res ) => {
    let details = {
        from :"manageladen01@gmail.com",
        to: req.body.mail,
        subject : "OTP To verify your magic corner account.",
        text : "Hi "+req.body.name+","+" Welcome To Magic Corner. Use "+req.body.otp+" To validate your Magic Corner Account. Once Validated You can start using your account after getting a confirmation mail from us."
    };
    mailTransporter.sendMail( details , (err) =>{
        if(err){
            console.log(err);
        }
    } )
});

//---------------------------------------------------------------Create_User-----------------------------------------------------------------------

app.put("/addUser" , async (req,res) => {
    const user = new user_model({
        full_name : req.body.name ,
        email : req.body.email ,
        password : req.body.password ,
        mobile_no : req.body.mobile ,
        gender : req.body.gender ,
        age : req.body.age ,
        dob : req.body.dob ,
        password : req.body.password,
    });
    try{
        await user.save();
        let details = {
            from :"manageladen01@gmail.com",
            to: req.body.email,
            subject : "Magic Corner Account Established",
            text : "Hi!! "+req.body.name+", You have dived into the world of handmade things. Start Enjoying Your Shopping."
        };
        mailTransporter.sendMail( details , (err) =>{
            if(err){
                console.log(err);
            }
        });
        res.send("Done");
    }catch(err){
        console.log(err);
    }
});

//--------------------------------------------------------------All_Users-------------------------------------------------------------------------

app.get("/allUsers" , ( req , res ) => {
    user_model.find((err , result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//-------------------------------------------------------------Add_File---------------------------------------------------------------------------

app.put("/addFile" , (req , res) => {
    user_model.updateOne( {email:req.body.user , _id:req.body.id} , {$push : {Files : {url : req.body.file , name : req.body.file_name}} } , (err) => {
        if(err){
            console.log(err);
        }
        res.send("Done");
    });
});

//--------------------------------------------------------------Select_User-----------------------------------------------------------------------

app.put("/getUsers" , (req , res) => {
    user_model.findOne({_id : req.body.id} , (err , result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    } );
});

//-----------------------------------------------------------------Delete-------------------------------------------------------------------------

app.put("/deleteMe" , (req , res)=>{
    user_model.updateOne({_id:req.body.id} , {$set:{Files:req.body.file}} , (err , result)=>{
        if(err){console.log(err)}
        res.send("Done");
    })
});

//---------------------------------------------------------------Server----------------------------------------------------------------------------

app.listen(3001 , () => {
    console.log("Server On");
} );