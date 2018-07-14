export class  MdcHelper {

  constructor() { }
  
  public static reduzirFracao(numerador, denominador): number[] {
    let multiplicador = MdcHelper.mdc(numerador, denominador);
    return [numerador / multiplicador, denominador / multiplicador];
  }

  private static mdc = (a, b) => {
    return b ? MdcHelper.mdc(b, a % b) : a;
  };


}
