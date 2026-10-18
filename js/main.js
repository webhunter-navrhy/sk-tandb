// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám, prosím, e-mailom.'; });
    });
  });
})();

// Tlačidlá s data-tema predvyplnia formulár (napr. Rezervovať auto -> Autopožičovňa).
document.querySelectorAll('[data-tema]').forEach(function (a) {
  a.addEventListener('click', function () {
    var f = document.querySelector('form.formular'); if (!f) return;
    var t = a.getAttribute('data-tema');
    f.querySelector('[name=tema]').value = t;
    f.querySelector('[name=_subject]').value = 'Dopyt z webu: ' + t;
    var z = f.querySelector('[name=zprava]');
    if (!z.value && t === 'Autopožičovňa') z.value = 'Dobrý deň, mám záujem o prenájom 7-miestneho auta od … do … .';
  });
});
