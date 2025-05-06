import { authentication } from 'wix-members';
import { fetch } from 'wix-fetch';// Import Wix triggered emails

$w.onReady(function () {
    // Set up an event listener for button click
    $w('#button1').onClick(() => {
        // Get email and password from input fields
        const email = $w('#input1').value;
        const password = $w('#input2').value;

        // Register the user with email and password
        authentication.register(email, password)
            .then((result) => {
                console.log(`Registration result:`, result);
            })
            .catch((error) => {
                console.log('Error during registration:', error);
            });
    });
});
