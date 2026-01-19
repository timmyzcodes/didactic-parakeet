// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderRooms();
    setupEventListeners();
});

// Track current rate index for each room
const roomRateIndices = {};

// Track selected room and rate (only one selection allowed)
let selectedRoom = null;

// Render all room cards (only Set 1 - all 5 rooms)
function renderRooms() {
    const grid1 = document.getElementById('roomsGrid1');
    
    grid1.innerHTML = '';

    // Only render Set 1 (all rooms)
    roomsData.forEach((room, roomIndex) => {
        const roomCard1 = createRoomCard(room, roomIndex, 1);
        grid1.appendChild(roomCard1);
    });
}

// Create a room card element
function createRoomCard(room, roomIndex, roomSet) {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.roomId = room.id;
    card.dataset.roomSet = roomSet;

    // Image carousel
    const imageContainer = document.createElement('div');
    imageContainer.className = 'room-image-container';
    imageContainer.onclick = () => openRoomDetails(room);
    
    if (room.images && room.images.length > 0) {
        room.images.forEach((img, imgIndex) => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.className = 'room-image';
            imgEl.alt = room.name;
            if (imgIndex === 0) imgEl.classList.add('active');
            imageContainer.appendChild(imgEl);
        });

        // Carousel navigation
        if (room.images.length > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-nav prev';
            prevBtn.innerHTML = '‹';
            prevBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent opening room details
                navigateCarousel(room.id, roomSet, -1);
            };
            imageContainer.appendChild(prevBtn);

            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-nav next';
            nextBtn.innerHTML = '›';
            nextBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent opening room details
                navigateCarousel(room.id, roomSet, 1);
            };
            imageContainer.appendChild(nextBtn);

            // Dots
            const dots = document.createElement('div');
            dots.className = 'carousel-dots';
            room.images.forEach((_, dotIndex) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                if (dotIndex === 0) dot.classList.add('active');
                dot.onclick = (e) => {
                    e.stopPropagation(); // Prevent opening room details
                    goToCarouselImage(room.id, roomSet, dotIndex);
                };
                dots.appendChild(dot);
            });
            imageContainer.appendChild(dots);
        }
    }

    // Availability badge
    if (room.availability) {
        const badge = document.createElement('div');
        badge.className = 'availability-badge';
        badge.innerHTML = `<i class="material-icons">notifications</i> ${room.availability}`;
        badge.onclick = (e) => e.stopPropagation(); // Prevent opening room details when clicking badge
        imageContainer.appendChild(badge);
    }

    // Room content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'room-card-content-wrapper';
    
    // Room content
    const content = document.createElement('div');
    content.className = 'room-card-content';

    // Title
    const title = document.createElement('div');
    title.className = 'room-title';
    const titleH3 = document.createElement('h3');
    titleH3.textContent = room.name;
    title.appendChild(titleH3);
    content.appendChild(title);
    
    // Info icon in top-right corner
    const infoIcon = document.createElement('div');
    infoIcon.className = 'info-icon';
    const infoIconSymbol = document.createElement('span');
    infoIconSymbol.className = 'material-symbols-outlined';
    infoIconSymbol.textContent = 'info';
    infoIcon.appendChild(infoIconSymbol);
    infoIcon.onclick = () => openRoomDetails(room);
    contentWrapper.appendChild(infoIcon);

    // Specs
    const specs = document.createElement('div');
    specs.className = 'room-specs';
    specs.textContent = `${room.size} m² · ${room.type} · Sleeps ${room.sleeps}`;
    content.appendChild(specs);

    // Bed
    const bed = document.createElement('div');
    bed.className = 'room-bed';
    
    // Check if room has bed options
    if (room.bedOptions && room.bedOptions.length > 1) {
        // Check if user has made a selection
        const selectedBedTypeKey = `bedType-${room.id}`;
        const savedSelection = localStorage.getItem(selectedBedTypeKey);
        
        let bedTypeText, linkText;
        if (savedSelection) {
            // User has made a selection - show selected option
            const selectedOption = room.bedOptions.find(opt => opt.id === savedSelection);
            bedTypeText = selectedOption ? selectedOption.label : room.bedType;
            linkText = 'Change';
        } else {
            // No selection made yet - show original bed type text
            bedTypeText = room.bedType;
            linkText = 'Select';
        }
        
        bed.innerHTML = `
            <span class="bed-icon"><i class="material-icons">bed</i></span>
            <span class="bed-type-text">${bedTypeText}</span>
            <a href="#" class="bed-select-link" data-room-id="${room.id}">${linkText}</a>
        `;
        
        // Add click handler for Select/Change link
        const selectLink = bed.querySelector('.bed-select-link');
        selectLink.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openBedTypeSelector(room, roomIndex, roomSet);
        };
    } else {
        // Single bed type - just display it
        bed.innerHTML = `<span class="bed-icon"><i class="material-icons">bed</i></span> ${room.bedType}`;
    }
    
    content.appendChild(bed);

    // Amenities
    const amenities = document.createElement('div');
    amenities.className = 'amenities';
    room.amenities.slice(0, 4).forEach(amenity => {
        const tag = document.createElement('span');
        tag.className = 'amenity-tag';
        tag.innerHTML = `<span class="amenity-icon"><i class="material-icons">${amenity.icon}</i></span> ${amenity.name}`;
        amenities.appendChild(tag);
    });
    if (room.amenities.length > 4) {
        const more = document.createElement('a');
        more.className = 'more-link';
        more.href = '#';
        more.innerHTML = '<i class="material-icons">more_horiz</i> More';
        more.onclick = (e) => {
            e.preventDefault();
            openRoomDetails(room);
        };
        amenities.appendChild(more);
    }
    content.appendChild(amenities);
    
    // Special notes
    if (room.specialNote) {
        const specialNotes = Array.isArray(room.specialNote) ? room.specialNote : [room.specialNote];
        specialNotes.forEach(noteText => {
            const note = document.createElement('div');
            note.className = 'room-special-note';
            // Determine icon based on note content
            let icon = 'star';
            const noteLower = noteText.toLowerCase();
            if (noteLower.includes('city view')) {
                icon = 'location_city';
            } else if (noteLower.includes('large bed') || noteLower.includes('bed')) {
                icon = 'bed';
            } else if (noteLower.includes('desk')) {
                icon = 'desk';
            } else if (noteLower.includes('largest room')) {
                icon = 'open_in_full';
            } else if (noteLower.includes('executive lounge')) {
                icon = 'diamond';
            }
            note.innerHTML = `<i class="material-icons">${icon}</i> ${noteText}`;
            content.appendChild(note);
        });
    }
    
    // Append content to wrapper
    contentWrapper.appendChild(content);

    card.appendChild(imageContainer);
    card.appendChild(contentWrapper);

    // Rate options (after contentWrapper)
    if (room.rates && room.rates.length > 0) {
        const rateOptions = document.createElement('div');
        rateOptions.className = 'rate-options';
        
        // Initialize rate index for this room and set
        const rateIndexKey = `${room.id}-set${roomSet}`;
        if (!roomRateIndices[rateIndexKey]) {
            roomRateIndices[rateIndexKey] = 0;
        }
        
        // Rate navigation
        if (room.rates.length > 1) {
            const rateNav = document.createElement('div');
            rateNav.className = 'rate-nav';
            const rateNavLabel = document.createElement('span');
            rateNavLabel.className = 'rate-nav-label';
            rateNavLabel.textContent = `Option 1 of ${room.rates.length}`;
            rateNavLabel.id = `rate-nav-label-${room.id}-set${roomSet}`;
            rateNav.appendChild(rateNavLabel);
            
            const rateNavArrows = document.createElement('div');
            rateNavArrows.className = 'rate-nav-arrows';
            const prevArrow = document.createElement('button');
            prevArrow.className = 'rate-nav-arrow';
            const prevIcon = document.createElement('span');
            prevIcon.className = 'material-symbols-outlined';
            prevIcon.textContent = 'chevron_backward';
            prevArrow.appendChild(prevIcon);
            prevArrow.onclick = () => navigateRate(room.id, -1, roomSet);
            const nextArrow = document.createElement('button');
            nextArrow.className = 'rate-nav-arrow';
            const nextIcon = document.createElement('span');
            nextIcon.className = 'material-symbols-outlined';
            nextIcon.textContent = 'chevron_forward';
            nextArrow.appendChild(nextIcon);
            nextArrow.onclick = () => navigateRate(room.id, 1, roomSet);
            rateNavArrows.appendChild(prevArrow);
            rateNavArrows.appendChild(nextArrow);
            rateNav.appendChild(rateNavArrows);
            rateOptions.appendChild(rateNav);
        }

        // Rate cards carousel container
        const rateCarouselContainer = document.createElement('div');
        rateCarouselContainer.className = 'rate-carousel-container';
        rateCarouselContainer.id = `rate-carousel-${room.id}-set${roomSet}`;
        
        // Create all rate cards
        room.rates.forEach((rate, rateIndex) => {
            const rateCard = createRateCard(room, rate, roomIndex, rateIndex, roomSet);
            rateCard.dataset.rateIndex = rateIndex;
            rateCarouselContainer.appendChild(rateCard);
        });
        
        rateOptions.appendChild(rateCarouselContainer);
        card.appendChild(rateOptions);
    }

    return card;
}

