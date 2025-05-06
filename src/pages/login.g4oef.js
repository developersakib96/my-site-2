// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { authentication } from 'wix-members'
$w.onReady(function () {

    // Write your Javascript code here using the Velo framework API

    // Print hello world:
    // console.log("Hello world!");

    // Call functions on page elements, e.g.:
    // $w("#button1").label = "Click me!";

    // Click "Run", or Preview your site, to execute your code

});

$w('#button1').onClick(singupButton_click)

import { userLogin } from 'backend/userAuth.web.js'

export async function singupButton_click(event) {
    let email = $w('#input1').value
    let password = $w('#input2').value
    const { result } = await userLogin(email, password);


    console.log(`login result`,result);
}