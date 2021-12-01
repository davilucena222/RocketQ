// capturando o id da página com um clique
const copyButton = document.querySelector('div .buttons .outlined')

//ao clicar no botão executa uma função
copyButton.addEventListener('click', () => {
    const copyRoomId = document.querySelector('#copyRoomId')
    copyRoomId.select()
    document.execCommand('copy')
    alert(`O número identificador da sala foi copiado para área de transferência: "${copyRoomId.value}!!"`)
})