window.onscroll = function() {scrollFunction()};
    
function scrollFunction() {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function scrollToTop() {  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sendToMIT(message) {
  console.log("Sending to MIT App Inventor:", message);
  if (window.AppInventor) {
  window.AppInventor.setWebViewString(message);
  }
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.addEventListener("orientationchange", function() {
  location.reload();
});


document.addEventListener("DOMContentLoaded", function () {

  const topNavbar = document.getElementById("navbarTop"); // Navbar แรก
  const secondNavbar = document.getElementById("navbarBottom"); // Navbar ล่าง
  const topbrand = document.getElementById("brandLogoTop");
  const secondbrand = document.getElementById("brandLogoButton"); // โลโก้ "KenKen Tax"

  function updateBrandVisibility() {
    const scrollTop = window.scrollY;
    const navbarBottom = secondNavbar.offsetTop; // + topNavbar.offsetHeight;

    console.log("scrollTop:", scrollTop, "navbarBottom:", navbarBottom); // Debug ค่า Scroll

    // แสดงโลโก้ทันทีเมื่อเลื่อนผ่าน Navbar แรก
    if (navbarBottom - scrollTop < 100) {
      topbrand.style.opacity = "0"
      secondbrand.style.opacity = "1";
    } else {
      topbrand.style.opacity = "1"
      secondbrand.style.opacity = "0";
    }
  }
  topbrand.style.transition = "opacity 0.5s";
  secondbrand.style.transition = "opacity 0.5s";

  // ใช้ requestAnimationFrame ให้ทำงานลื่นขึ้น
  function onScroll() {
    requestAnimationFrame(updateBrandVisibility);
  }

  window.addEventListener("scroll", onScroll);
});
