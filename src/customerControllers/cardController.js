const cardModel = require('../model/cardModel')
const customerModel = require ('../model/customerModel')


const createCard = async (req, res) =>{

    try {

               
        const fieldAllowed=["cardNumber", "customerName", "vision", "customerID"]
        let data= req.body
        const keyOf=Object.keys(data)  
        const receivedKey=fieldAllowed.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});

        let {cardNumber, customerID } = data
        if(!cardNumber.trim()) return res.status(400).send({status:false, message: "cardNumber Can'not be blank"});
        if(!(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|^6(?!011)(?:0[0-9]{14}|52[12][0-9]{12}))$/.test(cardNumber.trim()))) return res.status(400).send({status:false, message: "Invalid Card"});
        const searchCard= await cardModel.findOne({cardNumber})
        if(searchCard) return res.status(400).send({status:false, message: `Card Already registered`});
        if(cardNumber[0]==4 ) data.cardType = "VISA"
        else if(cardNumber.substring(0,2)==51 || cardNumber.substring(0,2)==55) data.cardType = "MASTER CARD"
        else if(cardNumber.substring(0,3)==508 || cardNumber.substring(0,2)==60) data.cardType = "Rupay"

        const searchCustId= await customerModel.findOne ({customerID})
        if(!searchCustId) return res.status(400).send({status:false, message: "Customer id not found"});
        
        const savedData= await cardModel.create(data)
        return res.status(201).send({status: true, message: "Data Saved Successfully", data: savedData})
        
    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
};

 
const getListOfCards = async (req, res) => {
    try {
        const data = req.query
        let filter = { status: "Active" }

        const card = await cardModel.find(filter)
        if (!card.length > 0) return res.status(404).send({ status: false, message: "Card Not Found" });
        return res.status(200).send({ status: true, count: card.length, message: card })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

};


module.exports={createCard, getListOfCards}