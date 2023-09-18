const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value)=>{
                const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Please Enter a valid Email address",
        },
    },
    password: {
        required: true,
        type: String,
        // validate: {
        //     validator: (value)=>{

        //         return value.length > 6;

        //         // const re =   /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/;
        //         // return value.match(re);
        //     },

        //     message: "Please Enter a long Password",

        //     // message: "Please Enter a Strong Password with atleast one UpperCase , One LowerCase , One Numeric , One Special Character from [~`!@#$%^&*()--+={}[]|\:;\"'<>,.?/_₹] and having length between 10 and 16",
        // },
    },
})

const User=mongoose.model("User",userSchema);

module.exports=User;