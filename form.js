// -------------------------------- FORM CODE --------------------------------
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  getFirestore,
  collection,
  addDoc,
  db,
  getDocs,
  doc,
} from "./firebase.js";

// ------------------------- SIGN UP -------------------------

let signUp = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cPassword = document.getElementById("confirm_pass").value;

  if (password !== cPassword) {
    Toastify({
      text: `Passwords Should Be Identical ❌`,
      gravity: "top",
      position: "center",
      duration: 3000,
    }).showToast();
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Swal.fire("Success", "ACCOUNT CREATED SUCCESSFULLY", "success");
      Toastify({
        text: `Account Created Successfully ✅`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log("Successfully SignUp", user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toastify({
        text: `${errorMessage} ❌`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log("Not Successfully SignUp", errorCode);
    });
};

let signup = document.getElementById("sign_up");
signup.addEventListener("click", signUp);

// ------------------------- SIGN IN -------------------------

let signIn = () => {
  let email = document.getElementById("loginemail").value;
  let password = document.getElementById("loginpassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ---------------------- loaction ---------------------
      // window.location.href = "www.google.com";
      const user = userCredential.user;
      Toastify({
        text: `Login Successfully ✅`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log("Login Successfully", user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toastify({
        text: `${errorMessage} ❌`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log("Not Successfully SignIn", errorMessage);
    });
};
let signin = document.getElementById("sign_in");
signin.addEventListener("click", signIn);

// ------------------------- ON AUTH -------------------------

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid, "Already logged In");
    // window.location.href = "./dashboard.html"
  } else {
    console.log("No User Here");
  }
});

// ------------------------- FORGET PASSWORD -------------------------

let forgetPassword = () => {
  sendPasswordResetEmail(auth, loginemail.value)
    .then(() => {
      Toastify({
        text: `Password Reset Email Sent! ✅`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toastify({
        text: `Not Password Reset Email Sent! ❌`,
        gravity: "top",
        position: "center",
        duration: 3000,
      }).showToast();
      console.log(errorMessage);
    });
};

let forgetPass = document.getElementById("forget-pass");
forgetPass.addEventListener("click", forgetPassword);

// ------------------------------------   LOGIN AND SIGN UP FORM  -----------------------------------------

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
