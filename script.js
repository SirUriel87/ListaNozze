// const staticLink = "https://paypal.me/diprimaale?country.x=IT&locale.x=it_IT";
// const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";
const staticLink = "https://www.paypal.com/myaccount/transfer/homepage/preview";
const isMobile = window.innerWidth <= 768;
const offsetCoefficient = (isMobile ? 80 : 130);
var messageSent = false;
const popupMaxHeight = 37; //vh
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

let tapTimer;
let isScrolling = false;



function vhToPixels(vh) {
    return (window.innerHeight * vh) / 100;
}



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
        position: [34.29907765261994, 132.32192327059997]
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
        position: [34.9608896547387, 134.75083395372909]
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
    return '<div style="max-height: '+ popupMaxHeight +'vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">'+
    '<h3 style="margin:0 0 8px 0;color:#008bf8">' + title + '</h3>'+
    '<img src="'+ image +'" class="popup-image" />'+
    '<p style="margin:4px 0;font-size:1.1em">'+ description +'</p></div>'
}





// #region map initialization

var neutralViewPos = [35.21305271629127, 136.41241296367983]
var neutralViewZoom = isMobile ? 5 : 7

var map = L.map('map')
.setView(neutralViewPos, neutralViewZoom)
.panInside(neutralViewPos, {paddingBottomRight: [0, 500]});

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c131d2ef446a4a6ebc6006e42787346f', {
    // maxZoom: 19,
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


function cardClick(button, city, card, data){
    // Animazione solo se stiamo aggiungendo (non rimuovendo)
    if (!selectedActivities.some(item => item.city === city)) {
        animateToCart(button);
    }

    addToItinerary(city, data.title, data.amount);

    // Feedback visivo
    button.classList.toggle('selected');
    card.classList.toggle('selected');

    // Piccolo timeout per garantire che l'animazione funzioni
    setTimeout(() => {
        button.classList.toggle('show-icon');
    }, 5);
}


// #region Loop di creazione delle cards
for (const city in experiences) {
    const data = experiences[city];

    // Initializza colore card
    let expColor = getColorByAmount(data.amount);

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

        cardClick(button, city, card, data);
    });
    

    button.addEventListener('touchstart', (e) => {
        tapTimer = setTimeout(() => {
            if (!isScrolling) {
                // Esegui l'azione solo se non c'è stato scroll
                e.preventDefault();

                cardClick(button, city, card, data);
            }
        }, 200); // Ritardo di 200ms
    }, {passive: true});

    button.addEventListener('touchmove', () => {
        isScrolling = true;
        clearTimeout(tapTimer);
    }, {passive: true});

    button.addEventListener('touchend', () => {
        clearTimeout(tapTimer);
        isScrolling = false;
    }, {passive: true});

    card.addEventListener("mouseenter", () => {
        if (!isDragging){
            map.closePopup();
            data.marker.openPopup();
            
            let fixedPos = [...data.position];
            // ottieni altezza del card container per ottimizzare la visualizzazione
            const containerHeight = document.querySelector('.cards-container').offsetHeight;
            const containerAndPopupHeight = containerHeight + vhToPixels(popupMaxHeight)
            let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const markerPopupOuterPadding = (viewportHeight - containerAndPopupHeight)/2;

            // Aggiungi offset verticale per migliore visualizzazione
            let offset = containerHeight - (viewportHeight / 2); //(viewportHeight * 5 / 100);
            offset = markerPopupOuterPadding / offsetCoefficient; // Dividi per un coefficiente in modo da trasformare i px in unita di misura della mappa
            fixedPos[0] = fixedPos[0] - offset;
            
            map.flyTo(fixedPos, 9, {
                animate: true, 
                duration: 1});
        }
        
    });

    

    // ... [mantieni gli altri event listener esistenti] ...
    container.appendChild(card);

    // Aggiungi marker sulla mappa per ogni experience
    const iconUrl = `img/marker_${data.amount}.png`;
    var myIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [45, 61],
        iconAnchor: [22.5, 61],
        popupAnchor: [0, -10]
    });
    
    data.marker = L.marker(data.position, { icon: myIcon }).addTo(map);
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

    // Aggiorna il badge
    updateCartBadge();
}


// funzione per aggiornare il badge
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = selectedActivities.length;
    
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
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
   BuildAndShowPaymentPopup();
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

