import verifyJWT from "@/middleware/jwtVerify"
import connectDB from "@/middleware/mongooseMiddleware"
import { User } from "@/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const token = req.headers.authorization?.split(' ')[1]
    const { inputValue, user } = req.body

    // console.log('Input... ',inputValue, 'user :', user );
    // console.log('and teh token......', token);


    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized || No Tokens' })
    } else {

        const result: any = await verifyJWT(req, res, token)


        if (result.success) {
            try {

                const regexPattern = new RegExp("\\b" + inputValue + "\\w{0,}\\b", "i");
                const users = await User.find({
                    $or: [
                        { name: regexPattern }
                        ,
                        { email: regexPattern }
                    ]
                })
                console.log(users);

                res.status(200).json({ users, message: 'Done ' })

            } catch (error) {
                console.log(error);

            }
        } else {
            res.status(401).json({ success: false, message: 'Unauthorized || Token expired || anonymous problem' });
        }



    }



}
export default connectDB(handler)