// Create rate card
function createRateCard(room, rate, roomIndex, rateIndex, roomSet) {
    const rateCard = document.createElement('div');
    rateCard.className = 'rate-card';
    rateCard.dataset.roomId = room.id;
    rateCard.dataset.rateId = rate.id;
    
    // Check if filters are active and this rate should be hidden
    const freeCancellationCheckbox = document.getElementById('filterFreeCancellation');
    const breakfastCheckbox = document.getElementById('filterBreakfast');
    
    const freeCancellationChecked = freeCancellationCheckbox && freeCancellationCheckbox.checked;
    const breakfastChecked = breakfastCheckbox && breakfastCheckbox.checked;
    
    if ((freeCancellationChecked || breakfastChecked) && rate.uniqueId) {
        const freeCancellationIds = ["1-2", "1-4", "2-3", "3-2", "3-4", "4-2", "4-4", "5-3", "5-4"];
        const breakfastIds = ["1-3", "1-4", "2-2", "2-3", "3-3", "3-4", "4-3", "4-4", "5-2", "5-4"];
        const bothCheckedIds = ["1-4", "2-3", "3-4", "4-4", "5-4"];
        
        let targetRateIds = [];
        
        if (freeCancellationChecked && breakfastChecked) {
            targetRateIds = bothCheckedIds;
        } else if (freeCancellationChecked) {
            targetRateIds = freeCancellationIds;
        } else if (breakfastChecked) {
            targetRateIds = breakfastIds;
        }
        
        if (targetRateIds.length > 0 && !targetRateIds.includes(rate.uniqueId)) {
            rateCard.style.display = "none";
        }
    }

    // Rate title
    const rateTitle = document.createElement('div');
    rateTitle.className = 'rate-title';
    const rateH4 = document.createElement('h4');
    rateH4.textContent = rate.name;
    rateTitle.appendChild(rateH4);
    
    const rateInfoIcon = document.createElement('div');
    rateInfoIcon.className = 'info-icon';
    const rateInfoIconSymbol = document.createElement('span');
    rateInfoIconSymbol.className = 'material-symbols-outlined';
    rateInfoIconSymbol.textContent = 'info';
    rateInfoIcon.appendChild(rateInfoIconSymbol);
    rateInfoIcon.onclick = () => openRateDetails(room, rate);
    rateTitle.appendChild(rateInfoIcon);
    rateCard.appendChild(rateTitle);

    // Features
    const features = document.createElement('div');
    features.className = 'rate-features';
    rate.features.forEach(feature => {
        const featureEl = document.createElement('div');
        featureEl.className = 'rate-feature';
        
        // Add Material Design checkmark icon
        const checkIcon = document.createElement('i');
        checkIcon.className = 'material-icons';
        checkIcon.textContent = 'check';
        featureEl.appendChild(checkIcon);
        
        // Add feature text with "Top rated" highlighting
        if (feature.includes('Top rated')) {
            const parts = feature.split('Top rated');
            if (parts[0]) {
                featureEl.appendChild(document.createTextNode(parts[0]));
            }
            const topRatedSpan = document.createElement('span');
            topRatedSpan.className = 'top-rated-highlight';
            topRatedSpan.textContent = 'Top rated';
            featureEl.appendChild(topRatedSpan);
            if (parts[1]) {
                featureEl.appendChild(document.createTextNode(parts[1]));
            }
        } else {
            const featureText = document.createTextNode(feature);
            featureEl.appendChild(featureText);
        }
        
        features.appendChild(featureEl);
    });
    rateCard.appendChild(features);

    // Bottom section wrapper (discount, price, disclaimers, button)
    const bottomSection = document.createElement('div');
    bottomSection.className = 'rate-bottom-section';

    // Deal tags
    if (rate.dealTags && rate.dealTags.length > 0) {
        const deals = document.createElement('div');
        deals.className = 'rate-deals';
        rate.dealTags.forEach(tag => {
            const dealTag = document.createElement('span');
            dealTag.className = 'deal-tag';
            if (tag.includes('%')) {
                dealTag.classList.add('discount');
            } else {
                dealTag.classList.add('special');
            }
            dealTag.textContent = tag;
            deals.appendChild(dealTag);
        });
        bottomSection.appendChild(deals);
    }

    // Price
    const priceDiv = document.createElement('div');
    priceDiv.className = 'rate-price';
    if (rate.originalPrice && rate.originalPrice > rate.currentPrice) {
        const originalPrice = document.createElement('span');
        originalPrice.className = 'original-price';
        originalPrice.textContent = `€${rate.originalPrice}`;
        priceDiv.appendChild(originalPrice);
    }
    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = `€${rate.currentPrice}`;
    priceDiv.appendChild(currentPrice);
    bottomSection.appendChild(priceDiv);

    // Price note
    const priceNote = document.createElement('div');
    priceNote.className = 'price-note';
    
    const chargesLine = document.createElement('div');
    chargesLine.className = 'price-note-line';
    chargesLine.textContent = 'includes taxes and charges';
    
    priceNote.appendChild(chargesLine);
    bottomSection.appendChild(priceNote);

    // Reserve button - text based on cancellation policy
    const reserveBtn = document.createElement('button');
    reserveBtn.className = 'reserve-btn-card';
    
    // Determine button text based on cancellation policy
    let buttonText = 'Reserve';
    const cancellationLower = rate.cancellationPolicy ? rate.cancellationPolicy.toLowerCase() : '';
    if (cancellationLower.includes('cancel for free') || cancellationLower.includes('free cancellation')) {
        buttonText = 'Reserve Now, Pay Later';
    }
    reserveBtn.textContent = buttonText;
    reserveBtn.onclick = (e) => selectRoomRate(room.id, rate.id, e.target);
    bottomSection.appendChild(reserveBtn);

    rateCard.appendChild(bottomSection);

    return rateCard;
}