// Correzione per lo scroll su iOS
function fixIOSScroll() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const welcomePage = document.getElementById('welcomePage');
        
        // Forza il ridimensionamento del contenuto
        welcomePage.style.height = '1px';
        welcomePage.style.height = window.innerHeight + 'px';
        
        // Abilita il scroll momentum su iOS
        welcomePage.style.webkitOverflowScrolling = 'touch';
        
        // Aggiungi un piccolo timeout per assicurarsi che le modifiche abbiano effetto
        setTimeout(() => {
            welcomePage.scrollTop = 1;
            welcomePage.scrollTop = 0;
        }, 100);
    }
}

// Chiama la funzione al caricamento e al ridimensionamento
window.addEventListener('load', fixIOSScroll);
window.addEventListener('resize', fixIOSScroll);

// Chiamala anche quando clicchi il bottone per assicurarti che funzioni
btnGo.addEventListener('click', fixIOSScroll);

// #endregion welcome page



// #region modal popup pagamento
function BuildAndShowPaymentPopup(){
    // if (selectedActivities.length === 0) return;

    const totalAmount = selectedActivities.reduce((sum, item) => sum + parseInt(item.amount), 0);
    
    // Aggiorna la lista esperienze
    const experiencesList = document.getElementById('experiences-list');
    const causaleInput = document.getElementById('causale-input');
    experiencesList.innerHTML = '';
    selectedActivities.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} (€${item.amount})`;
        experiencesList.appendChild(li);

        // Aggiungi l'esperienza anche alla causale
        causaleInput.value += item.title + ',';
    });
    
    // Togli virgola finale
    if (causaleInput.value.endsWith(',')){
        causaleInput.value = causaleInput.value.substring(0, causaleInput.value.length - 1);
    }

    // Rendi la causale lunga massimo 140 caratteri
    if (causaleInput.value.length > 140){
        causaleInput.value = causaleInput.value.substring(0, 137)
        causaleInput.value += "..."
    }

    // Mostra solo il primo step
    document.getElementById('message-step').style.display = 'block';
    document.getElementById('payment-step').style.display = 'none';
    document.querySelector('.modal-header h3').textContent = 'Grazie per il tuo regalo!';

    refreshSendButton();

    // Aggiorna il totale
    refreshTotalAmount(totalAmount);
    
    // Mostra il modal
    document.getElementById('payment-modal').style.display = 'block';
}


// funzione per aggiornare il totale
function refreshTotalAmount(tot){
    document.getElementById('modal-total').textContent = `€${tot}`;
    document.getElementById('paypal-total-amount').textContent = `€${tot}`;
    document.getElementById('bonifico-total-amount').textContent = `€${tot}`;
}


// Funzione per copiare IBAN
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.value ? element.value : element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visivo temporaneo
        const btn = element.nextElementSibling || element.parentElement.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Copiato!';
        setTimeout(() => {
            btn.innerHTML = '<i class="far fa-copy"></i> Copia';
        }, 2000);
    });
}

// Chiudi modal
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = 'none';
});

// Chiudi modal
document.getElementById('close-free-modal-btn').addEventListener('click', () => {
    document.getElementById('free-payment-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('payment-modal')) {
        document.getElementById('payment-modal').style.display = 'none';
    }
});

// Gestione invio form
document.getElementById('payment-confirmation-form')
.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = form.querySelector('.form-status');
    const guestName = document.getElementById('guest-name').value || "Anonimo";
    const message = document.getElementById('guest-message').value || "Nessun messaggio aggiuntivo";
    const selectedItems = selectedActivities.map(item => `${item.title} (€${item.amount})`).join('\n- ');
    const totalAmount = document.getElementById('modal-total').textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
        
        await emailjs.send("service_66f9j32", "template_fqq9f8a", {
            from_name: guestName,
            message: `Esperienze selezionate:\n- ${selectedItems}\n\nTotale: ${totalAmount}\n\nMessaggio: ${message}`,
        });
        
        showPaymentStep();
        
    } catch (error) {
        statusEl.className = 'form-status error';
        statusEl.innerHTML = 'Errore nell\'invio. Riprova più tardi.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Invia messaggio e procedi al pagamento';
    }
});

// // Aggiungi gestione del pulsante "Torna al messaggio"
// document.getElementById('btn-back-to-message').addEventListener('click', function() {
//     document.getElementById('payment-step').style.display = 'none';
//     document.getElementById('message-step').style.display = 'block';
//     document.querySelector('.modal-header h3').textContent = 'Grazie per il tuo regalo!';
// });


function showPaymentStep(){
    // Nascondi lo step del messaggio e mostra lo step di pagamento
    document.getElementById('message-step').style.display = 'none';
    document.getElementById('payment-step').style.display = 'block';
    
    // Aggiorna il titolo del modal
    document.querySelector('.modal-header h3').textContent = 'Completa il pagamento';
}


function refreshSendButton(){
    // Abilita il bottone se il messaggio non e' stato ancora inviato
    const sendBtn = document.getElementById('btnSendMessage');
    if (messageSent){
        sendBtn.style.visibility = 'hidden';
    }
    else{
        sendBtn.style.visibility = 'visible';
    }
    
}


// Gestione cambio metodo di pagamento
document.querySelectorAll('.payment-method').forEach(btn => {
    btn.addEventListener('click', function() {
        // Rimuovi active da tutti i bottoni
        document.querySelectorAll('.payment-method').forEach(b => {
            b.classList.remove('active');
        });
        
        // Aggiungi active al bottone cliccato
        this.classList.add('active');
        
        // Nascondi tutti i dettagli
        document.querySelectorAll('.payment-details').forEach(d => {
            d.style.display = 'none';
        });
        
        // Mostra solo i dettagli selezionati
        const method = this.dataset.method;
        document.getElementById(`${method}-details`).style.display = 'block';
    });
});

// Gestione click su PayPal
document.getElementById('paypal-button').addEventListener('click', function() {
    // Reindirizza a PayPal con i parametri necessari
    window.location.href = staticLink;
});

// Gestione click su PayPal
document.getElementById('free-paypal-button').addEventListener('click', function() {
    // Reindirizza a PayPal con i parametri necessari
    window.location.href = staticLink;
});

// #endregion modal popup pagamento


// #region animazione pallina del badge carrello

function animateToCart(startElement) {
    // Posizione iniziale (il bottone cliccato)
    const startRect = startElement.getBoundingClientRect();
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    
    // Posizione finale (il pulsante del carrello)
    const cartBtn = document.getElementById('toggle-cart');
    endRect = cartBtn.getBoundingClientRect();
    
    const endX = endRect.left + (endRect.width * 0.7);
    const endY = endRect.top + (endRect.height * 0.3);

    // Crea la pallina
    const ball = document.createElement('div');
    ball.className = 'flying-ball';
    ball.style.left = `${startX}px`;
    ball.style.top = `${startY}px`;
    ball.style.backgroundColor = startElement.style.backgroundColor;
    
    // Calcola la traiettoria arcuata
    const moveX = endX - startX;
    const moveY = endY - startY;
    ball.style.setProperty('--move-x', `${moveX * 0.6}px`);
    ball.style.setProperty('--move-y', `${moveY * 0.6 - 50}px`);
    ball.style.setProperty('--end-x', `${moveX}px`);
    ball.style.setProperty('--end-y', `${moveY}px`);
    
    // Aggiungi al documento
    document.body.appendChild(ball);
    
    ball.addEventListener('animationend', () => {
        ball.remove();
        // Effetto di rimbalzo sul carrello
        cartBtn.classList.add('bounce');
        setTimeout(() => cartBtn.classList.remove('bounce'), 300);
    });
}

// #endregion animazione pallina del badge carrello






// #region Gestione dell'altezza su mobile
function adjustMobileHeight() {
    if (isMobile) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        const container = document.querySelector('.container');
        container.style.height = window.innerHeight + 'px';
    }
}

window.addEventListener('load', adjustMobileHeight);
window.addEventListener('resize', adjustMobileHeight);
window.addEventListener('orientationchange', adjustMobileHeight);

// #endregion Gestione dell'altezza su mobile



function getColorByAmount(amount) {
    if (amount <= 10) return "var(--tenColor)";
    else if (amount <= 20) return "var(--twentyColor)";
    else if (amount <= 50) return "var(--fiftyColor)";
    else if (amount <= 100) return "var(--onehunColor)";
    else if (amount <= 200) return "var(--twohunColor)";
    else if (amount <= 300) return "var(--threehunColor)";
    else if (amount <= 500) return "var(--fivehunColor)";
    else return "var(--highlightActiveColor)";
}




if (isIOS) {
    const welcomeContent = document.querySelector('.welcome-content');
    welcomeContent.style.padding = "14rem 20px";
}



// Gestore per il link di pagamento diretto nella welcome page
document.getElementById('direct-payment-link')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    // // Nascondi la welcome page
    // document.getElementById('welcomePage').classList.add('hidden');
    // setTimeout(() => {
    //     document.getElementById('welcomePage').style.display = 'none';
    // }, 500);
    

    // Apri direttamente il modal di pagamento
    setTimeout(() => {
        // Crea un array vuoto per simulare nessuna esperienza selezionata
        selectedActivities.length = 0;
        // Mostra il modal
        document.getElementById('free-payment-modal').style.display = 'block';
    }, 600);
});