

function isStrongPassword(password)
{
    if (!password || password.length < 8) 
    {
        return false;
    }

    let upper = password.match(/[A-Z]/g) || [];
    let lower = password.match(/[a-z]/g) || [];
    let number = password.match(/[0-9]/g) || [];
    let symbol = password.match(/[@$!%*?&#]/g) || [];

    if (upper.length < 2 || lower.length < 2 || number.length < 2 || symbol.length < 2) 
    {
        return false;
    }
    return true;
}


function register() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if(user === "" || pass === "")
    {
        alert("Please fill all fields");
        return;
    }
    
    
    console.log(pass);
    
    if (!isStrongPassword(pass)) 
    {
        confirm("Weak password : Password must contain at least 2 uppercase, 2 lowercase, 2 numbers, 2 symbols and minimum 8 characters");
        return;
    }


    if (localStorage.getItem("registeredUser")) {
        alert("User already registered. Please login.");
        window.location.href = "login.html";
        return;
    }



    localStorage.setItem("registeredUser", user);
    localStorage.setItem("registeredPass", pass);

    alert("Registration successful. Please login.");
}
