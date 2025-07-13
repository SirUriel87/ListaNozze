const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";
const isMobile = window.innerWidth <= 768;
const offsetCoefficient = (isMobile ? 300 : 400);

const experiences = [
    {
        title: "Merenda At Home Cafe",
        description: 'Colazione o merenda in un maid cafe, costretti a ballare e cantare motivetti stupidi pur di mangiare qualcosa...che ci piaccia o no.',
        amount: 20,
        image: "img/At-home_cafe.jpg",
        city: "Akihabara",
        position: [35.69964414574883, 139.77046106942902]
    },
     {
        title: "Cigni a Ueno",
        description: "Una romantica ed imbarazzante pedalata su delle barchette a forma di cigno nel parco di Ueno. Ci si guadagna in amore ma si perde in dignità",
        amount: 10,
        image: "img/swanboat-ueno.jpg",
        city: "Ueno",
        position: [35.71199849138613, 139.77191305357505]
    },
     {
        title: "Treno Tokyo-Hiroshima",
        description: "Viaggio nel famoso treno proiettile, partenza Tokyo destinazione Hiroshima...ci vorrà un pò",
        amount: 200,
        image: "img/shinkansen-tokyo-hiroshima.jpg",
        city: "Hiroshima",
        position: [35.12499575494723, 138.48630358663596]
    },
     {
        title: "Okonomiyaki a Osaka",
        description: 'Non spaventatevi per il titolo, andiamo solo a provare la famosa Okonomiyaki (tipo una frittata) di Hiroshima.',
        amount: 20,
        image: "img/okonomimura.jpg",
        city: "Hiroshima",
        position: [34.39155812061836, 132.4618584820796]
    },
     {
        title: "Traghetto per Miyajima",
        description: 'Traghetto per raggiungere Miyajima dove potremo ammirare il famoso Torii (portale) immerso nell\'acqua.',
        amount: 20,
        image: "img/traghetto-hiroshima-miyajima.jpg",
        city: "Miyajima",
        position: [34.302495052637944, 132.32239497358432]
    },
     {
        title: "Pranzo con Rilakkuma",
        description: 'Offriteci un pranzo nel ristorante di una famosa mascotte giapponese che Sara adora... probabilmente impazzirà',
        amount: 50,
        image: "img/rilakkuma-sabo.jpg",
        city: "Miyajima",
        position: [34.30940248285368, 132.31291859843256]
    },
     {
        title: "Treno Hiroshima-Himeji",
        description: 'Ci spostiamo di nuovo con il treno proiettile verso Himeji, la città del famoso castello dell\'airone bianco',
        amount: 100,
        image: "img/shinkansen-hiroshima-himeji.jpg",
        city: "Himeji",
        position: [34.71342851918433, 134.14739062554887]
    },
     {
        title: "Castello di Himeji",
        description: 'Visita al castello di Himeji, patrimonio dell\'UNESCO',
        amount: 10,
        image: "img/himeji-castle.jpg",
        city: "Himeji",
        position: [34.83951941878888, 134.69389396859842]
    },
     {
        title: "Tour Yokai in bici",
        description: 'Tour in bici per la cittadina di Fukusaki dove in ogni angolo si nascondono yokai e mostri giapponesi. Vediamo se riusciamo a trovarli tutti.',
        amount: 10,
        image: "img/fukusaki-yokai.jpg",
        city: "Fukusaki",
        position: [34.95413939702594, 134.75666483282498]
    },
     {
        title: "Soggiorno a Nipponia",
        description: 'Vitto, alloggio e terme in un albergo tradizionale nella piccola cittadina di Fukusaki. Con tanto di vasca termale compresa nella stanza <3',
        amount: 300,
        image: "img/nipponia.jpg",
        city: "Fukusaki",
        position: [34.9562003379001, 134.76425975510884]
    },
    {
        title: "Treno Himeji-Osaka",
        description: 'Prendiamo nuovamente lo Shinkansen per spostarci verso Osaka',
        amount: 50,
        image: "img/shinkansen-himeji-osaka.jpg",
        city: "Osaka",
        position: [34.683196529454314, 134.9839594949819]
    },
    {
        title: "La Cheesecake di Rikuro",
        description: 'Mangiamo le buonissime e sofficissime cheesecake di Rikuro, a Osaka',
        amount: 10,
        image: "img/rikuro-cheesecake.jpg",
        city: "Osaka",
        position: [34.673777890251785, 135.50137367488838]
    },
    {
        title: "Castello di Osaka",
        description: 'Altra città altra visita a un castello, a questo giro è il turno di Osaka',
        amount: 20,
        image: "img/osaka-castle.jpg",
        city: "Osaka",
        position: [34.68738195602505, 135.52582914903797]
    },
    {
        title: "Ruota Panoramica",
        description: 'Giro sulla ruota panoramica intorno all\'insegna del Don Quijote, un famosissimo negozio di souvenir. Sara si cacherà addosso?',
        amount: 10,
        image: "img/mega-don-qui.jpg",
        city: "Osaka",
        position: [34.674867379755085, 135.5018279225278]
    },
    {
        title: "Pink Kawaii Cafe",
        description: 'Facciamo merenda in questo sobrissimo cafè, dove una nostra foto può venire stampata su una bibita. Ad Ale stanno già sanguinando gli occhi',
        amount: 20,
        image: "img/pink-kawaii-cafe.jpg",
        city: "Osaka",
        position: [34.66948735111569, 135.50203195274165]
    },
    {
        title: "Treno Osaka-Kyoto",
        description: 'Viaggio direzione Kyoto con lo Shinkansen',
        amount: 50,
        image: "img/shinkansen-osaka-kyoto.jpg",
        city: "Kyoto",
        position: [34.88137728200263, 135.71082583473853]
    },
    {
        title: "Katsuoji e Minoh Park",
        description: 'Gita, comprensiva di treni e biglietti d\'ingresso, al Katsuoji (tempio delle bambole Daruma) e al Minoh Park (parco nazionale di Minoh)',
        amount: 50,
        image: "img/katsuoji-minoh-park.jpg",
        city: "Osaka",
        position: [34.86578397580111, 135.4909689797329]
    },
    
];

