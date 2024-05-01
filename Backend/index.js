const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");  //to connect the database
const jwt=require("jsonwebtoken");  //to generate the token and verify the token
const multer =require("multer");   //to upload and save the images(to create the image storage system)
const path=require("path");         
const cors=require("cors");         //to provide access to react project
const { type } = require("os");
const { log } = require("console");

app.use(express.json());  //whatever request we will make will be parsed using json method
app.use(cors());            //to get access to react front end

// Database connection with Mongodb
mongoose.connect("mongodb://0.0.0.0:27017/SK_Trade");
    
//API creation
app.get("/",(req,res)=>{
    res.send("Express app is running")
})

//image storage engine

const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({storage:storage})
//createing upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct',async (req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    }) ;
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success:true,
            name:req.body.name,
        })
})
//creating API  for deleting product

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//schema creating for user model
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,

    },
    date:{
        type:Date,
        default:Date.now,
    }
    
})

//creating endpoint for registering the user
app.post('/signup',async (req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"existing user found with same email address"})
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})
// creating  endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:'Wrong Password'});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

// endpoint for new collwction
app.get('/newcollections',async (req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(0).slice(-100);
    console.log("newCollection Fetched");
    res.send(newcollection);
})


// end point for relatedproduct
app.get('/relatedproducts',async (req,res)=>{
    let products=await Product.find({});
    let relatedproduct=products.slice(1).slice(-5);
    console.log("relatedproduct Fetched");
    res.send(relatedproduct);
})
// creating middleware to fetch user

    const fetchUser = async (req,res,next)=>{
        const token=req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using a valid token"});
        }
        else{
            try {
                const data=jwt.verify(token,'secret_ecom');
                req.user=data.user; 
                next();
            } catch (error) {
                res.status(401).send({errors:"please authenticate using a valid token"});
            }
        }
    }

// end point for cart data
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added", req.body.itemId);

    let userData= await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    // console.log(req.body,req.user);
    res.send("Added");
})

// endpoint to remove cartData
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed", req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    // console.log(req.body,req.user);
    res.send("Removed");
})

// end point to get cart item

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("getCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})