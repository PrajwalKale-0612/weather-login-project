function isStrongPassword(password) {
    if (password.length < 8) return false;

    let upper = 0, lower = 0, number = 0, symbol = 0;

    for (let i = 0; i < password.length; i++) {
        let ch = password[i];

        if (ch >= 'A' && ch <= 'Z') upper++;
        else if (ch >= 'a' && ch <= 'z') lower++;
        else if (ch >= '0' && ch <= '9') number++;
        else if ("@$!%*?&#".includes(ch)) symbol++;
    }

    if (upper < 2 || lower < 2 || number < 2 || symbol < 2) {
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





