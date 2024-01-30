import connectDB from "@/middleware/mongooseMiddleware";
import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {


        const { email, displayName, photoURL } = req.body
        const user = await User.findOne({ email: email })
     
        if (!user) {
            try {
                const newUser = new User({
                    name: displayName,
                    email: email,
                    image: photoURL
                })

                const response = await newUser.save()

               res.status(200).json({response})
                
            } catch (error) {
                console.log(error);
            }

        } else {
            res.status(200).json({ user })
        }




    }
    else {
        res.status(400).json({ message: 'Bad Request' })
    }



}

export default connectDB(handler)