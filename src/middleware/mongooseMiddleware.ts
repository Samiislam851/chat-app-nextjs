import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDB = (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => Promise<any>) => async (req: NextApiRequest, res: NextApiResponse) => {

    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    if (process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI)
        return handler(req, res)
    }

}

export default connectDB