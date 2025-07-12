const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";
const isMobile = window.innerWidth <= 768

const experiences = {
    "Ueno-Swans": {
        title: "Cigni a Ueno",
        description: "Una romantica ed imbarazzante nuotata nel parco di Ueno (Tokyo). Ci si guadagna in amore ma si perde in dignità",
        amount: "150",
        image: "img/swanboat-ueno.jpg",
        city: "Ueno",
        position: [35.71174727274224, 139.7706110044339]
    },
    "Hiroshima-Memorial": {
        title: "Museo della Pace a Hiroshima",
        description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
        amount: "200",
        image: "img/hiroshima-memorial.jpg",
        city: "Hiroshima",
        position: [34.39300096391687, 132.4522870279658]
    },
    "Akihabara-AtHome": {
        title: "Colazione/Merenda At Home Cafe",
        description: 'Colazione o merenda in un maid cafe, costretti a ballare e cantare motivetti stupidi pur di mangiare qualcosa...che ci piaccia o no.',
        amount: "50",
        image: "img/At-home_cafe.jpg",
        city: "Akihabara",
        position: [35.7008900593421, 139.7718236314047]
    },
    "Fukusaki-Yokai": {
        title: "Tour Yokai in bici",
        description: 'Tour in bici per la cittadina di Fukusaki dove in ogni angolo si nascondono yokai e mostri giapponesi. Vediamo se riusciamo a trovarli tutti.',
        amount: "75",
        image: "img/fukusaki-yokai.jpg",
        city: "Fukusaki",
        position: [34.95413939702594, 134.75666483282498]
    },
};



function BuildPopupContent(title, image, description){
    return '<div style="max-height: 30vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">'+
    '<h4 style="margin:0 0 8px 0;color:#008bf8">' + title + '</h4>'+
    '<img src="'+ image +'" class="popup-image" />'+
    '<p style="margin:4px 0;font-size:0.9em">'+ description +'</p></div>'
}





// #region map initialization

var neutralViewPos = [35.21305271629127, 136.41241296367983]
var neutralViewZoom = isMobile ? 5 : 7

var map = L.map('map', {zoomControl: false})
.setView(neutralViewPos, neutralViewZoom)
.panInside(neutralViewPos, {paddingBottomRight: [0, 500]});

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c131d2ef446a4a6ebc6006e42787346f', {
    maxZoom: 19,
    minZoom: neutralViewZoom,
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
        if (!isDragging){
            map.closePopup();
            data.marker.openPopup();
            
            let fixedPos = [...data.position];
            if (isMobile){
                // Aggiungi offset verticale per migliore visualizzazione su smartphone
                fixedPos[0] = fixedPos[0] - 0.10;
            }
            
            map.flyTo(fixedPos, 9, {
                animate: true, 
                duration: 1});
        }
        
    });

    

    // ... [mantieni gli altri event listener esistenti] ...
    container.appendChild(card);

    // Aggiungi marker sulla mappa per ogni experience
    data.marker = L.marker(data.position).addTo(map);
    data.marker.bindPopup(BuildPopupContent(data.title, data.image, data.description))
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