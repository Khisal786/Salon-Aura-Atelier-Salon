document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filter Tabs Logic
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const serviceCards = document.querySelectorAll('.service-card');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Set minimum date for booking input to today
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // 2. Booking Form Native Submit Listener (Bypasses inline scope bugs)
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = document.getElementById('clientName');
      const phoneField = document.getElementById('clientPhone');
      const stylistField = document.getElementById('preferredStylist');
      const dateField = document.getElementById('preferredDate');
      const notesField = document.getElementById('clientNotes');

      if (!nameField || !phoneField || !dateField) {
        console.error('Booking form fields missing.');
        return;
      }

      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      const stylist = stylistField ? stylistField.value : 'Any Available';
      const date = dateField.value;
      const notes = notesField ? notesField.value.trim() : '';

      // Construct structured message for the salon manager
      const message = `✨ *NEW APPOINTMENT REQUEST* ✨\n\n` +
                      `👤 *Client:* ${name}\n` +
                      `📞 *Phone:* ${phone}\n` +
                      `💇‍♀️ *Service:* ${activeServiceTitle}\n` +
                      `⭐ *Preferred Artist:* ${stylist}\n` +
                      `📅 *Date:* ${date}\n` +
                      `💬 *Notes:* ${notes || 'None'}\n\n` +
                      `_Sent via Aura & Atelier Web Studio_`;

      const salonWhatsAppNumber = '923049999325'; 
      const whatsappUrl = `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(message)}`;

      // Close modal
      window.closeBookingModal();

      // Open WhatsApp
      const win = window.open(whatsappUrl, '_blank');
      if (!win) {
        window.location.href = whatsappUrl;
      }
      
      // Reset form
      bookingForm.reset();
    });
  }
});

// Global Booking State & Modal Controllers
let activeServiceTitle = 'Bespoke Consultation';

window.openBookingModal = function(serviceName) {
  activeServiceTitle = serviceName;
  const modal = document.getElementById('bookingModal');
  const titleElem = document.getElementById('modalServiceName');
  
  if (titleElem) titleElem.textContent = serviceName;
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
  }
};

window.closeBookingModal = function() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

// Close modal when clicking outside container background
window.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    window.closeBookingModal();
  }
});