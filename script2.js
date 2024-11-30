// Seleciona todos os boards
const boards = document.querySelectorAll('.board');

// Adiciona evento de clique em cada board
boards.forEach((board) => {
 board.addEventListener('click', () => {
 const tema = board.dataset.tema;
 abrirPagina(tema);
 });
});

// Função para abrir página de conteúdo
function abrirPagina(tema) {
 const pagina = document.getElementById(`pagina-${tema}`);
 const paginas = document.querySelectorAll('.pagina');
 
 // Oculta todas as páginas
 paginas.forEach((pagina) => {
 pagina.style.display = 'none';
 });
 
 // Exibe a página selecionada
 pagina.style.display = 'block';
}