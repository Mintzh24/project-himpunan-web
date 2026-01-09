// Ambil Elemen
const overlay = document.getElementById('nav-overlay');
const openBtn = document.getElementById('open-menu');
const closeBtn = document.getElementById('close-menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const btnTop = document.createElement('button'); // Buat tombol Back to Top dinamis

// 1. Konfigurasi Tombol Back to Top
btnTop.id = "backToTop";
btnTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(btnTop);

// 2. Fungsi Buka/Tutup Menu Mobile
const toggleMenu = (isOpen) => {
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

openBtn.onclick = () => toggleMenu(true);
closeBtn.onclick = () => toggleMenu(false);

// Tutup menu jika klik area luar (overlay)
overlay.onclick = (e) => {
    if (e.target === overlay) toggleMenu(false);
};

// 3. Dropdown Sub-Menu Mobile
dropdownToggles.forEach(toggle => {
    toggle.onclick = function(e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Tutup submenu lain (Accordion)
        document.querySelectorAll('.submenu').forEach(s => {
            if (s !== submenu) s.classList.remove('open');
        });

        submenu.classList.toggle('open');
        icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    };
});

// 4. Logika Scroll (Back to Top)
window.onscroll = function() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
};

btnTop.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 5. Tutup menu otomatis saat link navigasi diklik
document.querySelectorAll('.nav-links-mobile a:not(.dropdown-toggle)').forEach(link => {
    link.onclick = () => toggleMenu(false);
});