const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";

const experiences = {
    "Tokyo": {
        title: "Serata sushi a Tokyo",
        description: "Regala una cena tradizionale in un sushi bar storico di Shinjuku!",
        amount: "50",
        city: "Tokyo",
        position: [35.67911376451128, 139.67184740774755]
    },
    "Kyoto": {
        title: "Cerimonia del tè a Kyoto",
        description: "Un momento zen in un'antica casa da tè con vista sul giardino giapponese.",
        amount: "100",
        city: "Kyoto",
        position: [34.86791645980951, 135.81773554778758]
    },
    "Hiroshima": {
        title: "Museo della Pace a Hiroshima",
        description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
        amount: "200",
        city: "Hiroshima",
        position: [34.384768176738234, 132.46044279477556]
    },
    // "1": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia. bla bla bla bla blala bla bla bla blala bla bla bla blala bla bla bla bla",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "2": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "3": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "4": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "5": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "6": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "7": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
    // "sd": {
    //     title: "Museo della Pace a Hiroshima",
    //     description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //     amount: "200",
    //     city: "Hiroshima"
    // },
};







// #region map initialization

var neutralViewPos = [35.21305271629127, 136.41241296367983]
var neutralViewZoom = 7

var map = L.map('map').setView(neutralViewPos, neutralViewZoom);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c131d2ef446a4a6ebc6006e42787346f', {
    maxZoom: 19,
    minZoom: 7,
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


// #endregion map initialization

const container = document.getElementById("cards-container");




//#region scrolling javascript
const slider = document.querySelector('.cards-container');

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;
let currentX = 0;
let rafId = null;

function updateScroll() {
    const deltaX = currentX - startX;
    slider.scrollLeft = startScrollLeft - deltaX;
    rafId = requestAnimationFrame(updateScroll);
}

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    slider.classList.add('active');
    startX = e.clientX;
    startScrollLeft = slider.scrollLeft;
    currentX = e.clientX;
    rafId = requestAnimationFrame(updateScroll);
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('active');
    cancelAnimationFrame(rafId);
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('active');
    cancelAnimationFrame(rafId);
});
//#endregion scrolling javascript



const selectedActivities = [];
const totalAmountElement = document.getElementById('total-amount');
const selectedActivitiesContainer = document.getElementById('selected-activities');
const checkoutBtn = document.getElementById('checkout-btn');

// Modifica il loop di creazione delle cards per aggiungere il click handler
for (const city in experiences) {
    const data = experiences[city];
    const url = staticLink.replace("%amount%", data.amount).replace("%title%", encodeURIComponent(data.title));

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-details">
          <div class="text-title">${data.title}</div>
          <div class="text-body">${data.description}</div>
        </div>
        <a class="card-button" href="#" data-city="${data.city}" data-amount="${data.amount}">${data.amount} €</a>
      `;

    // Aggiungi event listener per il click
    const button = card.querySelector('.card-button');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToItinerary(city, data.title, data.amount);

        // Feedback visivo
        button.classList.toggle('selected');

    });

    card.addEventListener("mouseenter", () => {
        data.marker.openPopup();
        map.setView(data.position, 9, {animate: true});
    });

    
    card.addEventListener("mouseleave", () => {
        data.marker.closePopup();
    });

    // ... [mantieni gli altri event listener esistenti] ...
    container.appendChild(card);

    // Aggiungi marker sulla mappa per ogni experience
    data.marker = L.marker(data.position).addTo(map);
    data.marker.bindPopup(data.title)
}

function addToItinerary(city, title, amount) {
    // Controlla se l'attività è già stata aggiunta
    const existingIndex = selectedActivities.findIndex(item => item.city === city);

    if (existingIndex >= 0) {
        // Rimuovi se già presente
        selectedActivities.splice(existingIndex, 1);
    } else {
        // Aggiungi nuova attività
        selectedActivities.push({ city, title, amount });
    }

    updateSidebar();
}




function updateSidebar() {
    selectedActivitiesContainer.innerHTML = '';
    let total = 0;

    selectedActivities.forEach((activity, index) => {
        total += parseInt(activity.amount);

        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
          <div class="activity-info">
            <span>${activity.title}</span>
            <span>€${activity.amount}</span>
          </div>
          <button class="delete-btn" data-index="${index}">✕</button>
        `;
        selectedActivitiesContainer.appendChild(activityElement);
    });

    // Aggiungi event listener ai pulsanti di eliminazione
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeActivity(index);
        });
    });

    totalAmountElement.textContent = total;
    checkoutBtn.style.display = selectedActivities.length ? 'block' : 'none';
}

function removeActivity(index) {
    selectedActivities.splice(index, 1);
    updateSidebar();

    // Aggiorna anche lo stato del bottone nella card corrispondente
    updateCardButtons();
}

function updateCardButtons() {
    document.querySelectorAll('.card-button').forEach(btn => {
        const city = btn.getAttribute('data-city');
        const isSelected = selectedActivities.some(item => item.city === city);

        if (isSelected) {
            btn.classList.add('selected');
            btn.innerHTML = `${btn.getAttribute('data-amount')} € ✓`;
        } else {
            btn.classList.remove('selected');
            btn.innerHTML = `${btn.getAttribute('data-amount')} €`;
        }
    });
}



// Checkout handler
checkoutBtn.addEventListener('click', () => {
    if (selectedActivities.length === 0) return;

    const totalAmount = selectedActivities.reduce((sum, item) => sum + parseInt(item.amount), 0);
    const itemsList = selectedActivities.map(item => item.title).join(', ');

    const checkoutUrl = staticLink
        .replace("%amount%", totalAmount)
        .replace("%title%", encodeURIComponent(`Itinerario: ${itemsList}`));

    window.open(checkoutUrl, '_blank');
});





const toggleBtn = document.getElementById("toggle-cart");
const sidebar = document.querySelector(".sidebar");

// Apri/chiudi sidebar su click bottone
toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


