/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

/**** Call the sample multiply function below by pasting the following into your page code:

import { multiply } from 'backend/new-module.web';

$w.onReady(async function () {
   console.log(await multiply(4,5));
});

****/

import { Permissions, webMethod } from "wix-web-module";
import { authentication } from "wix-members.v2";
import wixData from "wix-data";

export const userLogin = webMethod(
    Permissions.Anyone, (email, password) => {

        // Query the database to check the user's status
        return wixData.query("Members/PrivateMembersData")
            .eq("loginEmail", email) // Ensure the field matches your collection's field for the email
            .find({suppressAuth:true})
            .then((results) => {
                console.log(results);

                if (results.items.length > 0) {
                    const user = results.items[0];

                    // Check if the user's status is 'pending'
                    console.log(`user details>>>`,user);
                    if (user.status === "PENDING") {
                        console.log("User status is pending, login not allowed");
                        return { error: "User status is pending, please verify your email." };
                    } else {
                        // Proceed with login if the user is not pending
                        return authentication.login(email, password)
                            .then((result) => {
                                console.log(`Login successful for user: ${email}`);
                                return result;
                            })
                            .catch((error) => {
                                console.log("Login failed:", error);
                                return { error: "Login failed, please check your credentials." };
                            });
                    }
                } else {
                    console.log("User not found in the database.");
                    return { error: "User not found." };
                }
            })
            .catch((error) => {
                console.log("Error querying user status:", error);
                return { error: "Error checking user status." };
            });
    }
);

export const userRegister = webMethod(
    Permissions.Anyone, (email, password) => {

        // Query the database to check if the user already exists
        return wixData.query("Members/PrivateMembersData")
            .eq("loginEmail", email) // Ensure the field matches your collection's field for the email
            .find({ suppressAuth: true })
            .then((results) => {
                console.log(results);

                if (results.items.length > 0) {
                    console.log("User already exists.");
                    return { error: "User already exists." };
                } else {
                    // Proceed with registration as the user doesn't exist
                    return authentication.register(email, password)
                        .then((result) => {
                            console.log(`User registered successfully: ${email}`);
                            return { success: "User registered successfully." };
                        })
                        .catch((registerError) => {
                            console.log("Registration failed:", registerError);
                            return { error: "Registration failed, please try again." };
                        });
                }
            })
            .catch((error) => {
                console.log("Error querying user status:", error);
                return { error: "Error checking user status." };
            });
    }
);