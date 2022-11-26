

onmessage = function(evt) {
    const startTime = Date.now();
    const mensagem = evt.data;

    function stopWhile() {
        const podeContinuar = Date.now() - startTime < 10000;
        return podeContinuar;
    }

    while (mensagem.slotsParaPreencher.length > 0 && stopWhile()) {

        let listadeImagensOrdenadas = [].concat(mensagem.imagensPreviewApi);

        mensagem.slotsParaPreencher.forEach((slot, i, arr) => {

            listadeImagensOrdenadas.sort((a, b) => {
                const decimalA = slot.proporcao.decimal - a.proporcao.decimal;
                const decimalB = slot.proporcao.decimal - b.proporcao.decimal;
                if (Math.abs(decimalA) < Math.abs(decimalB)) {
                    return -1;
                } else {
                    return 1;
                }
            });

            // Caso seja a mesma orientação remove da lista matrizSuffle e da lista de imagens shuffle
            if (listadeImagensOrdenadas[0].proporcao.orientacao === slot.proporcao.orientacao) {
                const imagemCompativel = listadeImagensOrdenadas.shift();
                
                mensagem.slotsParaPreencher.splice(i, 1);
                mensagem.listaImagens[mensagem.listaImagens.indexOf(slot)].path = mensagem.urlPublica + imagemCompativel.vWeb.path;

                if (!listadeImagensOrdenadas.length) {
                    listadeImagensOrdenadas = [].concat(mensagem.imagensPreviewApi);
                }
            }

        });

    }
    
    this.self.postMessage(mensagem.listaImagens);
}
