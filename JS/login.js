
console.log("login.js loaded");

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
        console.error(error);
        return;
    }

    console.log("Successfully logged in:", data);
    alert("Welcome back!");
}
