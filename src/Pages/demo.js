import React from "react";
import FacebookLogin from "react-facebook-login";

const Demo = () => {
    const handleResponse = (response) => {
        console.log("Facebook Login Response:", response);
        if (response.accessToken) {
            console.log("Access Token:", response.accessToken);
            console.log("User Info:", response.name, response.email || "Email not provided", response.picture?.data?.url);
            // Send the access token to your backend
        } else {
            console.error("Facebook login failed", response);
        }
    };

    return (
        <div>
            <h1>Sign In with Facebook</h1>
            <FacebookLogin
                appId="3443333199307811" // Replace with your Facebook App ID
                autoLoad={false}
                fields="name,email,picture"
                scope="" // Use the 'email' scope only
                callback={handleResponse}
                icon="fa-facebook"
            />
        </div>
    );
};

export default Demo;

