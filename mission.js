let missions = [
  {
    "image": "Apollo.webp",
    "name": "Apollo",
    "year": 1969,
    "agency": "NASA",
    "type": "historique",
    "objectif": "Poser le premier homme sur la Lune."
  },
  {
    "image": "Voyager.jpg",
    "name": "Voyager",
    "year": 1977,
    "agency": "NASA",
    "type": "historique",
    "objectif": "Explorer les planètes extérieures du système solaire."
  },
  {
    "image": "Hubble Telescope.webp",
    "name": "Hubble Space Telescope",
    "year": 1990,
    "agency": "NASA",
    "type": "actuiel",
    "objectif": "Observer les premières galaxies formées  le Big Bang."
  },
  {
    "image": "james Web.png",
    "name": "James Webb Space",
    "year": 2021,
    "agency": "NASA-ESA-CSA",
    "type": "actuiel",
    "objectif": "Observer les premières galaxies formées le Big Bang."
  },
  {
    "image": "Persererance.jpg",
    "name": "Perseverance",
    "year": 2021,
    "agency": "NASA",
    "type": "actuiel",
    "objectif": "Explorer Mars pour chercher des traces de vie ancienne."
  },
  {
    "image": "parker-solar-probe.jpeg",
    "name": "Parker Solar Probe",
    "year": 2018,
    "agency": "NASA",
    "type": "actuiel",
    "objectif": "Étudier le Soleil de plus près que jamais."
  },
  {
    "image": "Artemis.jpg",
    "name": "Artemis Program",
    "year": 2025,
    "agency": "NASA-ESA-JAXA-CSA",
    "type": "future",
    "objectif": "Renvoyer des astronautes sur la Lune et y établir une base durable."
  },
  {
    "image": "habitas.webp",
    "name": "Mars Sample Return",
    "year": 2025,
    "agency": "NASA-ESA",
    "type": "future",
    "objectif": "Ramener sur Terre les échantillons collectés par Perseverance."
  },
  {
    "image": "LUVOIR Telescope.jpg",
    "name": "LUVOIR Telescope",
    "year": 2035,
    "agency": "NASA",
    "type": "future",
    "objectif": "Explorer les exoplanètes et étudier la formation des galaxies, des étoiles et des systèmes planétaires à travers l’Univers."
  }
];


// afficher les missions
const favorites = [];

function displayMissions(missionsToDisplay) {
  const container = document.getElementById('missionsGrid');
  container.innerHTML = '';

 missionsToDisplay.forEach((mission, idx) => {
  const div = document.createElement('div');
  div.className = 'cell mission';

  div.innerHTML = `
    <div style="background-image:url('images/${mission.image}'); height:200px; background-size:cover; background-position:center; position:relative;">
      
     
      
      <button class="delete-icon" onclick="deleteMission('${mission.name}')">×</button>
      
      <!-- أيقونة favoris -->
      <div class="favorite-icon" 
           data-name="${escapeHtml(mission.name)}"
           data-agency="${escapeHtml(mission.agency)}"
           data-year="${mission.year}"
           onclick="toggleFavorite(this)" 
           style="position:absolute;width :50% ;top:10px; right:10px; font-size:28px; cursor:pointer;">
        &#9733;
      </div>
    </div>

    <div class="Missions-descrption2">
      <h3 class="mission-name">${escapeHtml(mission.name)}</h3>
      <ul>
        <li class="mission-agency"><strong>Agence:</strong> ${escapeHtml(mission.agency)}</li>
        <li class="mission-year"><strong>Année:</strong> ${mission.year}</li>
        <li><strong>Type:</strong> ${escapeHtml(mission.type)}</li>
        <li><strong>Objectif:</strong> ${escapeHtml(mission.objectif)}</li>
      </ul>
      <button onclick="editMission(${idx})">✏️ Modifier</button>
    </div>
  `;
  container.appendChild(div);
});



  applySavedFavoritesToIcons();


  
}

const closeFavoritesBtn = document.getElementById('closeFavorites');
closeFavoritesBtn.addEventListener('click', () => {
  favoritesPanel.style.display = 'none';
});


function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


function toggleFavorite(iconEl) {
  const name = iconEl.dataset.name;
  const agency = iconEl.dataset.agency;
  const year = iconEl.dataset.year;


  const missionData = missions.find(m => m.name === name);
  const image = missionData ? missionData.image : '';

  iconEl.classList.toggle('active');

  if (iconEl.classList.contains('active')) {
    if (!favorites.find(f => f.name === name)) {
      favorites.push({ name, agency, year, image }); 
    }
  } else {
    const i = favorites.findIndex(f => f.name === name);
    if (i !== -1) favorites.splice(i, 1);
  }

  saveFavorites();
  renderFavoritesForm();
}



function renderFavoritesForm() {
  const form = document.getElementById('favoris-list');
  form.innerHTML = ''; 
  favorites.forEach(f => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '0';
    card.style.margin = '6px';
    card.style.overflow = 'hidden';
    card.style.border = '4px solid black';
    card.style.borderRadius = '10px';
    
    

    card.innerHTML = `
      <div style="background-image:url('images/${f.image}'); height:150px; background-size:cover; background-position:center;"></div>
      <div style="padding:8px; color :black;">
        <strong style="color : ">${escapeHtml(f.name)}</strong><br>
        <small>${escapeHtml(f.agency)} — ${escapeHtml(f.year)}</small><br>
        <button type="button" onclick="removeFavorite('${escapeAttr(f.name)}')" 
         style="cursor:pointer;margin-top:5px;padding:6px 8px;border-radius:6px;border:1px solid #ccc;background:black;color:white;">
          Remove
        </button>
      </div>
    `;
    form.appendChild(card);
  });
}


