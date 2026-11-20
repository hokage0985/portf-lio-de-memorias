document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;


  // =========================
  // TEMA CLARO / ESCURO
  // =========================

  const toggleBtn = document.createElement('button');

  toggleBtn.id = 'theme-toggle';
  toggleBtn.className = 'theme-toggle-btn';
  toggleBtn.innerText = '🌙 Modo Escuro';

  body.appendChild(toggleBtn);


  if (localStorage.getItem('theme') === 'dark') {

    body.classList.add('dark-mode');

    toggleBtn.innerText = '☀️ Modo Claro';

  }


  toggleBtn.addEventListener('click', () => {

    body.classList.toggle('dark-mode');

    const dark = body.classList.contains('dark-mode');

    toggleBtn.innerText =
      dark
        ? '☀️ Modo Claro'
        : '🌙 Modo Escuro';

    localStorage.setItem(
      'theme',
      dark ? 'dark' : 'light'
    );

  });



  // =========================
  // MENU
  // =========================

  const menuBtn =
    document.getElementById('menu-btn');

  const sidebar =
    document.getElementById('sidebar');

  const overlay =
    document.getElementById('overlay');


  function toggleMenu() {

    menuBtn.classList.toggle('open');

    sidebar.classList.toggle('open');

    overlay.classList.toggle('active');

  }


  menuBtn.addEventListener(
    'click',
    toggleMenu
  );

  overlay.addEventListener(
    'click',
    toggleMenu
  );



  // =========================
  // NAVEGAÇÃO DAS PÁGINAS
  // =========================

  const navItems =
    document.querySelectorAll('.nav-item');

  const sections =
    document.querySelectorAll('.page-section');


  navItems.forEach(item => {

    item.addEventListener('click', () => {

      navItems.forEach(nav => {

        nav.classList.remove('active');

      });


      item.classList.add('active');


      const target =
        item.dataset.target;


      sections.forEach(section => {

        section.classList.toggle(
          'active',
          section.id === target
        );

      });


      if (sidebar.classList.contains('open')) {

        toggleMenu();

      }

    });

  });



  // =========================
  // DECK DE MEMÓRIAS
  // =========================

  const slides =
    [...document.querySelectorAll('.memory-slide')];

  const counter =
    document.getElementById('slide-counter');

  const nextBtn =
    document.getElementById('next-btn');

  const prevBtn =
    document.getElementById('prev-btn');


  let current = 0;


  function updateDeck() {

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        'active',
        i === current
      );

    });


    counter.textContent =
      `${current + 1} / ${slides.length}`;


    prevBtn.disabled =
      current === 0;


    nextBtn.disabled =
      current === slides.length - 1;


    nextBtn.textContent =
      current === slides.length - 1
        ? 'Fim ✓'
        : 'Prosseguir →';


    // Último slide recebe a paleta amarelada

    body.classList.toggle(
      'sunset-mode',
      current === slides.length - 1
    );

  }



  function goToSlide(index) {

    current =
      Math.max(
        0,
        Math.min(
          slides.length - 1,
          index
        )
      );


    updateDeck();

  }



  nextBtn.addEventListener(
    'click',
    () => goToSlide(current + 1)
  );


  prevBtn.addEventListener(
    'click',
    () => goToSlide(current - 1)
  );



  // Botões internos dos slides

  document
    .querySelectorAll('.direct-next')
    .forEach(btn => {

      btn.addEventListener(
        'click',
        () => goToSlide(current + 1)
      );

    });



  // Voltar ao começo

  document
    .getElementById('restart-btn')
    ?.addEventListener(
      'click',
      () => goToSlide(0)
    );



  // =========================
  // TECLADO
  // =========================

  document.addEventListener(
    'keydown',
    e => {

      if (
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {

        if (
          document.querySelector(
            '#trajetoria.active'
          )
        ) {

          e.preventDefault();

          goToSlide(current + 1);

        }

      }


      if (
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {

        if (
          document.querySelector(
            '#trajetoria.active'
          )
        ) {

          e.preventDefault();

          goToSlide(current - 1);

        }

      }

    }
  );



  // =========================
  // INTERAÇÕES DAS MEMÓRIAS
  // =========================

  document
    .querySelectorAll('.chaos-btn')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        const target =
          btn.parentElement
            .querySelector('.hidden-message');


        if (!target) return;


        target.textContent =
          btn.dataset.message;


        target.classList.add('show');


        btn.textContent =
          '✓ Investigação concluída';


        btn.disabled = true;

      });

    });



  // =========================
  // VOTAÇÃO DO PRIMEIRO SLIDE
  // =========================

  const agree =
    document.getElementById('agree-btn');

  const disagree =
    document.getElementById('disagree-btn');

  const result =
    document.getElementById('poll-result');


  let disagreements = 0;


  disagree.addEventListener(
    'click',
    () => {

      disagreements++;


      const agreeScale =
        1 + disagreements * 0.65;


      const disagreeScale =
        Math.max(
          0.58,
          1 - disagreements * 0.08
        );


      agree.style.transform =
        `scale(${agreeScale})`;


      disagree.style.transform =
        `scale(${disagreeScale})`;


      agree.style.zIndex = 3;


      result.textContent =
        disagreements < 3
          ? 'O professor discorda da sua resposta.'
          : 'O professor discordou tanto que a opção CONCORDO tomou conta da votação.';

    }
  );


  agree.addEventListener(
    'click',
    () => {

      result.textContent =
        'Finalmente alguém concordou. Democracia restaurada.';

      agree.classList.add('selected');

    }
  );



  // Inicialização

  updateDeck();



  // =========================
  // CARDS DAS REDAÇÕES
  // =========================

  document
    .querySelectorAll('.card')
    .forEach(card => {

      const closeBtn =
        card.querySelector(
          '.close-card-btn'
        );


      card.addEventListener(
        'click',
        e => {

          if (
            !card.classList.contains('expanded') &&
            e.target !== closeBtn
          ) {

            card.classList.add('expanded');

            body.style.overflow =
              'hidden';

          }

        }
      );


      closeBtn?.addEventListener(
        'click',
        e => {

          e.stopPropagation();

          card.classList.remove(
            'expanded'
          );

          body.style.overflow = '';

        }
      );

    });



  // ESC fecha redação expandida

  document.addEventListener(
    'keydown',
    e => {

      if (e.key === 'Escape') {

        const expanded =
          document.querySelector(
            '.card.expanded'
          );


        if (expanded) {

          expanded.classList.remove(
            'expanded'
          );

          body.style.overflow = '';

        }

      }

    }
  );

});