function login()
{
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if(user === "" || pass === "")
    {
        alert("Please fill all fields");
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


