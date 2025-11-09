// ===== GLOBAL STATE =====
let allVehicles = [];
let filteredVehicles = [];
let displayedCount = 12; // Number of vehicles to show initially
const LOAD_MORE_COUNT = 12; // Number to load each time

// ===== DOM ELEMENTS =====
const vehiclesGrid = document.getElementById('vehiclesGrid');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const fuelFilter = document.getElementById('fuelFilter');
const transmissionFilter = document.getElementById('transmissionFilter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const filterBtn = document.getElementById('filterBtn');
const resetBtn = document.getElementById('resetBtn');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// ===== INIT APP =====
document.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
    initEventListeners();
    initScrollToTop();
    animateStats();
});

// ===== LOAD VEHICLES FROM JSON =====
async function loadVehicles() {
    try {
        const response = await fetch('data/dummy_ads.json');
        if (!response.ok) throw new Error('Failed to load vehicle data');

        allVehicles = await response.json();
        filteredVehicles = [...allVehicles];

        populateBrandFilter();
        renderVehicles();
        updateResultsCount();
    } catch (error) {
        console.error('Error loading vehicles:', error);
        vehiclesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                <h3>Erreur de chargement</h3>
                <p>Impossible de charger les véhicules. Veuillez vérifier que le fichier data/dummy_ads.json existe.</p>
            </div>
        `;
    }
}

// ===== POPULATE BRAND FILTER =====
function populateBrandFilter() {
    const brands = [...new Set(allVehicles.map(v => v.brand))].sort();
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

// ===== RENDER VEHICLES =====
function renderVehicles() {
    vehiclesGrid.innerHTML = '';

    const vehiclesToShow = filteredVehicles.slice(0, displayedCount);

    if (vehiclesToShow.length === 0) {
        vehiclesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                <h3>Aucun véhicule trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }

    vehiclesToShow.forEach(vehicle => {
        const card = createVehicleCard(vehicle);
        vehiclesGrid.appendChild(card);
    });

    // Show/hide load more button
    loadMoreBtn.style.display = displayedCount < filteredVehicles.length ? 'inline-flex' : 'none';
}

// ===== CREATE VEHICLE CARD =====
function createVehicleCard(vehicle) {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    card.setAttribute('data-aos', 'fade-up');

    // Format price
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(vehicle.price);

    // Get first image
    const firstImage = vehicle.images[0];

    // Create badges HTML
    const badgesHTML = vehicle.badges && vehicle.badges.length > 0
        ? vehicle.badges.map(badge => {
            let badgeClass = 'badge';
            if (badge.toLowerCase().includes('vérif')) badgeClass += ' badge-verified';
            else if (badge.toLowerCase().includes('nouveau')) badgeClass += ' badge-new';
            else if (badge.toLowerCase().includes('remise')) badgeClass += ' badge-discount';
            return `<span class="${badgeClass}">${badge}</span>`;
        }).join('')
        : '';

    card.innerHTML = `
        <div class="vehicle-image-container">
            <img
                src="${firstImage}"
                alt="${vehicle.title}"
                class="vehicle-image"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/400x300?text=Image+Non+Disponible'"
            >
            <div class="vehicle-badges">
                ${badgesHTML}
            </div>
        </div>
        <div class="vehicle-content">
            <h3 class="vehicle-title">${vehicle.title}</h3>
            <div class="vehicle-price">${formattedPrice} ${vehicle.currency}</div>
            <div class="vehicle-specs">
                <span class="spec-item">
                    <i class="fas fa-calendar"></i>
                    ${vehicle.year}
                </span>
                <span class="spec-item">
                    <i class="fas fa-tachometer-alt"></i>
                    ${formatMileage(vehicle.mileage)}
                </span>
                <span class="spec-item">
                    <i class="fas fa-gas-pump"></i>
                    ${vehicle.fuel}
                </span>
                <span class="spec-item">
                    <i class="fas fa-cog"></i>
                    ${vehicle.transmission}
                </span>
            </div>
            <div class="vehicle-location">
                <i class="fas fa-map-marker-alt"></i>
                ${vehicle.location}
            </div>
            <div class="vehicle-footer">
                <button class="view-details-btn" onclick="viewVehicleDetails('${vehicle.id}')">
                    <i class="fas fa-eye"></i>
                    Voir l'annonce
                </button>
            </div>
        </div>
    `;

    // Add structured data to the card
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(generateStructuredData(vehicle));
    card.appendChild(scriptTag);

    return card;
}

// ===== GENERATE STRUCTURED DATA (JSON-LD) =====
function generateStructuredData(vehicle) {
    return {
        "@context": "https://schema.org/",
        "@type": "Car",
        "name": vehicle.title,
        "brand": {
            "@type": "Brand",
            "name": vehicle.brand
        },
        "model": vehicle.model,
        "vehicleConfiguration": vehicle.category,
        "productionDate": vehicle.year.toString(),
        "mileageFromOdometer": {
            "@type": "QuantitativeValue",
            "value": vehicle.mileage,
            "unitCode": "KMT"
        },
        "fuelType": vehicle.fuel,
        "vehicleTransmission": vehicle.transmission,
        "color": vehicle.color,
        "image": vehicle.images,
        "offers": {
            "@type": "Offer",
            "price": vehicle.price,
            "priceCurrency": vehicle.currency,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": vehicle.seller_type === "Concessionnaire" ? "AutoDealer" : "Person",
                "name": vehicle.seller_type
            },
            "url": `https://autodealafrica.com/annonce/${vehicle.id}`
        },
        "description": vehicle.description_long,
        "itemCondition": "https://schema.org/UsedCondition"
    };
}

