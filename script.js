const formPostagem = document.getElementById('form-postagem');
const listaThreads = document.getElementById('lista-threads');
const senhaInput = document.getElementById('senha');
const verificarSenhaBtn = document.getElementById('verificar-senha');
let isAdmin = false;
const senhaCorreta = "ovo"; // defina sua senha aqui

verificarSenhaBtn.addEventListener("click", () => {
  const senhaDigitada = senhaInput.value;
  if (senhaDigitada === senhaCorreta) {
    isAdmin = true;
    alert("Senha correta!");
  } else {
    isAdmin = false;
    alert("Senha incorreta!");
  }
});

formPostagem.addEventListener('submit', (e) => {
  e.preventDefault();
  const mensagem = formPostagem.mensagem.value;
  const arquivo = formPostagem.arquivo.files[0];
  const codigo = Math.floor(Math.random() * 1000000);
  const nome = isAdmin ? "ADM" : `Anônimo#${codigo}`;
  const thread = document.createElement('li');
  thread.classList.add('thread');
  
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = () => {
      thread.innerHTML = `
        <h3>${nome}</h3>
        <img src="${leitor.result}" width="100%">
        <p>${mensagem}</p>
        <button class="responder">Responder</button>
        <div class="comentarios"></div>
      `;
    };
    leitor.readAsDataURL(arquivo);
  } else {
    thread.innerHTML = `
      <h3>${nome}</h3>
      <p>${mensagem}</p>
      <button class="responder">Responder</button>
      <div class="comentarios"></div>
    `;
  }
  
  listaThreads.appendChild(thread);
  formPostagem.mensagem.value = '';
  formPostagem.arquivo.value = '';
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('responder')) {
    const thread = e.target.parentNode;
    const comentarios = thread.querySelector('.comentarios');
    
    if (!comentarios.querySelector('form')) {
      const formularioComentario = document.createElement('form');
      formularioComentario.innerHTML = `
        <textarea name="mensagem" placeholder="Mensagem"></textarea>
        <button>Comentar</button>
      `;
      
      comentarios.appendChild(formularioComentario);
      
      formularioComentario.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensagemComentario = formularioComentario.mensagem.value;
        const codigoComentario = Math.floor(Math.random() * 1000000);
        const nomeComentario = isAdmin ? "ADM" : `Anônimo#${codigoComentario}`;
        const comentario = document.createElement('p');
        
        comentario.innerHTML = `<strong>${nomeComentario}</strong>: ${mensagemComentario}`;
        comentarios.appendChild(comentario);
        formularioComentario.remove();
      });
    }
  }
});