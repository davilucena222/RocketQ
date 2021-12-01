export default function Modal(){

    const modalWrapper = document.querySelector('.modal-wrapper')

    // selecionando o botão "cancel"
    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)

    function open(){
        //funcionaldiade de atribuir a classe active para a modal
        modalWrapper.classList.add("active")
    }
    function close(){
        //funcionalidade de remover a classe active da modal
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}
