// Fetching data
async function fetchWeatherAlerts(state) {
  const url = `https://api.weather.gov/alerts/active?area=${state}`;

  try{
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather Alerts Data:", data);

    displayAlerts(data);

    document.getElementById("state-input").value = "";
  } catch (error) {
    displayError(error.message); 
  }
}


// Displaying
function displayAlerts(data) {
  const container = document.getElementById("alerts-display");
  const errorBox = document.getElementById("error-message");

container.innerHTML = "";

//   Clear error message
  errorBox.textContent = "";
  errorBox.classList.add("hidden");

    const title = data.title || "Weather Alert";   
    const alerts = data.features || [];
    const count = alerts.length;

  
  // Summary
    const summary = document.createElement("h2");
    summary.textContent = `${title}: ${count}`;
    container.appendChild(summary);

//   No alerts
    if (count === 0) {
    const noAlertMsg = document.createElement("p");
    noAlertMsg.textContent = "No active weather alerts for this state.";
    container.appendChild(noAlertMsg);
    return;
  }
    


// Alerts list 
const list = document.createElement("ul");

alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties?.headline || "No headline available";
    list.appendChild(li);
});

container.appendChild(list);
}


// Display error 
function displayError(message) {
  const errorBox = document.getElementById("error-message");
  const container = document.getElementById("alerts-display");
  
  container.innerHTML = ""; 

//   Showing error message
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}


// Button click
document.getElementById("fetch-alerts").addEventListener("click", () => {
  const inputField = document.getElementById("state-input");
  const state = inputField.value.trim().toUpperCase();  

  if (!state) {
    displayError("Please enter a state abbreviation (e.g., CA, TX).");
    return;
  } 
    fetchWeatherAlerts(state);
});