let intentosReg = 0;
let intentosLogin = 0;
let userData = {}; 

document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("showPassReg").addEventListener("click", () => {
        let p = document.getElementById("password");
        p.type = p.type === "password" ? "text" : "password";
    });

    document.getElementById("showPassLogin").addEventListener("click", () => {
        let p = document.getElementById("loginPassword");
        p.type = p.type === "password" ? "text" : "password";
    });

    document.getElementById("showPassRecover").addEventListener("click", () => {
        let p1 = document.getElementById("newPassword");
        let p2 = document.getElementById("confirmPassword");

        p1.type = p1.type === "password" ? "text" : "password";
        p2.type = p2.type === "password" ? "text" : "password";
    });

});

function goToRecover() {
    document.getElementById("registerSection").classList.add("hidden");
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("recoverSection").classList.remove("hidden");
}


document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (intentosReg >= 3) {
        alert("Has sido bloqueado por demasiados intentos.");
        return;
    }

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passRegex = /^(?=.*[A-Z])[A-Za-z]{4,}$/;
    let phoneRegex = /^[0-9]{8,12}$/;

    if (!emailRegex.test(email)) {
        intentosReg++;
        alert("Correo electrónico inválido. Intento: " + intentosReg);
    } 
    else if (!passRegex.test(password)) {
        intentosReg++;
        alert("La contraseña debe tener mínimo 4 letras y 1 mayúscula. Intento: " + intentosReg);
    } 
    else if (!phoneRegex.test(phone)) {
        intentosReg++;
        alert("El teléfono debe contener entre 8 y 12 dígitos. Intento: " + intentosReg);
    } 
    else {
        alert("Registro exitoso.");

        userData.username = username;
        userData.password = password;

        document.getElementById("registerSection").classList.add("hidden");
        document.getElementById("loginSection").classList.remove("hidden");
        return;
    }

    if (intentosReg === 2) {
        document.getElementById("recoverReg").classList.remove("hidden");
    }

    if (intentosReg >= 3) {
        document.getElementById("register-btn").disabled = true;
    }

});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let loginUser = document.getElementById("loginUser").value;
    let loginPassword = document.getElementById("loginPassword").value;

    if (intentosLogin >= 3) {
        alert("Cuenta bloqueada.");
        return;
    }

    if (loginUser === userData.username && loginPassword === userData.password) {
        alert("Inicio de sesión exitoso. Bienvenido " + loginUser + "!");
    } 
    else {
        intentosLogin++;
        alert("Usuario o contraseña incorrectos. Intento: " + intentosLogin);
    }

    if (intentosLogin >= 3) {
        document.getElementById("loginBtn").disabled = true;
        document.getElementById("recoverLogin").classList.remove("hidden");
    }
});


document.getElementById("recoverForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let user = document.getElementById("recoverUser").value;
    let newPass = document.getElementById("newPassword").value;
    let confirmPass = document.getElementById("confirmPassword").value;

    if (user !== userData.username) {
        alert("El usuario no existe.");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let passRegex = /^(?=.*[A-Z])[A-Za-z]{4,}$/;
    if (!passRegex.test(newPass)) {
        alert("La nueva contraseña debe tener mínimo 4 letras y 1 mayúscula.");
        return;
    }

    userData.password = newPass;
    alert("Contraseña actualizada correctamente.");

    document.getElementById("recoverSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
});
