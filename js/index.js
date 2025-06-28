//select inputs of signup
var signupNameInput = document.getElementById("signupNameInput");
var signupEmailInput = document.getElementById("signupEmailInput");
var signupPasswordInput = document.getElementById("signupPasswordInput");
//select input of signin
var signinEmailInput = document.getElementById("signinEmailInput");
var signinPasswordInput = document.getElementById("signinPasswordInput");

//query selectors for sections and buttons (corrected some variable names based on common usage)
var signinSection = document.querySelector(".signinsection");
var signupSection = document.querySelector(".signupsection");
var screenHome = document.querySelector(".screenhome"); 
// Select the actual buttons
var signinSubmitBtn = document.querySelector(".signinsection button");
var signupSubmitBtn = document.querySelector(".signupsection button"); 

var logoutBtn = document.querySelector(".screenhome .btn2");

var signinAncor = document.querySelector(".signinsection .ancor");
var signupAncor = document.querySelector(".signupsection .ancor"); 


// Regular Expressions
var signupNameRegExp = /^[A-Za-z_.-]{3,20}$/;
var signupEmailRegExp = /^[a-zA-Z0-9-.]{3,50}@[a-zA-Z0-9]{1,20}\.[a-zA-Z]{2,5}$/; 
var signupPasswordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

// take data from localstorage when open website
if (localStorage.getItem("usersArr") != null) {
    usersArr = JSON.parse(localStorage.getItem("usersArr"));
}
else{
var usersArr = [];
}




// Function to check if email already exists
function isEmailExist(email) {

    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email.toLowerCase() === email.toLowerCase()) {
            return true; // Email found
        }
    }
    return false; // Email not found
}

function isDataValid(userName, userEmail, userPassword) {
    var isValid = true; 

    // --- Name Validation ---
    if (userName === "") { 
        document.getElementById("signupNameAlert").classList.remove("d-none");
        signupNameInput.classList.add('is-invalid');
        signupNameInput.classList.remove('is-valid');
        isValid = false;
    } else if (!signupNameRegExp.test(userName)) { 
        document.getElementById("signupNameAlert").classList.remove("d-none");
        signupNameInput.classList.add('is-invalid');
        signupNameInput.classList.remove('is-valid');
        isValid = false;
    } else { 
        document.getElementById("signupNameAlert").classList.add("d-none");
        signupNameInput.classList.add('is-valid');
        signupNameInput.classList.remove('is-invalid');
    }

    // --- Email Validation ---
    if (userEmail === "") { 
        document.getElementById("signupEmailAlert").classList.remove("d-none");
        document.getElementById("signupEmailAlert").textContent = "Email is required.";
        signupEmailInput.classList.add('is-invalid');
        signupEmailInput.classList.remove('is-valid');
        isValid = false;
    } else if (!signupEmailRegExp.test(userEmail)) { 
        document.getElementById("signupEmailAlert").classList.remove("d-none");
        signupEmailInput.classList.add('is-invalid');
        signupEmailInput.classList.remove('is-valid');
        isValid = false;
    } else { 
        document.getElementById("signupEmailAlert").classList.add("d-none");
        signupEmailInput.classList.add('is-valid');
        signupEmailInput.classList.remove('is-invalid');
    }

    // --- Password Validation ---
    if (userPassword === "") { 
        document.getElementById("signupPasswordAlert").classList.remove("d-none");
        document.getElementById("signupPasswordAlert").textContent = "Password is required.";
        signupPasswordInput.classList.add('is-invalid');
        signupPasswordInput.classList.remove('is-valid');
        isValid = false;
    } else if (!signupPasswordRegExp.test(userPassword)) { 
        document.getElementById("signupPasswordAlert").classList.remove("d-none");
        signupPasswordInput.classList.add('is-invalid');
        signupPasswordInput.classList.remove('is-valid');
        isValid = false;
    } else { 
        document.getElementById("signupPasswordAlert").classList.add("d-none");
        signupPasswordInput.classList.add('is-valid');
        signupPasswordInput.classList.remove('is-invalid');
    }

    return isValid; // Returns true only if all checks passed
}

// Function to clear signup form inputs
function clearSignupInputs() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";

    // Also clear validation states
    signupNameInput.classList.remove('is-valid', 'is-invalid');
    signupEmailInput.classList.remove('is-valid', 'is-invalid');
    signupPasswordInput.classList.remove('is-valid', 'is-invalid');
    document.getElementById("signupNameAlert").classList.add("d-none");
    document.getElementById("signupEmailAlert").classList.add("d-none");
    document.getElementById("signupPasswordAlert").classList.add("d-none");
}