// Carousel navigation
function navigateCarousel(roomId, roomSet, direction) {
    const card = document.querySelector(`[data-room-id="${roomId}"][data-room-set="${roomSet}"]`);
    if (!card) return;
    
    const images = card.querySelectorAll('.room-image');
    const dots = card.querySelectorAll('.carousel-dot');
    
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    currentIndex = (currentIndex + direction + images.length) % images.length;
    
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentIndex);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function goToCarouselImage(roomId, roomSet, imageIndex) {
    const card = document.querySelector(`[data-room-id="${roomId}"][data-room-set="${roomSet}"]`);
    if (!card) return;
    
    const images = card.querySelectorAll('.room-image');
    const dots = card.querySelectorAll('.carousel-dot');
    
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === imageIndex);
    });
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === imageIndex);
    });
}

// Rate navigation with carousel animation
function navigateRate(roomId, direction, roomSet) {
    const room = roomsData.find(r => r.id === roomId);
    if (!room || !room.rates || room.rates.length <= 1) return;
    
    // Use set-specific key for rate indices
    const rateIndexKey = `${roomId}-set${roomSet}`;
    const currentIndex = roomRateIndices[rateIndexKey] || 0;
    const newIndex = (currentIndex + direction + room.rates.length) % room.rates.length;
    roomRateIndices[rateIndexKey] = newIndex;
    
    const carousel = document.getElementById(`rate-carousel-${roomId}-set${roomSet}`);
    const label = document.getElementById(`rate-nav-label-${roomId}-set${roomSet}`);
    
    if (carousel && label) {
        // Update label
        label.textContent = `Option ${newIndex + 1} of ${room.rates.length}`;
        
        // Calculate translateX for smooth sliding
        const translateX = -newIndex * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
    }
}

