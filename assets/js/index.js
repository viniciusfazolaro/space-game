const buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const diff = btn.id; // verifica a dificuldade
        window.location.href = 'game.html?diff=' + diff; // redireciona para a página do jogo
    })
})