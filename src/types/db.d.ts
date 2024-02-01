interface User {
    uid: string; 
    displayName: string | null; 
    email: string | null; 
    photoURL: string | null;
}

interface MongoUser{
    _id: string; 
    name: string | null; 
    email: string | null; 
    image: string | null;
}