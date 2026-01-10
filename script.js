const servicesData = [
    {
        title: "Penetration Testing",
        desc: "Simulated cyberattacks to find vulnerabilities before the bad guys do."
    },
    {
        title: "Vulnerability Assessment",
        desc: "Comprehensive scans of your entire network infrastructure."
    },
    {
        title: "Sanity Testing",
        desc: "Ensuring your security patches don't break your existing system flow."
    }
];
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
renderSearch();
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