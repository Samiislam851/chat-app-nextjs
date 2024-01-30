interface User {
    uid: string; // Unique identifier for the user
    displayName: string | null; // Display name of the user (nullable)
    email: string | null; // Email address of the user (nullable)
    photoURL: string | null; // URL to the user's profile picture (nullable)
    // Add additional properties as needed
}