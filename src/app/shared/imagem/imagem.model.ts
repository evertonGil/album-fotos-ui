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
    preview?: {
        path: string;
        altura: number;
        largura: number;
    };;
    vWeb?: {
        path: string;
        altura: number;
        largura: number;
    };
    vImpressao?: {
        path: string;
        altura: number;
        largura: number;
    };;
    mdc?: number;
    _id: string;
    proporcao?: {
        fracao: number[],
        decimal: number,
        orientacao: string // P - Paisagem, R - Retrato
    };
    position?: {
        y: number,
        x: number
    };

    countUse? = 0;
}