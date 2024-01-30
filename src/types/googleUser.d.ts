interface UserCredential {
    user: {
      uid: string;
      displayName?: string | null;
      email?: string | null;
      photoURL?: string | null;
      // Add other user properties as needed
    };
    credential: {
      providerId: string;
      accessToken?: string | null;
      // Add other credential properties as needed
    };
  }