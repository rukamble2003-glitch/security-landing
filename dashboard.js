// 1. Check for the key
const auth = localStorage.getItem('titan_auth');

// 1. Get the time from storage
const lastLogin = localStorage.getItem('last_login');

// 2. Find a place to put it (Make sure you have an element with this ID in your HTML!)
const timeDisplay = document.querySelector('#session-time');

if (timeDisplay && lastLogin) {
    timeDisplay.innerText = `Session Started: ${lastLogin}`;
}

// 3. Dynamic Greeting Logic
const hour = new Date().getHours();
const greetingTarget = document.querySelector('h1');

if (hour < 12) {
    greetingTarget.innerText = "Good Morning, Commander";
} else if (hour < 18) {
    greetingTarget.innerText = "Good Afternoon, Commander";
} else {
    greetingTarget.innerText = "Good Evening, Commander";
}

// 2. If the key is missing or wrong, redirect to home
if (auth !== 'authorized_user') {
    alert("🛑 ACCESS DENIED: Valid session not found.");
    window.location.href = 'index.html';
}

// 3. If they passed the guard, let's make the Logout button work
const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('titan_auth'); // Destroy the 'key'
    window.location.href = 'index.html';    // Back to home
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
});

const alerts = [
    "Unauthorized login attempt from 192.168.1.1",
    "Firewall blocked suspicious packet",
    "Encrypted handshake established",
    "Database integrity check: 100%",
    "New device connected: 'Admin_Laptop'"
];

const alertList = document.querySelector('#alert-list');

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

const alertSpeed = document.querySelector('#alertSpeed');
var myInterval = setInterval(addLiveAlert, alertSpeed.value);

alertSpeed.addEventListener('change',()=>{
    clearInterval(myInterval);
    const alertSpeedValue = document.querySelector('#alertSpeed').value;
    myInterval = setInterval(addLiveAlert, alertSpeedValue);
})