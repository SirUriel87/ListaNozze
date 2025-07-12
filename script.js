const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";
const isMobile = window.innerWidth <= 768

const experiences = {
    "Akihabara-AtHome": {
        title: "Colazione/Merenda At Home Cafe",
        description: 'Colazione o merenda in un maid cafe, costretti a ballare e cantare motivetti stupidi pur di mangiare qualcosa...che ci piaccia o no.',
        amount: "20",
        image: "img/At-home_cafe.jpg",
        city: "Akihabara",
        position: [35.69964414574883, 139.77046106942902]
    },
    "Ueno-Swans": {
        title: "Cigni a Ueno",
        description: "Una romantica ed imbarazzante nuotata nel parco di Ueno (Tokyo). Ci si guadagna in amore ma si perde in dignità",
        amount: "10",
        image: "img/swanboat-ueno.jpg",
        city: "Ueno",
        position: [35.71199849138613, 139.77191305357505]
    },
    "shinkansen-tokyo-hiroshima": {
        title: "Shinkansen Tokyo-Hiroshima",
        description: "Viaggio nel famoso treno proiettile, partenza Tokyo destinazione Hiroshima...ci vorrà un pò",
        amount: "200",
        image: "img/shinkansen-tokyo-hiroshima.jpg",
        city: "Hiroshima",
        position: [35.12499575494723, 138.48630358663596]
    },
    "okonomimura": {
        title: "Okonomiyaki a Okonomimura",
        description: 'Non spaventatevi per il titolo, andiamo solo a provare la famosa Okonomiyaki (tipo una frittata) di Hiroshima.',
        amount: "20",
        image: "img/okonomimura.jpg",
        city: "Hiroshima",
        position: [34.39155812061836, 132.4618584820796]
    },
    "traghetto-hiroshima-miyajima": {
        title: "Traghetto per l'isola di Miyajima",
        description: 'Traghetto per raggiungere Miyajima dove potremo ammirare il famoso Torii (portale) immerso nell\'acqua.',
        amount: "20",
        image: "img/traghetto-hiroshima-miyajima.jpg",
        city: "Miyajima",
        position: [34.302495052637944, 132.32239497358432]
    },
    "rilakkuma-sanbo": {
        title: "Pranzo al Rilakkuma Sabo",
        description: 'Offriteci un pranzo nel ristorante di una famosa mascotte giapponese che Sara adora... probabilmente impazzirà',
        amount: "50",
        image: "img/rilakkuma-sabo.jpg",
        city: "Miyajima",
        position: [34.30940248285368, 132.31291859843256]
    },
    "shinkansen-hiroshima-himeji": {
        title: "Shinkansen Hiroshima-Himeji",
        description: 'Ci spostiamo di nuovo con il treno proiettile verso Himeji, la città del famoso castello dell\'airone bianco',
        amount: "100",
        image: "img/shinkansen-hiroshima-himeji.jpg",
        city: "Himeji",
        position: [34.71342851918433, 134.14739062554887]
    },
    "himeji-castle": {
        title: "Castello di Himeji",
        description: 'Visita al castello di Himeji, patrimonio dell\'UNESCO',
        amount: "10",
        image: "img/himeji-castle.jpg",
        city: "Himeji",
        position: [34.83951941878888, 134.69389396859842]
    },
    "Fukusaki-Yokai": {
        title: "Tour Yokai in bici",
        description: 'Tour in bici per la cittadina di Fukusaki dove in ogni angolo si nascondono yokai e mostri giapponesi. Vediamo se riusciamo a trovarli tutti.',
        amount: "10",
        image: "img/fukusaki-yokai.jpg",
        city: "Fukusaki",
        position: [34.95413939702594, 134.75666483282498]
    },
    "nipponia": {
        title: "Soggiorno a Nipponia",
        description: 'Vitto, alloggio e terme in un albergo tradizionale nella piccola cittadina di Fukusaki. Con tanto di vasca termale compresa nella stanza <3',
        amount: "300",
        image: "img/nipponia.jpg",
        city: "Fukusaki",
        position: [34.9562003379001, 134.76425975510884]
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