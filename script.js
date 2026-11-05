document.addEventListener('DOMContentLoaded', () => {
  // Cria o botão dinamicamente e adiciona no canto superior direito
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'theme-toggle';
  toggleBtn.className = 'theme-toggle-btn';
  toggleBtn.innerText = '🌙 Modo Escuro';
  document.body.appendChild(toggleBtn);

  // Verifica se o usuário já tinha uma preferência salva
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.innerText = '☀️ Modo Claro';
  }

  // Alterna o tema ao clicar no botão
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Atualiza o texto do botão e salva a preferência no localStorage
    if (isDarkMode) {
      toggleBtn.innerText = '☀️ Modo Claro';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.innerText = '🌙 Modo Escuro';
      localStorage.setItem('theme', 'light');
    }
  });
});