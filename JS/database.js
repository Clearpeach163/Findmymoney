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

async function saveTransaction(amount, type, description, category) {

    // Get logged-in user
    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        console.error("User not logged in:", userError);
        return;
    }

    // Save transaction
    const { data, error } = await supabaseClient
        .from("transactions")
        .insert({
            user_id: user.id,
            amount: amount,
            type: type,
            description: description,
            category: category
        });

    if (error) {
        console.error("Transaction error:", error.message);
        return;
    }

    console.log("Transaction saved!");
} 
