class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    //adição das porcentagens
    this.metodoDePagamento = {
      dinheiro: 0.95, // 5% para dinheiro
      debito: 1, // não possui desconto ou acréscimo
      credito: 1.03, // 3% para crédito
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.metodoDePagamento[formaDePagamento]) {
      return "Forma de pagamento inválida!"; //verifica a forma de pagamento
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!"; //verifica se o carrinho se está vazio
    }

    //variáveis
    let total = 0;
    let cafeC = 0;
    let sanduicheC = 0;
    let chantilyC = 0;
    let queijoC = 0;

    //calcula o valor total da compra
    for (let itemInfo of itens) {
      let [codigo, quantidade] = itemInfo.split(","); // divide a string em duas partes com a virgula

      // Verifica se o item do pedido existe no cardápio
      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      if (parseInt(quantidade) == 0) {
        return "Quantidade inválida!"; //verifica a quantidade de itens
      }

      //conta cafés e sanduíches para identificar itens extras
      if (codigo === "cafe") {
        cafeC += parseInt(quantidade);
      } else if (codigo === "sanduiche") {
        sanduicheC += parseInt(quantidade);
      }

      //adiciona o preço do item multiplicado pela quantidade ao total
      total += this.cardapio[codigo] * parseInt(quantidade);
    }

    //multiplica a forma de pagamento ao total
    total *= this.metodoDePagamento[formaDePagamento];

    //verifica se possui itens extras sem o seu item principal
    switch (true) {
      case chantilyC > 1:
      case queijoC > 1:
      case cafeC == 0:
        return "Item extra não pode ser pedido sem o principal";
      default:
        break;
    }
    //retorna o valor total como string
    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}
export { CaixaDaLanchonete };
