const API_URL = "https://your-backend.onrender.com/test"; // 🔥 change this

async function runTest() {
    const prompt = document.getElementById("prompt").value;

    document.getElementById("response").innerText = "Processing...";
    document.getElementById("risk").innerText = "";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: prompt })
        });

        const data = await res.json();

        document.getElementById("response").innerText = data.response;
        document.getElementById("risk").innerText = "Risk: " + data.risk;

        updateDashboard(data.risk);

    } catch (error) {
        console.error(error);
        document.getElementById("response").innerText = "Error connecting to server";
    }
}

// Quick buttons
function quickTest(text) {
    document.getElementById("prompt").value = text;
}

// Dashboard logic
let total = 0, high = 0, medium = 0, low = 0;

function updateDashboard(risk) {
    total++;

    if (risk === "HIGH") high++;
    else if (risk === "MEDIUM") medium++;
    else low++;

    document.getElementById("dashboard").innerText =
        `Total: ${total} | High: ${high} | Medium: ${medium} | Low: ${low}`;
}