// Function to clear signin form inputs
function clearSigninInputs() {
    signinEmailInput.value = "";
    signinPasswordInput.value = "";
    signinEmailInput.classList.remove('is-valid', 'is-invalid');
    signinPasswordInput.classList.remove('is-valid', 'is-invalid');
}


// Functions to show/hide sections
function showSignIn() {
    signinSection.classList.remove("d-none");
    signupSection.classList.add("d-none");   
    screenHome.classList.add("d-none");
    clearSignupInputs();
    clearSigninInputs();
}

function showSignUp() {
    signupSection.classList.remove("d-none"); 
    signinSection.classList.add("d-none");   
    screenHome.classList.add("d-none");
    clearSignupInputs();
    clearSigninInputs(); 
}

function showWelcomeScreen(userName) {
    screenHome.classList.remove("d-none");
    signinSection.classList.add("d-none");
    signupSection.classList.add("d-none");
    document.querySelector(".screenhome .text h1").innerHTML = `Welcome ${userName}`;
    clearSigninInputs();
}


// Add user function (main logic for signup)
// Add user function (main logic for signup)
function addUsers() {
    var name = signupNameInput.value.trim();
    var email = signupEmailInput.value.trim();
    var password = signupPasswordInput.value.trim();

    // 1. Clear previous validation states and alerts for ALL fields before new validation
    clearSignupInputs(); // This will also hide all alerts and remove classes

    // 2. Validate all data (empty fields and regex format) using isDataValid
    // isDataValid will handle all visual feedback (is-valid/is-invalid classes and alert messages)
    if (!isDataValid(name, email, password)) {
        console.log("Validation failed: Data format or empty fields.");
        alert("Please fix the highlighted errors."); // Optional: general alert if any field has an error
        return false; // Stop if any validation fails (empty or bad format)
    }

    // 3. Check if email already exists (only if format is valid)
    if (isEmailExist(email)) {
        // Since isDataValid already cleared the alert for this email, we need to show the specific "email exists" alert
        document.getElementById("signupEmailAlert").classList.remove("d-none");
        document.getElementById("signupEmailAlert").textContent = "This email is already registered. Please sign in or use a different email.";
        signupEmailInput.classList.add('is-invalid'); // Mark email field as invalid
        signupEmailInput.classList.remove('is-valid');
        alert("Email already exists. Please use a different email or sign in."); // Optional alert
        return false;
    }

    // 4. If all checks pass, create new user
    var newUser = {
        name: name,
        email: email,
        password: password
    };

    usersArr.push(newUser);
    localStorage.setItem("usersArr", JSON.stringify(usersArr)); // Save updated array

    clearSignupInputs(); // Clear form after successful registration

    alert("Registration successful! Please sign in.");
    showSignIn(); // Redirect to sign-in page
    return true;
}
// function signin user
function loginUser() {
    var email = signinEmailInput.value.trim();
    var password = signinPasswordInput.value.trim();

    // التحقق من الحقول الفارغة أولاً (اختياري، يمكنك إضافة تغذية راجعة مرئية هنا)
    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return false;
    }

    let userFound = false;
    let loggedInUserName = "";

    // التحقق من وجود المستخدم في usersArr
    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email.toLowerCase() === email.toLowerCase() && usersArr[i].password === password) {
            userFound = true;
            loggedInUserName = usersArr[i].name; // احفظ اسم المستخدم لتمريره لشاشة الترحيب
            break;
        }
    }

    if (userFound) {
        // تسجيل الدخول بنجاح
        alert(`Welcome back, ${loggedInUserName}!`);
        showWelcomeScreen(loggedInUserName); // عرض شاشة الترحيب
    } else {
        // فشل تسجيل الدخول
        alert("Invalid email or password.");
        // يمكنك هنا إضافة كلاسات is-invalid لحقول تسجيل الدخول إذا أردت
        signinEmailInput.classList.add('is-invalid');
        signinPasswordInput.classList.add('is-invalid');
    }
}


 // when click buttons to add new user
if (signupSubmitBtn) { 
    signupSubmitBtn.addEventListener("click", function(e) {
        e.preventDefault(); 

        addUsers();
    });
}
if(signinSubmitBtn){
    signinSubmitBtn.addEventListener("click", function(e){
                e.preventDefault(); 
                loginUser();


    })
}

// when click button signup
if (signupAncor) {
    signupAncor.addEventListener("click", function(e) {
        e.preventDefault(); 
        showSignIn();
    });
}

// when click button signin
if (signinAncor) {
    signinAncor.addEventListener("click", function(e) {
        e.preventDefault(); 
        showSignUp();
    });
}

//  how to link the logout button
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        showSignIn(); 
    });
}
