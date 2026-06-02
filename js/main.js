(function () {
  var html = document.documentElement;
  html.classList.remove('no-js');
  html.classList.add('js');

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }
    callback();
  }

  ready(function () {
    var body = document.body;
    var menu = document.querySelector('#main-menu');
    var menuToggles = document.querySelectorAll('[data-open="#main-menu"]');
    var topLink = document.querySelector('#top-link');

    if (menu) {
      var overlay = document.createElement('button');
      overlay.type = 'button';
      overlay.className = 'mobile-menu-overlay';
      overlay.setAttribute('aria-label', 'Close menu');
      body.appendChild(overlay);

      var closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'mobile-menu-close';
      closeButton.setAttribute('aria-label', 'Close menu');
      closeButton.textContent = 'x';
      menu.insertBefore(closeButton, menu.firstChild);

      var openMenu = function () {
        menu.classList.add('is-open');
        body.classList.add('menu-open');
        menuToggles.forEach(function (toggle) {
          toggle.setAttribute('aria-expanded', 'true');
        });
        closeButton.focus();
      };

      var closeMenu = function () {
        menu.classList.remove('is-open');
        body.classList.remove('menu-open');
        menuToggles.forEach(function (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        });
      };

      menuToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
          event.preventDefault();
          openMenu();
        });
      });

      overlay.addEventListener('click', closeMenu);
      closeButton.addEventListener('click', closeMenu);

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeMenu();
        }
      });

      window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 850px)').matches) {
          closeMenu();
        }
      });

      menu.querySelectorAll('.menu-item-has-children').forEach(function (item) {
        var link = item.querySelector(':scope > a');
        var subMenu = item.querySelector(':scope > .sub-menu');

        if (!link || !subMenu) {
          return;
        }

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'submenu-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Toggle submenu');
        toggle.textContent = '+';
        link.after(toggle);

        toggle.addEventListener('click', function () {
          var isOpen = item.classList.toggle('is-expanded');
          toggle.setAttribute('aria-expanded', String(isOpen));
          toggle.textContent = isOpen ? '-' : '+';
        });
      });
    }

    if (topLink) {
      var updateTopLink = function () {
        topLink.classList.toggle('is-visible', window.scrollY > 300);
      };

      topLink.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      updateTopLink();
      window.addEventListener('scroll', updateTopLink, { passive: true });
    }

    document.querySelectorAll('.row-slider').forEach(function (slider) {
      var slides = Array.prototype.slice.call(slider.children).filter(function (child) {
        return child.classList.contains('col');
      });

      if (slides.length < 2) {
        return;
      }

      var activeIndex = 0;
      var options = {};

      try {
        options = JSON.parse(slider.getAttribute('data-flickity-options') || '{}');
      } catch (error) {
        options = {};
      }

      var previousButton = document.createElement('button');
      var nextButton = document.createElement('button');

      previousButton.type = 'button';
      nextButton.type = 'button';
      previousButton.className = 'slider-button slider-button-previous';
      nextButton.className = 'slider-button slider-button-next';
      previousButton.setAttribute('aria-label', 'Previous slide');
      nextButton.setAttribute('aria-label', 'Next slide');
      previousButton.textContent = '<';
      nextButton.textContent = '>';

      slider.classList.add('vanilla-slider');
      slider.appendChild(previousButton);
      slider.appendChild(nextButton);

      var showSlide = function (index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle('is-active', slideIndex === activeIndex);
        });
      };

      previousButton.addEventListener('click', function () {
        showSlide(activeIndex - 1);
      });

      nextButton.addEventListener('click', function () {
        showSlide(activeIndex + 1);
      });

      showSlide(0);

      if (Number(options.autoPlay) > 0) {
        window.setInterval(function () {
          showSlide(activeIndex + 1);
        }, Number(options.autoPlay));
      }
    });

    document.querySelectorAll('.wpcf7.no-js').forEach(function (formWrapper) {
      formWrapper.classList.remove('no-js');
      formWrapper.classList.add('js');
    });
  });
})();
