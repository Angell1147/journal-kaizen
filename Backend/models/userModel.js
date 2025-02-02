import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        email : {type : String, required : true, unique: true},
        password : {type : String, required : true},

        //reference to watchlist
        // watchlist : [
        //     {
        //         type : mongoose.Schema.Types.ObjectId,
        //         ref : 'Watchlist',
        //     },
        // ],

        //Reference to Transactions
        // transactions:[
        //     {
        //         type : mongoose.Schema.Types.ObjectId,
        //         ref : 'Transaction',
        //     },
        // ],
    },{minimize: false}
)

const userModel = mongoose.model.user || mongoose.model('user',userSchema);

export default userModel