// ===== FORMAT MILEAGE =====
function formatMileage(mileage) {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
}

// ===== FILTER VEHICLES =====
function filterVehicles() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value;
    const selectedFuel = fuelFilter.value;
    const selectedTransmission = transmissionFilter.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    filteredVehicles = allVehicles.filter(vehicle => {
        // Search term filter
        const matchesSearch = !searchTerm ||
            vehicle.title.toLowerCase().includes(searchTerm) ||
            vehicle.brand.toLowerCase().includes(searchTerm) ||
            vehicle.model.toLowerCase().includes(searchTerm) ||
            vehicle.description_short.toLowerCase().includes(searchTerm);

        // Brand filter
        const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;

        // Fuel filter
        const matchesFuel = !selectedFuel || vehicle.fuel === selectedFuel;

        // Transmission filter
        const matchesTransmission = !selectedTransmission || vehicle.transmission === selectedTransmission;

        // Price range filter
        const matchesPrice = vehicle.price >= minPrice && vehicle.price <= maxPrice;

        return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
    });

    // Reset displayed count
    displayedCount = LOAD_MORE_COUNT;

    // Apply current sort
    sortVehicles();

    renderVehicles();
    updateResultsCount();
}

// ===== SORT VEHICLES =====
function sortVehicles() {
    const sortValue = sortSelect.value;

    switch (sortValue) {
        case 'price-asc':
            filteredVehicles.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredVehicles.sort((a, b) => b.price - a.price);
            break;
        case 'year-desc':
            filteredVehicles.sort((a, b) => b.year - a.year);
            break;
        case 'mileage-asc':
            filteredVehicles.sort((a, b) => a.mileage - b.mileage);
            break;
        case 'recent':
        default:
            filteredVehicles.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
            break;
    }
}

// ===== UPDATE RESULTS COUNT =====
function updateResultsCount() {
    resultsCount.textContent = filteredVehicles.length;
}

// ===== RESET FILTERS =====
function resetFilters() {
    searchInput.value = '';
    brandFilter.value = '';
    fuelFilter.value = '';
    transmissionFilter.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortSelect.value = 'recent';

    filteredVehicles = [...allVehicles];
    displayedCount = LOAD_MORE_COUNT;

    renderVehicles();
    updateResultsCount();
}

// ===== LOAD MORE VEHICLES =====
function loadMore() {
    displayedCount += LOAD_MORE_COUNT;
    renderVehicles();
}

// ===== VIEW VEHICLE DETAILS =====
function viewVehicleDetails(vehicleId) {
    const vehicle = allVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
        // For now, show alert. In production, this would navigate to detail page
        alert(`Détails du véhicule:\n\n${vehicle.title}\n\nPrix: ${new Intl.NumberFormat('fr-FR').format(vehicle.price)} ${vehicle.currency}\n\n${vehicle.description_long}\n\nContact: ${vehicle.contact_email}`);

        // In production, you would do:
        // window.location.href = `/annonce/${vehicleId}`;
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Search input - real-time filter
    searchInput.addEventListener('input', debounce(filterVehicles, 300));

    // Filter button
    filterBtn.addEventListener('click', filterVehicles);

    // Reset button
    resetBtn.addEventListener('click', resetFilters);

    // Sort select
    sortSelect.addEventListener('change', () => {
        sortVehicles();
        renderVehicles();
    });

    // Load more button
    loadMoreBtn.addEventListener('click', loadMore);

    // Allow Enter key to trigger filter
    [searchInput, minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') filterVehicles();
        });
    });
}

// ===== DEBOUNCE UTILITY =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATE STATS COUNTER =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString('fr-FR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('fr-FR');
        }
    }, 16);
}

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚗 Autodealafrica', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cPremier site d\'annonces automobiles en Côte d\'Ivoire', 'font-size: 14px; color: #64748b;');
console.log('%cContact: contact@autodealafrica.com', 'font-size: 12px; color: #64748b;');
