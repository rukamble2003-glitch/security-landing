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