const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id:{
        required: true,
        type: String,
    },
    items: [
        {
            itemName:{
                type: String,
            required: true,
            },
            itemLink:{
                type: String,
                required:true,
            }
        },
    ],
});

const Item=mongoose.model("Item",itemSchema);

module.exports=Item;