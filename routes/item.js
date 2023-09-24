const express = require("express");
const Item = require("../models/item");
const itemRouter = express.Router();
const auth = require("../middlewares/auth")

itemRouter.post("/api/add-item",auth,async (req,res) => {
    try {
        const { id,item_name,item_link } = req.body;

        let chkitem =  await Item.findById(id);

        if(chkitem)
        {
            chkitem.items.push({
                itemName:item_name,
                itemLink:item_link,
            });
            chkitem = await chkitem.save();
            res.json(chkitem);
        }
        else
        {
            let item = new Item({
                _id:id,
                items:{
                    itemName:item_name,
                    itemLink:item_link,
                }
            });
            item = await item.save();
            res.json(item);
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

itemRouter.post("/api/get-items",async (req,res) => {
    try {
        const id = req.header('x-user-id');
        let item =  await Item.findById(id);

        if(item)
        {
            res.json(item);
        }
        else
        {
            return res.status(400).json({msg:'You have not added any data'});
        }
    }
    catch (e)
    {
        res.status(500).json({error: e.message});
    }
});

itemRouter.post("/api/delete-item",auth,async (req,res) => {
    try {
        const { id,objectId } = req.body;

        let item =  await Item.findById(id);

        if(item)
        {
            try {
                for(let i=0;i<item.items.length;i++)
                {
                    if(item.items[i]._id.toString() === objectId.toString())
                    {
                        item.items.splice(i,1);
                        break;
                    }
                }
                item = await item.save();
                res.json(item);
            } catch (error) {
                res.status(400).json({msg:'No item with this id'});
            }
        }
        else
        {
            res.status(400).json({msg:'No user with this Id'});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

itemRouter.post("/api/update-item",auth,async (req,res) => {
    try {
        const { id,objectId,item_name,item_link } = req.body;

        let item =  await Item.findById(id);

        if(item)
        {
            try {
                for(let i=0;i<item.items.length;i++)
                {
                    if(item.items[i]._id.toString() === objectId.toString())
                    {
                        item.items[i].itemName=item_name;
                        item.items[i].itemLink=item_link;
                        break;
                    }
                }
                item = await item.save();
                res.json(item);
            } catch (error) {
                res.status(400).json({msg:'No item with this id'});
            }
        }
        else
        {
            res.status(400).json({msg:'No user with this Id'});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = itemRouter;