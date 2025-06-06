const staticLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=diprima.ale@gmail.com&currency_code=EUR&amount=%amount%&item_name=%title%";

const experiences = {
    "Tokyo": {
        title: "Serata sushi a Tokyo",
        description: "Regala una cena tradizionale in un sushi bar storico di Shinjuku!",
        amount: "50"
    },
    "Kyoto": {
        title: "Cerimonia del tè a Kyoto",
        description: "Un momento zen in un'antica casa da tè con vista sul giardino giapponese.",
        amount: "100"
    },
    "Hiroshima": {
        title: "Museo della Pace a Hiroshima",
        description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
        amount: "200"
    },
    // "1": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "2": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "3": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "4": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "5": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "6": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "7": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
    // "sd": {
    //   title: "Museo della Pace a Hiroshima",
    //   description: "Un regalo che lascia il segno: visita e riflessione nel cuore della storia.",
    //   amount: "200"
    // },
};

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


/* #region Cart Sidebar Javascript */

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
        <a class="card-button" href="#" data-city="${city}" data-amount="${data.amount}">${data.amount} €</a>
      `;

    // Aggiungi event listener per il click
    const button = card.querySelector('.card-button');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        addToItinerary(city, data.title, data.amount);

        // Feedback visivo
        button.classList.toggle('selected');
        if (button.classList.contains('selected')) {
            button.innerHTML = `${data.amount} € ✓`;
        } else {
            button.innerHTML = `${data.amount} €`;
        }
    });

    // Highlight city dot on hover
    card.addEventListener("mouseenter", () => {
        const mapCity = document.querySelector(`.map-city[data-city="${city}"]`);
        if (mapCity) mapCity.classList.add("hovered");
    });

    card.addEventListener("mouseleave", () => {
        const mapCity = document.querySelector(`.map-city[data-city="${city}"]`);
        if (mapCity) mapCity.classList.remove("hovered");
    });

    // ... [mantieni gli altri event listener esistenti] ...
    container.appendChild(card);
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

/* #endregion Cart Sidebar Javascript */

document.querySelectorAll('.map-city').forEach(cityEl => {
    const cityName = cityEl.dataset.city;
    const labelSpan = cityEl.querySelector('.map-city__sign');

    if (labelSpan) {
        labelSpan.textContent = cityName;
    }
});