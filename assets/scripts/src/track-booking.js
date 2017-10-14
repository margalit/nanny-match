const bookingSubmit = document.getElementById('booking-submit');

if (bookingSubmit) {
  bookingSubmit.addEventListener('click', () => {
    gtag_report_conversion();
    bookingSubmit.style.display = 'none';
  });
}
