const customerModel = require('../model/customerModel')


const createCustomer = async (req, res) =>{
    try {

        const fieldAllowed=["firstName", "lastName", "mobileNumber", "DOB", "emailID", "address.street","address.city","address.state","address.pinCode", "status"]
        let data= req.body
        const keyOf=Object.keys(data)  
        const receivedKey=fieldAllowed.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});

        const {firstName, lastName, mobileNumber, DOB, emailID, status} = data 
        if(!firstName.trim()) return res.status(400).send({status:false, message: "First Name is Can'not be blank"});
        if(!(/^[A-Z a-z]{1,29}$/.test(firstName.trim()))) return res.status(400).send({status:false, message: "First Name should be in alphabet only"});

        if(!lastName.trim()) return res.status(400).send({status:false, message: "Last Name is Can'not be blank"});
        if(!(/^[A-Z a-z]{1,29}$/.test(lastName.trim()))) return res.status(400).send({status:false, message: "Last Name should be in alphabet only"});

        if(!mobileNumber.trim()) return res.status(400).send({ status: false, message: `mobileNumber cannot be blank` });
        if (!/^[6789]\d{9}$/.test(mobileNumber)) return res.status(400).send({status: false,msg: `${mobileNumber} is not a valid mobile number, Please enter 10 digit phone number`});

        const checkPhone= await customerModel.findOne({mobileNumber:mobileNumber}) 
        if(checkPhone) return res.status(400).send({status:false, message: `this ${mobileNumber} is already registered`});

        if(!DOB.trim()) return res.status(400).send({status:false, message: "DOB is Can'not be blank"});
        if(!(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(DOB.trim()))) return res.status(400).send({status:false, message: "DOB in dd-mm-yyyy, dd/mm/yyyy formate only"});

        if(!emailID.trim()) return res.status(400).send({ status: false, message: `emailID cannot be blank` });
        if (!(/^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zAZ]{2,5})+\s*$/.test(emailID))) return res.status(400).send({status: false,message: `${emailID} should be a valid email address`});

        if(!data["address.street"].trim()) return res.status(400).send({status:false, message: "Please Enter Street"});
        if ((/^[!@$%^&*]+/.test(data["address.street"]))) return res.status(400).send({ status: false, message: `Street Contain Specific Address` });
        if(!data["address.city"].trim()) return res.status(400).send({status:false, message: "Please Enter City"});
        if (!(/^[A-Za-z]/.test(data["address.city"]))) return res.status(400).send({ status: false, message: `City Contain Alphabet only` });
        if(!data["address.state"].trim()) return res.status(400).send({status:false, message: "Please Enter state"});
        if (!(/^[A-Za-z]/.test(data["address.state"]))) return res.status(400).send({ status: false, message: `State Contain Alphabet only` });
        if(!data["address.pinCode"]) return res.status(400).send({status:false, message: "Please Enter Pincode"});
        if (!(/^[1-9][0-9]{5}$/.test(data["address.pinCode"]))) return res.status(400).send({ status: false, msg: "Pin Code Should be in 6 digit Numbers Only and Should Not Start with 0" });


        if(!status.trim()) return res.status(400).send({ status: false, message: `status cannot be blank` });
        if(!(status === "Active"  ||  status === "Inactive")) return res.status(400).send({status:false, message: `Status Should be Active or Inactive Only`});

        const checkMail= await customerModel.findOne({emailID:emailID})
        if(checkMail) return res.status(400).send({status:false, message: `this ${emailID} is already registered, please enter new one`});


        let savedData = await customerModel.create(data)
        return res.status(201).send({status: true, message: "Data Saved Successfully", data: savedData})

    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
};


const getListofActiveCustomers = async (req, res) => {
    try {
        const data = req.query
        let filter = { status: "Active" }

        const customer = await customerModel.find(filter)
        if (!customer.length > 0) return res.status(404).send({ status: false, message: "Customer Not Found" });
        return res.status(200).send({ status: true, count: customer.length, message: customer })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

};


const updateCustDetails = async (req, res) => {
    try {
        const custId = req.params.custId
        if (custId.length != 24) return res.status(400).send({ status: false, message: "custId not valid" })

        let data = req.body
        const { mobileNumber, DOB, status} = data
       
        let updatedData = await customerModel.findOneAndUpdate({ _id: custId}, { $set: { mobileNumber: mobileNumber, DOB: DOB, status: status } }, { new: true })
        if (!updatedData) {
            return res.status(404).send({ status: false, message: 'Customer with this data not found' })
        }
        return res.status(200).send({ status: true, message: "Successfully Updated", data: updatedData });
    } catch (error) {
        return res.status(500).send({ satus: false, error: error.message })
    }
};


const deleteCustomer = async function (req, res) {
    try {
        let id = req.params.custId
        if (id.length != 24) { return res.status(400).send({ status: false, message: "please enter proper length of custId (24)" }) };
        let checkCust = await customerModel.findOne({ _id: id })
        if (!checkCust) return res.status(404).send({ status: false, message: "no such cust exists or already deleted " });
        let deleteCust = await customerModel.deleteOne({ _id: id }, { new: true });
        if (deleteCust.modifiedCount == 0) return res.status(400).send({status: false,message: "this customer has been deleted already"});
        return res.status(200).send({ status: true, message: "This customer is deleted successfully", data: deleteCust, })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};




module.exports={createCustomer, getListofActiveCustomers, updateCustDetails,deleteCustomer}