function removeFavorite(name) {
  const idx = favorites.findIndex(f => f.name === name);
  if (idx !== -1) favorites.splice(idx, 1);


  document.querySelectorAll('.favorite-icon').forEach(ic => {
    if (ic.dataset.name === name) ic.classList.remove('active');
  });

  saveFavorites();
  renderFavoritesForm();
}

function clearAllFavorites() {
  favorites.length = 0;
  document.querySelectorAll('.favorite-icon').forEach(ic => ic.classList.remove('active'));
  saveFavorites();
  renderFavoritesForm();
}

// localStorage
function saveFavorites() {
  localStorage.setItem('space_favorites', JSON.stringify(favorites));
}
function loadFavorites() {
  const saved = JSON.parse(localStorage.getItem('space_favorites') || '[]');
  if (Array.isArray(saved) && saved.length) {
    saved.forEach(s => { if (!favorites.find(f => f.name === s.name)) favorites.push(s); });
  }
}


function applySavedFavoritesToIcons() {
  if (favorites.length === 0) return;
  document.querySelectorAll('.favorite-icon').forEach(ic => {
    if (favorites.find(f => f.name === ic.dataset.name)) {
      ic.classList.add('active');
    } else {
      ic.classList.remove('active');
    }
  });
}


function escapeAttr(s) {
  return String(s).replace(/'/g, "\\'");
}

// --- initialisation ---
loadFavorites();
displayMissions(missions); 
renderFavoritesForm(); 

const headerStar = document.querySelector('.icon img'); 
const favoritesPanel = document.getElementById('favoritesPanel'); 

headerStar.addEventListener('click', () => { 
  if (favoritesPanel.style.display === 'none') {
    favoritesPanel.style.display = 'block'; 
  } else { 
    favoritesPanel.style.display = 'none'; 
  }
});



// filtrage dynamique a
function filterMissions() {
  const agency = document.getElementById('ParAgence').value;
  const year = document.getElementById('ParDate').value;
  const type = document.getElementById('ParType').value;
  const searchText = document.querySelector('.recherche input').value.toLowerCase();

   const filtered = missions.filter(mission => {
    return (agency === '' || mission.agency === agency) &&
           (year === '' || mission.year == year) &&
           (type === '' || mission.type === type) &&
           (
             mission.name.toLowerCase().includes(searchText) ||
             mission.agency.toLowerCase().includes(searchText) ||
             mission.type.toLowerCase().includes(searchText) ||
             mission.objectif.toLowerCase().includes(searchText) ||
             mission.year.toString().includes(searchText)
           );
  });

  displayMissions(filtered);
}




document.getElementById('ParAgence').addEventListener('change', filterMissions);
document.getElementById('ParDate').addEventListener('change', filterMissions);
document.getElementById('ParType').addEventListener('change', filterMissions);
document.querySelector('.recherche input').addEventListener('input', filterMissions);

displayMissions(missions);




// --- Formulaire ---
const form = document.getElementById('missionForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const idx = document.getElementById('missionIndex').value;
  const newMission = {
    name: document.getElementById('missionName').value,
    year: parseInt(document.getElementById('missionYear').value),
    agency: document.getElementById('missionAgency').value,
    type: document.getElementById('missionType').value,
    objectif: document.getElementById('missionObjectif').value,
    image: document.getElementById('missionImage').value
  };

  if (idx === '') {
    // Ajouter
    missions.push(newMission);
  } else {
    // Modifier
    missions[idx] = newMission;
  
  }
  alert(idx === '' ? "✅ Mission ajoutée avec succès !" : "✏️ Mission modifiée avec succès !");

  form.reset();
  document.getElementById('missionIndex').value = '';
  displayMissions(missions);
});
function editMission(index) {
  const m = missions[index];
  document.getElementById('missionIndex').value = index;
  document.getElementById('missionName').value = m.name;
  document.getElementById('missionYear').value = m.year;
  document.getElementById('missionAgency').value = m.agency;
  document.getElementById('missionType').value = m.type;
  document.getElementById('missionObjectif').value = m.objectif;
  document.getElementById('missionImage').value = m.image;

  
  missionForm.style.display = 'flex';
   missionForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
}



  const addHeaderBtn = document.querySelector('.ajouter button'); 
const missionForm = document.getElementById('missionForm');
const cancelBtn = document.getElementById('cancelAdd');

if (addHeaderBtn) {
  addHeaderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    document.getElementById('missionIndex').value = '';
    missionForm.reset();
    missionForm.style.display = 'flex'; 
    
    const firstInput = document.getElementById('missionName');
    if (firstInput) firstInput.focus();
    
    missionForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}


if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    missionForm.style.display = 'none';
  });
}


function deleteMission(name) {
  const index = missions.findIndex(m => m.name === name);
  if (index !== -1 && confirm("Voulez-vous vraiment supprimer cette mission ?")) {
    missions.splice(index, 1);
    displayMissions(missions);
  }
}




