document.addEventListener('DOMContentLoaded', () => {
  // 1. BOTÃO DE TEMA (MANTIDO DO CÓDIGO ORIGINAL)
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'theme-toggle';
  toggleBtn.className = 'theme-toggle-btn';
  toggleBtn.innerText = '🌙 Modo Escuro';
  document.body.appendChild(toggleBtn);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.innerText = '☀️ Modo Claro';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      toggleBtn.innerText = '☀️ Modo Claro';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.innerText = '🌙 Modo Escuro';
      localStorage.setItem('theme', 'light');
    }
  });

  // 2. CONTROLE DO MENU LATERAL (3 RISCOS HORIZONTAIS)
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function toggleMenu() {
    menuBtn.classList.toggle('open');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // 3. NAVEGAÇÃO ENTRE "TRAJETÓRIA ESCOLAR" E "REDAÇÕES"
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Atualiza botão ativo no menu
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Mostra a seção correspondente
      const targetId = item.getAttribute('data-target');
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === targetId) {
          sec.classList.add('active');
        }
      });

      // Fecha o menu lateral após selecionar
      toggleMenu();
    });
  });

  // 4. EXPANSÃO DOS CARDS DE REDAÇÃO PARA TELA INTEIRA
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const closeBtn = card.querySelector('.close-card-btn');

    // Abre o card em tela inteira ao clicar nele
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('expanded')) {
        card.classList.add('expanded');
        document.body.style.overflow = 'hidden'; // Impede rolagem da página atrás
      }
    });

    // Fecha o card ao clicar no "X"
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita reabrir o card pelo clique pai
      card.classList.remove('expanded');
      document.body.style.overflow = '';
    });
  });

  // Permite fechar o card expandido pressionando a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const expandedCard = document.querySelector('.card.expanded');
      if (expandedCard) {
        expandedCard.classList.remove('expanded');
        document.body.style.overflow = '';
      }
    }
  });
});