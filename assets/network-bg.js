(function () {
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];

  var dotPalette = ['#e5665a', '#8fd0ac', '#f4a3ae', '#c9836f'];
  var lineColor = '91, 58, 53'; // dark warm brown, matches --ink

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initParticles() {
    particles = [];
    var count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 16000));
    for (var i = 0; i < count; i++) {
      particles.push({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        vx: rand(-0.28, 0.28),
        vy: rand(-0.28, 0.28),
        r: rand(2, 3.4),
        color: dotPalette[Math.floor(rand(0, dotPalette.length))]
      });
    }
  }
  initParticles();
  window.addEventListener('resize', initParticles);

  var maxDist = 150;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.strokeStyle = 'rgba(' + lineColor + ',' + (0.45 * (1 - dist / maxDist)) + ')';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < particles.length; k++) {
      var pt = particles[k];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(step);
  }
  step();
})();
