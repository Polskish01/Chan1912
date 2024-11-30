const formPostagem = document.getElementById('form-postagem');
const listaThreads = document.getElementById('lista-threads');
const senhaInput = document.getElementById('senha');
const verificarSenhaBtn = document.getElementById('verificar-senha');
let isAdmin = false;
const senhaCorreta = "sua_senha";

verificarSenhaBtn.addEventListener("click", verificarSenha);

formPostagem.addEventListener('submit', criarThread);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('responder')) {
    responderThread(e.target);
  } else if (e.target.classList.contains('excluir-thread') && isAdmin) {
    excluirThread(e.target);
  } else if (e.target.classList.contains('excluir-comentario') && isAdmin) {
    excluirComentario(e.target);
  }
});

function verificarSenha() {
  const senhaDigitada = senhaInput.value;
  if (senhaDigitada === senhaCorreta) {
    isAdmin = true;
    alert("Senha correta!");
  } else {
    isAdmin = false;
    alert("Senha incorreta!");
  }
}

function criarThread(e) {
  e.preventDefault();
  const mensagem = formPostagem.mensagem.value;
  const arquivo = formPostagem.arquivo.files[0];
  const codigo = Math.floor(Math.random() * 1000000);
  const nome = isAdmin ? `ADM#${codigo}` : `Anônimo#${codigo}`;
  const thread = document.createElement('li');
  thread.setAttribute('data-id', `thread-${codigo}`);
  thread.classList.add('thread');
  
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = () => {
      thread.innerHTML = `
        <h3>${nome}</h3>
        <img src="${leitor.result}" width="100" height="100">
        <p>${mensagem}</p>
        <button class="responder">Responder</button>
        <button class="excluir-thread">Excluir</button>
        <div class="comentarios"></div>
      `;
      listaThreads.appendChild(thread);
    };
    leitor.readAsDataURL(arquivo);
  } else {
    thread.innerHTML = `
      <h3>${nome}</h3>
      <p>${mensagem}</p>
      <button class="responder">Responder</button>
      <button class="excluir-thread">Excluir</button>
      <div class="comentarios"></div>
    `;
    listaThreads.appendChild(thread);
  }
}

function responderThread(botao) {
  const thread = botao.parentNode;
  const comentarios = thread.querySelector('.comentarios');
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
    const nomeComentario = isAdmin ? `ADM#${codigoComentario}` : `Anônimo#${codigoComentario}`;
    const comentario = document.createElement('p');
    comentario.innerHTML = `<strong>${nomeComentario}</strong>: ${mensagemComentario} <button class="excluir-comentario">Excluir</button>`;
    comentarios.appendChild(comentario);
    formularioComentario.remove();
  });
}

function excluirThread(botao) {
  const thread = botao.parentNode;
  thread.remove();
}

function excluirComentario(botao) {
  const comentario = botao.parentNode;
  comentario.remove();
}