// Open room details overlay
function openRoomDetails(room) {
    const overlay = document.getElementById('roomDetailsOverlay');
    const gallery = document.getElementById('roomDetailsGallery');
    const info = document.getElementById('roomDetailsInfo');

    // Gallery
    gallery.innerHTML = '';
    const mainImg = document.createElement('img');
    mainImg.src = room.images[0];
    mainImg.className = 'room-details-main-image';
    mainImg.alt = room.name;
    gallery.appendChild(mainImg);

    if (room.images.length > 1) {
        const thumbnails = document.createElement('div');
        thumbnails.className = 'room-details-thumbnails';
        room.images.forEach((img, idx) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = 'thumbnail';
            if (idx === 0) thumb.classList.add('active');
            thumb.onclick = () => {
                mainImg.src = img;
                thumbnails.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            thumbnails.appendChild(thumb);
        });
        gallery.appendChild(thumbnails);
    }

    // Info
    info.innerHTML = '';
    if (room.specialNote) {
        const specialNotes = Array.isArray(room.specialNote) ? room.specialNote : [room.specialNote];
        specialNotes.forEach(noteText => {
            const badge = document.createElement('div');
            badge.className = 'room-details-badge';
            // Determine icon based on note content
            let icon = 'location_city';
            const noteLower = noteText.toLowerCase();
            if (noteLower.includes('city view')) {
                icon = 'location_city';
            } else if (noteLower.includes('large bed') || noteLower.includes('bed')) {
                icon = 'bed';
            } else if (noteLower.includes('desk')) {
                icon = 'desk';
            } else if (noteLower.includes('largest room')) {
                icon = 'open_in_full';
            } else if (noteLower.includes('executive lounge')) {
                icon = 'diamond';
            } else {
                icon = 'star';
            }
            badge.innerHTML = `<i class="material-icons">${icon}</i> ${noteText}`;
            info.appendChild(badge);
        });
    }

    const title = document.createElement('h2');
    title.className = 'room-details-title';
    title.textContent = room.name;
    info.appendChild(title);

    const specs = document.createElement('div');
    specs.className = 'room-details-specs';
    specs.textContent = `${room.size} m² · ${room.type} · Sleeps ${room.sleeps}`;
    info.appendChild(specs);

    const desc = document.createElement('p');
    desc.className = 'room-details-description';
    desc.textContent = room.description;
    info.appendChild(desc);

    const bedSection = document.createElement('div');
    bedSection.className = 'room-details-section';
    bedSection.innerHTML = `
        <h4><i class="material-icons">bed</i> ${room.bedDescription}</h4>
        <p><strong>Comfy beds, 8.8</strong> – Based on 2,600 reviews</p>
    `;
    info.appendChild(bedSection);

    // Facilities
    const amenitiesSection = document.createElement('div');
    amenitiesSection.className = 'room-details-section';
    amenitiesSection.innerHTML = '<h4>Facilities</h4>';
    const amenityList = document.createElement('ul');
    amenityList.className = 'amenity-list';
    if (room.allFacilities && room.allFacilities.length > 0) {
        room.allFacilities.forEach(facility => {
            const li = document.createElement('li');
            li.textContent = facility;
            amenityList.appendChild(li);
        });
    } else {
        // Fallback to amenities if allFacilities not available
        room.amenities.forEach(amenity => {
            const li = document.createElement('li');
            li.textContent = amenity.name;
            amenityList.appendChild(li);
        });
    }
    amenitiesSection.appendChild(amenityList);
    info.appendChild(amenitiesSection);

    // Private bathroom amenities
    if (room.privateBathroomAmenities && room.privateBathroomAmenities.length > 0) {
        const bathroomSection = document.createElement('div');
        bathroomSection.className = 'room-details-section';
        bathroomSection.innerHTML = '<h4>Private bathroom</h4>';
        const bathroomList = document.createElement('ul');
        bathroomList.className = 'amenity-list';
        room.privateBathroomAmenities.forEach(amenity => {
            const li = document.createElement('li');
            li.textContent = amenity;
            bathroomList.appendChild(li);
        });
        bathroomSection.appendChild(bathroomList);
        info.appendChild(bathroomSection);
    }

    // Customer review
    if (room.customerReview) {
        const reviewSection = document.createElement('div');
        reviewSection.className = 'room-details-section';
        reviewSection.innerHTML = '<h4>Customer review</h4>';
        const reviewText = document.createElement('p');
        reviewText.style.fontSize = '14px';
        reviewText.style.lineHeight = '1.6';
        reviewText.style.color = '#555';
        reviewText.style.fontStyle = 'italic';
        reviewText.textContent = room.customerReview;
        reviewSection.appendChild(reviewText);
        info.appendChild(reviewSection);
    }

    overlay.classList.add('active');
}

