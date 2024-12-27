import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Demo = () => {
    const handleSuccess = (response) => {
        const token = response.credential; // Get the Google JWT
        const user = jwtDecode(token); // Decode the JWT to get user details
        console.warn("User Info:", user);
        // Example: { email, name, sub (Google UID), picture, etc. }
    };

    const handleFailure = (error) => {
        console.error("Login Failed:", error);
    };
    return (
        <div style={{ margin: "50px" }}>
            <h1>Sign in with Google</h1>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                text="signin_with"
            />
        </div>
    );
};

export default Demo;
