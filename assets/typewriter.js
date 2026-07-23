document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('typewriter-role');
  if (!el) return;
  var text = "Administratrice systèmes, réseaux & cybersécurité — étudiante B3 cyber";
  var i = 0;
  var speed = 28;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
});
