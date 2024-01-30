import connectDB from "@/middleware/mongooseMiddleware"
import { User } from "@/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const users = await User.find({})
        res.status(200).json({ users })

    } catch (error) {
        console.log(error);

    }

}
export default connectDB(handler)