// Open rate details overlay
function openRateDetails(room, rate) {
    const overlay = document.getElementById('rateDetailsOverlay');
    const container = document.getElementById('rateDetailsContainer');

    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'rate-details-title';
    title.textContent = rate.name;
    container.appendChild(title);

    // Cancellation - use standardized explainer
    const cancellationSection = document.createElement('div');
    cancellationSection.className = 'rate-details-section';
    const isFreeCancellation = rate.cancellationPolicy && rate.cancellationPolicy.toLowerCase().includes('cancel for free');
    const cancellationTitle = isFreeCancellation ? 'Free cancellation' : 'Non-refundable';
    const cancellationText = isFreeCancellation ? rateExplainers.freeCancellation : rateExplainers.nonRefundable;
    cancellationSection.innerHTML = `
        <h4>${cancellationTitle}</h4>
        <p>${cancellationText}</p>
    `;
    container.appendChild(cancellationSection);

    // Meals - use standardized explainer
    if (rate.meals) {
        const mealsSection = document.createElement('div');
        mealsSection.className = 'rate-details-section';
        const mealsText = rateExplainers.mealsIncluded;
        mealsSection.innerHTML = `
            <h4>Meals</h4>
            <p>${mealsText}</p>
        `;
        container.appendChild(mealsSection);
    } else {
        // Show meals excluded if no meals included
        const mealsSection = document.createElement('div');
        mealsSection.className = 'rate-details-section';
        mealsSection.innerHTML = `
            <h4>Meals</h4>
            <p>${rateExplainers.mealsExcluded}</p>
        `;
        container.appendChild(mealsSection);
    }

    // Prepayment - use standardized explainer
    const prepaymentSection = document.createElement('div');
    prepaymentSection.className = 'rate-details-section';
    const isPrepayment = rate.prepayment && (rate.prepayment.toLowerCase().includes('full payment required') || rate.prepayment.toLowerCase().includes('charged at the time'));
    const prepaymentText = isPrepayment ? rateExplainers.prepayment : rateExplainers.noPrepayment;
    prepaymentSection.innerHTML = `
        <h4>Prepayment</h4>
        <p>${prepaymentText}</p>
    `;
    container.appendChild(prepaymentSection);

    // Extras - use standardized explainer
    if (rate.extras && rate.extras.length > 0) {
        const extrasSection = document.createElement('div');
        extrasSection.className = 'rate-details-section';
        extrasSection.innerHTML = `
            <h4>Extra</h4>
            <p>${rateExplainers.extra}</p>
        `;
        container.appendChild(extrasSection);
    }

    // Price breakdown
    if (rate.priceBreakdown) {
        const breakdownSection = document.createElement('div');
        breakdownSection.className = 'price-breakdown';
        breakdownSection.innerHTML = '<h4>Price Breakdown</h4>';

        const baseRow = document.createElement('div');
        baseRow.className = 'price-breakdown-row';
        baseRow.innerHTML = `
            <span>${rate.priceBreakdown.base.label}</span>
            <span>€ ${rate.priceBreakdown.base.amount * rate.priceBreakdown.base.nights}</span>
        `;
        breakdownSection.appendChild(baseRow);

        if (rate.priceBreakdown.specialDeal) {
            const dealRow = document.createElement('div');
            dealRow.className = 'price-breakdown-row';
            dealRow.innerHTML = `
                <div>
                    <div>${rate.priceBreakdown.specialDeal.label}</div>
                    <div class="price-breakdown-discount">${rateExplainers.specialDeal}</div>
                </div>
                <span>€ ${rate.priceBreakdown.specialDeal.amount}</span>
            `;
            breakdownSection.appendChild(dealRow);
        }

        if (rate.priceBreakdown.bookingComPays) {
            const bookingRow = document.createElement('div');
            bookingRow.className = 'price-breakdown-row';
            bookingRow.innerHTML = `
                <div>
                    <div>${rate.priceBreakdown.bookingComPays.label}</div>
                    <div class="price-breakdown-discount">${rateExplainers.bookingPays}</div>
                </div>
                <span>€ ${rate.priceBreakdown.bookingComPays.amount}</span>
            `;
            breakdownSection.appendChild(bookingRow);
        }

        const totalRow = document.createElement('div');
        totalRow.className = 'price-breakdown-row total';
        totalRow.innerHTML = `
            <span>Total</span>
            <span>€ ${rate.priceBreakdown.total}</span>
        `;
        breakdownSection.appendChild(totalRow);

        container.appendChild(breakdownSection);
    }

    overlay.classList.add('active');
}

