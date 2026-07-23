document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('dossiers-btn');
  var panel = document.getElementById('dossiers-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    panel.classList.toggle('open');
    btn.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    panel.classList.remove('open');
    btn.classList.remove('open');
  });
});