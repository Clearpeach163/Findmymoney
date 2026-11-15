console.log("Database js loaded");

//loading project in
const supabaseUrl = "https://nukbuutufucnftbkmdlg.supabase.co";
const supabaseKey = "sb_publishable_Pt-gr8XKC66_q60PZ8kuZw_3GkOyxRN";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

//test connection in console:
console.log("Supabase client:", supabaseClient);

//Signup function

// Signup function
async function createAccount(username, email, password) {

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    });

    if (error) {
        console.error("Signup error:", error.message);
        alert(error.message);
        return;
    }

    console.log("Account created:", data);
    alert("Account successfully created!");
}