// Select room and rate (single selection only)
function selectRoomRate(roomId, rateId, buttonElement) {
    const room = roomsData.find(r => r.id === roomId);
    const rate = room.rates.find(r => r.id === rateId);

    // Replace previous selection with new one (always update selection)
    selectedRoom = { 
        roomId, 
        rateId, 
        roomName: room.name, 
        rateName: rate.name, 
        price: rate.currentPrice
    };

    updateSelectionUI();
    
    // Show alert dialog (always show when Reserve is clicked)
    alert('Room selected');
}

// Update selection UI
function updateSelectionUI() {
    // Remove all selections first
    document.querySelectorAll('.room-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected class to the selected card
    if (selectedRoom) {
        const cards = document.querySelectorAll(`[data-room-id="${selectedRoom.roomId}"]`);
        cards.forEach(card => {
            card.classList.add('selected');
        });
    }
}

// Open bed type selector overlay
function openBedTypeSelector(room, roomIndex, roomSet) {
    const overlay = document.getElementById('bedTypeOverlay');
    const container = document.getElementById('bedTypeContainer');
    
    container.innerHTML = '';
    
    const title = document.createElement('h2');
    title.className = 'bed-type-overlay-title';
    title.textContent = 'Choose bed type';
    container.appendChild(title);
    
    const subtitle = document.createElement('p');
    subtitle.className = 'bed-type-overlay-subtitle';
    subtitle.textContent = room.name;
    container.appendChild(subtitle);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bed-type-options-grid';
    
    // Get current selection (if any)
    const selectedBedTypeKey = `bedType-${room.id}`;
    const currentSelection = localStorage.getItem(selectedBedTypeKey);
    
    room.bedOptions.forEach((option) => {
        const optionCard = document.createElement('button');
        optionCard.className = 'bed-type-option-card';
        optionCard.dataset.bedType = option.id;
        
        if (option.id === currentSelection) {
            optionCard.classList.add('selected');
        }
        
        optionCard.innerHTML = `
            <div class="bed-type-option-icon">
                <i class="material-icons">${option.icon}</i>
            </div>
            <div class="bed-type-option-label">${option.label}</div>
            ${option.id === currentSelection ? '<div class="bed-type-option-check"><i class="material-icons">check_circle</i></div>' : ''}
        `;
        
        optionCard.onclick = () => {
            // Update selection
            localStorage.setItem(selectedBedTypeKey, option.id);
            // Update room card display
            updateBedTypeDisplay(room.id, option.label);
            // Close overlay
            overlay.classList.remove('active');
        };
        
        optionsContainer.appendChild(optionCard);
    });
    
    container.appendChild(optionsContainer);
    overlay.classList.add('active');
}

// Update bed type display in room card
function updateBedTypeDisplay(roomId, bedTypeLabel) {
    const bedElements = document.querySelectorAll(`[data-room-id="${roomId}"] .bed-type-text`);
    const linkElements = document.querySelectorAll(`[data-room-id="${roomId}"] .bed-select-link`);
    
    bedElements.forEach(bedText => {
        bedText.textContent = bedTypeLabel;
    });
    
    // Change link text from "Select" to "Change" after selection
    linkElements.forEach(link => {
        link.textContent = 'Change';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Close overlays
    document.getElementById('closeRoomDetails').onclick = () => {
        document.getElementById('roomDetailsOverlay').classList.remove('active');
    };

    document.getElementById('closeRateDetails').onclick = () => {
        document.getElementById('rateDetailsOverlay').classList.remove('active');
    };

    const closeBedType = document.getElementById('closeBedType');
    if (closeBedType) {
        closeBedType.onclick = () => {
            document.getElementById('bedTypeOverlay').classList.remove('active');
        };
    }

    // Close on overlay background click
    document.getElementById('roomDetailsOverlay').onclick = (e) => {
        if (e.target.id === 'roomDetailsOverlay') {
            document.getElementById('roomDetailsOverlay').classList.remove('active');
        }
    };

    document.getElementById('rateDetailsOverlay').onclick = (e) => {
        if (e.target.id === 'rateDetailsOverlay') {
            document.getElementById('rateDetailsOverlay').classList.remove('active');
        }
    };

    const bedTypeOverlay = document.getElementById('bedTypeOverlay');
    if (bedTypeOverlay) {
        bedTypeOverlay.onclick = (e) => {
            if (e.target.id === 'bedTypeOverlay') {
                bedTypeOverlay.classList.remove('active');
            }
        };
    }
    
    // Setup Free cancellation checkbox
    setupFreeCancellationFilter();
    
    // Setup Breakfast checkbox
    setupBreakfastFilter();
}

// Apply filters based on current checkbox states
function applyFilters() {
    const freeCancellationCheckbox = document.getElementById('filterFreeCancellation');
    const breakfastCheckbox = document.getElementById('filterBreakfast');
    
    const freeCancellationChecked = freeCancellationCheckbox && freeCancellationCheckbox.checked;
    const breakfastChecked = breakfastCheckbox && breakfastCheckbox.checked;
    
    // Define filter lists
    const freeCancellationIds = ["1-2", "1-4", "2-3", "3-2", "3-4", "4-2", "4-4", "5-3", "5-4"];
    const breakfastIds = ["1-3", "1-4", "2-2", "2-3", "3-3", "3-4", "4-3", "4-4", "5-2", "5-4"];
    const bothCheckedIds = ["1-4", "2-3", "3-4", "4-4", "5-4"]; // Intersection when both are checked
    
    let targetRateIds = [];
    
    if (freeCancellationChecked && breakfastChecked) {
        // Both checked: show intersection
        targetRateIds = bothCheckedIds;
    } else if (freeCancellationChecked) {
        // Only Free cancellation checked
        targetRateIds = freeCancellationIds;
    } else if (breakfastChecked) {
        // Only Breakfast checked
        targetRateIds = breakfastIds;
    }
    // If neither is checked, targetRateIds remains empty (show all)
    
    // Find all rate cards
    const rateCards = document.querySelectorAll('.rate-card');
    
    rateCards.forEach(rateCard => {
        // Get the rate data from the card's dataset
        const roomId = rateCard.dataset.roomId;
        const rateId = rateCard.dataset.rateId;
        
        if (roomId && rateId) {
            // Find the room and rate to get uniqueId
            const room = roomsData.find(r => r.id === parseInt(roomId));
            if (room) {
                const rate = room.rates.find(r => r.id === parseInt(rateId));
                if (rate && rate.uniqueId) {
                    const uniqueId = rate.uniqueId;
                    
                    if (targetRateIds.length > 0) {
                        // Filters are active: show only target rates
                        if (targetRateIds.includes(uniqueId)) {
                            rateCard.style.display = "";
                        } else {
                            rateCard.style.display = "none";
                        }
                    } else {
                        // No filters active: show all rates
                        rateCard.style.display = "";
                    }
                }
            }
        }
    });
}

// Setup Free cancellation checkbox filter
function setupFreeCancellationFilter() {
    const checkbox = document.getElementById('filterFreeCancellation');
    if (!checkbox) return;
    
    checkbox.addEventListener('change', function() {
        applyFilters();
    });
}

// Setup Breakfast checkbox filter
function setupBreakfastFilter() {
    const checkbox = document.getElementById('filterBreakfast');
    if (!checkbox) return;
    
    checkbox.addEventListener('change', function() {
        applyFilters();
    });
}
