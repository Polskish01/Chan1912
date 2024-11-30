const formPostagem = document.getElementById('form-postagem');
const listaThreads = document.getElementById('lista-threads');

formPostagem.addEventListener('submit', (e) => {
  e.preventDefault();
  const mensagem = formPostagem.mensagem.value;
  const codigo = Math.floor(Math.random() * 1000000);
  const nome = `Anônimo#${codigo}`;

  const thread = document.createElement('li');
  thread.classList.add('thread');
  thread.innerHTML = `
    <h3>${nome}</h3>
    <p>${mensagem}</p>
    <button class="responder">Responder</button>
    <div class="comentarios"></div>
  `;

  listaThreads.appendChild(thread);
  formPostagem.mensagem.value = '';
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('responder')) {
    const thread = e.target.parentNode;
    const comentarios = thread.querySelector('.comentarios');
    const formularioComentario = document.createElement('form');
    formularioComentario.innerHTML = `
      <input type="text" id="nome-comentario" name="nome" placeholder="Anônimo">
      <textarea name="mensagem" placeholder="Mensagem"></textarea>
      <button>Comentar</button>
    `;

    comentarios.appendChild(formularioComentario);

    formularioComentario.innerHTML = `
    <textarea name="mensagem" placeholder="Mensagem"></textarea>
    <button>Comentar</button>
  `;
  formularioComentario.addEventListener('submit', (e) => {
    e.preventDefault();
    const mensagemComentario = formularioComentario.mensagem.value;
    const codigoComentario = Math.floor(Math.random() * 1000000);
    const nomeComentario = `Anônimo#${codigoComentario}`;
  
    const comentario = document.createElement('p');
    comentario.innerHTML = `<strong>${nomeComentario}</strong>: ${mensagemComentario}`;
  
    comentarios.appendChild(comentario);
    formularioComentario.remove();
  });  
    ('submit', (e) => {
      e.preventDefault();
      const mensagemComentario = formularioComentario.mensagem.value;
      const codigoComentario = Math.floor(Math.random() * 1000000);
      const nomeComentario = `Anônimo#${codigoComentario}`;

      const comentario = document.createElement('p');
      comentario.innerHTML = `<strong>${nomeComentario}</strong>: ${mensagemComentario}`;

      comentarios.appendChild(comentario);
      formularioComentario.remove();
    });
  }
});