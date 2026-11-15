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


const Name = "David";
const Balance = 30;
const Lastmonth_final = 10;
const firstLetter = Name[0].toUpperCase();
//set up for account with new txt

document.getElementById("msg").innerText = "Hey " + Name + ",";
document.getElementById("account-label").innerHTML = Name;
document.getElementById("balance-euro").innerHTML = "€" + Balance;
const percentage = ((Balance - Lastmonth_final) / Lastmonth_final) * 100;

document.getElementById("lastmonth").innerHTML =
    "+" + percentage.toFixed(2) + "%";

const icon = document.getElementById("icon")


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
