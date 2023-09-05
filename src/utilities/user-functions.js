// use rafc 
import axios from "axios"
// utilities folder is for universal, reusable functions

export const signUp = async (formData) => {
 let serverResponse = await axios
 ({
   method: "POST",
   url: "/users/signup",
   // route to do signup
   data: formData 
 });
 return serverResponse;
}

export const logIn = async (formData) => {
    let serverResponse = await axios
    ({
        method: "PUT",
        url: "users/login",
        // route to user login
        data: formData
    });
    console.log(serverResponse);
  return serverResponse;
}

export const getUserFromSession = async () => {
    let response = await axios('/session-info')
    console.log(response);
    // WE HAVE A SUCCESSFUL USER LOG IN
    if (response.data.session.passport) {
        let user = response.data.session.passport.user;
        return user;
    } else {
        return false
    }
}