experiences.sort((x,y) => (x.amount - y.amount));

function BuildPopupContent(title, image, description){
    return '<div style="max-height: 37vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">'+
    '<h3 style="margin:0 0 8px 0;color:#008bf8">' + title + '</h3>'+
    '<img src="'+ image +'" class="popup-image" />'+
    '<p style="margin:4px 0;font-size:1.1em">'+ description +'</p></div>'
}





// #region map initialization

var neutralViewPos = [35.21305271629127, 136.41241296367983]
var neutralViewZoom = isMobile ? 5 : 7

var map = L.map('map', {zoomControl: false, attributionControl: false})
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
let startY = 0;
let startScrollTop = 0;
let currentY = 0;
let rafId = null;

function updateScroll() {
    const deltaY = currentY - startY;
    slider.scrollTop = startScrollTop - deltaY;
    rafId = requestAnimationFrame(updateScroll);
}

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    slider.classList.add('active');
    startY = e.clientY;
    startScrollTop = slider.scrollTop;
    currentY = e.clientY;
    rafId = requestAnimationFrame(updateScroll);
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
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

// #region Loop di creazione delle cards
for (const city in experiences) {
    const data = experiences[city];
    const url = staticLink.replace("%amount%", data.amount).replace("%title%", encodeURIComponent(data.title));


    // Initializza colore card
    let expColor = ""
    if (data.amount <= 10){
        expColor = "var(--tenColor)"
    }
    else if(data.amount <= 20){
        expColor = "var(--twentyColor)"
    }
    else if(data.amount <= 50){
        expColor = "var(--fiftyColor)"
    }
    else if(data.amount <= 100){
        expColor = "var(--onehunColor)"
    }
    else if(data.amount <= 200){
        expColor = "var(--twohunColor)"
    }
    else if(data.amount <= 300){
        expColor = "var(--threehunColor)"
    }
    else if(data.amount <= 500){
        expColor = "var(--fivehunColor)"
    }

    const card = document.createElement("div");
    card.className = "card";
    card.style.borderColor = expColor;
    card.innerHTML = `
        <div class="card-details">
          <div class="text-title">${data.title}</div>
          <img src="${data.image}" class="card-image" />
          <div class="mobile-details">Dettagli...</div>
        </div>
        <a class="card-button" style="background-color: ${expColor}" href="#" data-city="${data.city}" data-amount="${data.amount}">${data.amount} €</a>
      `;

    // Aggiungi event listener per il click
    const button = card.querySelector('.card-button');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToItinerary(city, data.title, data.amount);

        // Feedback visivo
        button.classList.toggle('selected');
        card.classList.toggle('selected');

        // Piccolo timeout per garantire che l'animazione funzioni
        setTimeout(() => {
            button.classList.toggle('show-icon');
        }, 5);

    });

    card.addEventListener("mouseenter", () => {
        if (!isDragging){
            map.closePopup();
            data.marker.openPopup();
            
            let fixedPos = [...data.position];
            // Aggiungi offset verticale per migliore visualizzazione
            let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            let offset = (viewportHeight * 5 / 100);
            offset = offset / offsetCoefficient; // Dividi per un coefficiente in modo da trasformare i px in unita di misura della mappa
            fixedPos[0] = fixedPos[0] - offset;
            
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

// #endregion Loop di creazione delle cards


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



// #region welcome page
const btnGo = document.getElementById('btnGo');

btnGo.addEventListener("click", () => {
    document.getElementById('welcomePage').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('welcomePage').style.display = 'none';
    }, 500); // Match con la durata della transizione

})

// #endregion welcome page