const Contact = require('../model/contact_model')

//read all- get
const readAllContact = async(req, res) => {
    try {
        let contacts = await Contact.find({})

        res.status(200).json({length: contacts.length, contacts})
        // res.json({msg: `read all`})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

//read single - get(id)
const readSingleContact = async(req, res) => {
    try {
        let id = req.params.id
        let single = await Contact.findById({_id: id})
        if(!single)
        return res.status(404).json({msg: `Requested id not found`})
        
        res.status(200).json({contact: single})
        // res.json({msg: `read single`})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

// create -> post + data
const createContact = async(req, res) => {
    try {
        let {email, mobile, website} = req.body
        //verify email
        let extData = await Contact.findOne({email})
        if(extData)
        return res.status(400).json({msg: `${email} already exists`})
        //verify mobile
        let extMob = await Contact.findOne({mobile})
        if(extMob)
        return res.status(400).json({msg: `${mobile} number already exists`})
        //verify website
        let extWeb = await Contact.findOne({website})
        if(extWeb)
        return res.status(400).json({msg: `${website} already exists`})
        //new contact
        let newContact = await Contact.create(req.body)
        res.status(200).json({msg: `new contact added successfully`, data: newContact})
        // res.json({data: req.body})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


// update -> patch(id)/put(id) + data
const updateContact = async(req, res) => {
    try {
        let id = req.params.id
        let {email, mobile, website} = req.body
        let single = await Contact.findById({_id: id})
        if(!single)
            return res.status(404).json({msg: `Requested id not found`})
          
        await Contact.findByIdAndUpdate({_id: id}, req.body)

        res.status(200).json({msg: `contact info updated successfully`})
        // res.json({msg: `update`})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


// delete  -> delete(id)
const deleteContact = async(req, res) => {
    try {
        let id = req.params.id
        let single = await Contact.findById({_id:id})
        if(!single)
        return res.status(404).json({msg: `Requested id not found`})
        
        await Contact.findByIdAndDelete({_id: id})
        res.status(200).json({msg: `contact info deleted successfully`})
        // res.json({msg: `delete`})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
//const or named or types
module.exports = {readAllContact, readSingleContact, createContact,
updateContact, deleteContact}
