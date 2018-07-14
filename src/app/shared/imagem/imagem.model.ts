export class ImagemModel {
    /**
     * Nome da image 
     * */
    titulo?: string;
    /**
     * Caminho da imagem
     * './img.jpg'
     */
    path?: string;
    /**
     * altura numero sem px
     */
    altura?: number;
    /**
     * Largura numero sem px
     */
    largura?: number;

    mdc?: number;
    id: string;
    proporcao?: {
        fracao: number[],
        decimal: number
    };
    position?: {
        y: number,
        x: number
    };


}