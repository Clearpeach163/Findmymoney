const luxuryColors = [
    "#B76E79", // Rose gold
    "#C9A66B", // Champagne gold
    "#708C83", // Sage green
    "#8B91B5", // Muted lavender
    "#B56A62", // Terracotta
    "#64849A", // Slate blue
    "#A58B70", // Warm taupe
    "#82966D", // Olive green
    "#9B789B", // Dusty purple
    "#B18A55"  // Bronze
];

async function setconsts() {
    const Name = (await Get("full_name")) ?? "Error loading name";
    const Balance = (await Get("balance")) ?? 0;
    const spendings = (await Get("spendings")) ?? "404Error";
    const spendings_lastmonth = (await Get("spendings_lastmonth")) ?? "404Error";
    const Lastmonth_final = 10;
    const earnings = (await Get("earnings")) ?? "404Error";
    const earnings_lastmonth = 40;
    const firstLetter = Name[0].toUpperCase();

    return {
        Name,
        Balance,
        spendings,
        spendings_lastmonth,
        Lastmonth_final,
        earnings,
        earnings_lastmonth,
        firstLetter
    };
}

async function initDashboard() {
    const data = await setconsts();

    const Name = data.Name;
    const Balance = data.Balance;
    const spendings = data.spendings;
    const spendings_lastmonth = data.spendings_lastmonth;
    const earnings = data.earnings;
    const earnings_lastmonth = data.earnings_lastmonth;
    const firstLetter = data.firstLetter;
    const Lastmonth_final = data.Lastmonth_final;

//set up for account with new txt

document.getElementById("msg").innerText = "Hey " + Name + ",";
document.getElementById("account-label").innerHTML = Name;
document.getElementById("balance-euro").innerHTML = "€" + Balance;

const percentage = ((Balance - Lastmonth_final) / Lastmonth_final) * 100;


if (percentage < 0) {
document.getElementById("lastmonth").innerHTML =
    percentage.toFixed(2) + "%";
} else {
document.getElementById("lastmonth").innerHTML =
    "+" + percentage.toFixed(2) + "%";
}






//spendings 
document.getElementById("spendings").innerHTML = "€" + spendings;
const spend_percentage = ((spendings - spendings_lastmonth) / spendings_lastmonth) * 100;


if (spend_percentage < 0) {
document.getElementById("spendings-lastmonth").innerHTML =
    spend_percentage.toFixed(2) + "%";
} else {
    document.getElementById("spendings-lastmonth").innerHTML =
    "+" + spend_percentage.toFixed(2) + "%";
}
//earnings
document.getElementById("earnings").innerHTML = "€" + earnings;
const earnings_percentage = ((earnings - earnings_lastmonth) / earnings_lastmonth) * 100;


if (earnings_percentage < 0) {
document.getElementById("earnings-lastmonth").innerHTML =
    earnings_percentage.toFixed(2) + "%";
} else {
    document.getElementById("earnings-lastmonth").innerHTML =
    "+" + earnings_percentage.toFixed(2) + "%";
}

document.getElementById("savings").innerHTML = "€" + Math.round(earnings - spendings);
document.getElementById("savings-lastmonth").innerHTML = earnings_lastmonth - spendings_lastmonth;

const icon = document.getElementById("icon");
icon.innerHTML = firstLetter;


function getNameColor(name) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % luxuryColors.length;

    return luxuryColors[index];
}

icon.style.backgroundColor = getNameColor(Name);
}// end the async function
initDashboard();








