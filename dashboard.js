// 1. Check for the key
const auth = localStorage.getItem('titan_auth');

// 2. If the key is missing or wrong, redirect to home
if (auth !== 'authorized_user') {
    alert("🛑 ACCESS DENIED: Valid session not found.");
    window.location.href = 'index.html';
}

// 1. Get the time from storage
const lastLogin = localStorage.getItem('last_login');

// 2. Find a place to put it (Make sure you have an element with this ID in your HTML!)
const timeDisplay = document.querySelector('#session-time');

// 3. Dynamic Greeting Logic
const hour = new Date().getHours();
const greetingTarget = document.querySelector('h1');
// 3. If they passed the guard, let's make the Logout button work
const logoutBtn = document.querySelector('#logoutBtn');
const alerts = [
    "Unauthorized login attempt from 192.168.1.1",
    "Firewall blocked suspicious packet",
    "Encrypted handshake established",
    "Database integrity check: 100%",
    "New device connected: 'Admin_Laptop'"
];
let alertSpeed = document.querySelector('#alertSpeed');
let myInterval;
const savedSpeed = localStorage.getItem('titan_alert_speed');

// 2. If it exists, update the dropdown value to match
if (savedSpeed) {
    alertSpeed.value = savedSpeed;
}

const alertList = document.querySelector('#alert-list');

if (timeDisplay && lastLogin) {
    timeDisplay.innerText = `Session Started: ${lastLogin}`;
}


if (hour < 12) {
    greetingTarget.innerText = "Good Morning, Commander";
} else if (hour < 18) {
    greetingTarget.innerText = "Good Afternoon, Commander";
} else {
    greetingTarget.innerText = "Good Evening, Commander";
}


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('titan_auth'); // Destroy the 'key'
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';    // Back to home
});


function addLiveAlert() {
    // 1. Pick a random alert from the array
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    // 2. Create a new list item
    const li = document.createElement('li');
    li.innerText = `[${new Date().toLocaleTimeString()}] ${randomAlert}`;
    
    // 3. Add a CSS class for the "Flash" effect
    li.classList.add('new-alert');

    // 4. Add it to the top of the list
    alertList.prepend(li);

    // 5. Keep only the last 5 alerts (Senior Cleanliness)
    if (alertList.children.length > 5) {
        alertList.removeChild(alertList.lastChild);
    }
}

function startMonitoring() {
    // 1. Always clear the old one first to be safe
    clearInterval(myInterval);

    // 2. Get the current speed from the dropdown
    const speed = Number(alertSpeed.value);

    // 3. Start the new one and save the ID
    myInterval = setInterval(addLiveAlert, speed);
    localStorage.setItem('titan_alert_speed', alertSpeed.value);
}


async function getip() {
    try{
        // let response = await fetch('https://ipapi.co/json/');
        // let ipinfo = await response.json();

        const [ipResponse, response2] = await Promise.all([
            fetch('https://ipapi.co/json/'),
            fetch('https://jsonplaceholder.typicode.com/todos/1')
        ]);

        const [ipInfo, resp2] = await Promise.all([
            ipResponse.json(),
            response2.json()
        ]);

        const ipEl = document.getElementById('network-ip');
        const cityEl = document.getElementById('network-city');
        const countryEl = document.getElementById('network-country');

        // Defensive check: Only write to them if they actually exist on the page
        if (ipEl) ipEl.textContent = ipInfo.ip;
        if (cityEl) cityEl.textContent = ipInfo.city;
        if (countryEl) countryEl.textContent = ipInfo.country_name;

        console.log("System log data successfully loaded:", resp2);
    } catch (error){
        console.error(error);   
    }
}



// When the user changes the dropdown
alertSpeed.addEventListener('change', startMonitoring);

// When the page first loads
startMonitoring();

getip();
