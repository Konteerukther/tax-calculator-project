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