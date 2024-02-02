
export interface MongoUser {

    name: string | null;
    email: string | null;
    image: string | null;
    _id?: string;
    password?: string
}