let servicesData = [];
const contactForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const submitBtnDefaultText = submitBtn.textContent;
const submitBtnDefaultColor = window.getComputedStyle(submitBtn).backgroundColor;

const servicesContainer = document.querySelector('#services');

const searchInput = document.querySelector('#serviceSearch');

//search query----------------------------------------------------------------------------------
function renderSearch(filtertext = ""){
    servicesContainer.innerHTML = "";

    filtered = servicesData.filter(service =>
        service.title.toLowerCase().includes(filtertext.toLocaleLowerCase())
    )

    filtered.forEach(service => {
        const card = document.createElement('div');
        card.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        `;
        servicesContainer.appendChild(card);
    });

}

searchInput.addEventListener('input',function(e){
renderSearch(e.target.value);
});

// Initial call to show all services on page load
// 1. New function to get data from the internet
async function fetchServices() {
    try {
        // The Request
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        console.log(response);
        // Convert the "raw" response into a JSON object (JavaScript can read this)
        const data = await response.json();
        console.log(data);

        // 2. Map the API data to our format
        // API gives us 'title' and 'body'. We want 'title' and 'desc'.
        const liveServices = data.map(post => ({
            title: post.title.substring(0, 20), // Shorten the title
            desc: post.body
        }));
        console.log(liveServices);


        // 3. Update our global data and render
        servicesData = liveServices; 
        renderSearch(); // Show them on the screen!

    } catch (error) {
        console.error("System Breach: Could not fetch data.", error);
        servicesContainer.innerHTML = "<p>Error loading security data. Check connection.</p>";
    }
}

// Start the process
fetchServices();
//----------------------------------submit action-----------------------------------------------
contactForm.addEventListener('submit',function(event){
    event.preventDefault();
    
    submitBtn.innerText = "Analyzing...";
    submitBtn.disabled = true; // Prevent double-clicks

    // Wait 2 seconds (2000 milliseconds) to simulate "work"
    setTimeout(() => {
        submitBtn.innerText = "Audit Requested Successfully!";
        submitBtn.style.backgroundColor = "#28a745"; // Success Green
        
        // Reset the form fields
        contactForm.reset();

        setTimeout(()=>{
            submitBtn.innerText =submitBtnDefaultText;
            submitBtn.style.backgroundColor = submitBtnDefaultColor; // Success Green
            submitBtn.disabled = false;
        }, 5000)
    }, 2000); 
});

console.log("System Initialized: Titan Security Script Loaded.");