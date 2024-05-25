const mongoose = require('mongoose')

const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.DB, {
           
        useUnifiedTopology: true,        
        
        })
        console.log("mongodb connected successfully")
        
        

    }
    catch (err) {
        
        console.log(err)
    }
}
module.exports=connectDB 