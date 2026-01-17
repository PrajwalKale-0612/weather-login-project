function isStrongPassword(password)
{
    if (password.length<8) 
    {
        return false;
    }
    let upper=password.match(/[A-Z]/g);

    let lower=password.match(/[a-z]/g);

    let number=password.match(/[0-9]/g);

    let symbol=password.match(/[@$!%*?&#]/g) || [];
    console.log(number.length);
    console.log(upper.length);
    console.log(lower.length);
    console.log(symbol.length);

    if (upper.length < 2 || lower.length<2 || number.length<2||symbol.length<2) 
    {
        return false;
    }
    return true;
}


function register() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if (localStorage.getItem("registeredUser")) {
        alert("User already registered. Please login.");
        window.location.href = "login.html";
        return;
    }


    if (!isStrongPassword(pass)) {
        alert("Weak password");
        return;
    }

    localStorage.setItem("registeredUser", user);
    localStorage.setItem("registeredPass", pass);

    alert("Registration successful. Please login.");
}
