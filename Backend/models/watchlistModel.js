import mongoose from "mongoose";


const watchlistSchema = new mongoose.Schema({
    watchlistId:{
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', // Foreign key to User schema
        required: true 
    },
    stocks:[
        {
            symbol: {
                type:String,
                required:true,
            },
        }],

},{minimize: false});


const WatchlistModel = mongoose.model.Watchlist || mongoose.model('Watchlist', watchlistSchema)

export default WatchlistModel