console.log("Database js loaded");

//loading project in
const supabaseUrl = "https://nukbuutufucnftbkmdlg.supabase.co";
const supabaseKey = "sb_publishable_Pt-gr8XKC66_q60PZ8kuZw_3GkOyxRN";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

//test connection in console:
console.log("Supabase  client:", supabaseClient);

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

// Create financial statistics




// Check if a session exists
if (!data.session) {
    console.log("Waiting for email confirmation.");
    alert("Account created! Please confirm your email and log in.");
    return;
}

// Redirect
location.href = "../HTML/Dashboard.html";

    // Check if a session exists
    if (!data.session) {
        console.log("Waiting for email confirmation.");
        alert("Account created! Please confirm your email and log in.");
        return;
    }

    // Create financial statistics



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
async function createUserStats(userId) {

    const { error } = await supabaseClient
        .from("user_stats")
        .insert({
            id: userId,
            earnings: 0,
            earning_lastmonth: 0,
            balance: 0,
            spendings: 0,
            spendings_lastmonth: 0
        });

    if (error) {
        console.error("Stats creation error:", error.message);
        return false;
    }

    console.log("User stats created!");
    return true;
}
async function getBalance() {

    // Get logged-in user
    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        console.error("User not logged in");
        return;
    }

    // Get balance from user_stats
    const { data, error } = await supabaseClient
        .from("user_stats")
        .select("balance")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error("Balance error :", error.message);
        return;
    }

    return data.balance;
}
async function getSpendings() {

    // Get logged-in user
    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        console.error("User not logged in");
        return;
    }

    // Get balance from user_stats
    const { data, error } = await supabaseClient
        .from("user_stats")
        .select("spendings")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error("Spendings error :", error.message);
        return;
    }

    return data.spendings;
}




/// generic database getter for a specific user_stats column
async function Get(columnName) {

    // Get logged-in user
    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        console.error("User not logged in");
        return null;
    }

    // Fetch the requested column from user_stats
    const { data, error } = await supabaseClient
        .from("user_stats")
        .select(columnName)
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(columnName + " error:", error.message);
        return null;
    }

    return data?.[columnName] ?? null;
}