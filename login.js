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
    

    if (upper.length < 2 || lower.length<2 || number.length<2||symbol.length<2) 
    {
        return false;
    }
    return true;
}

function login()
{
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if(user === "" || pass === "")
    {
        confirm("Please fill all fields");
        return;
    }

    if (!isStrongPassword(pass)) 
    {
        confirm("Password must contain at least 2 uppercase, 2 lowercase, 2 numbers, 2 symbols and minimum 8 characters");
        
        return;
    }
    // Save login session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);

    // Go to weather page
    window.location.href = "weather.html";
}


function logout()
{
    localStorage.clear();
    window.location.href = "index.html";
}




