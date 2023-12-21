window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search); // pega os parâmetros da URL
    const score = urlParams.get('score');

    document.getElementById('score').innerHTML = score;
}