const trucker = {
  name: "Modelo 03: Trucker",
  preco: "R$: 32",
  frente: "Preto Vicmax",
  aba: "Camurça Caramelo",
  tela: "Preto",
  botao: "Preto Vicmax",
  fechador: "Preto",
  abaEmbaixo: "Camurça Caramelo",
  abaSanduiche: "",
  abaRasgada: "",
  costuraAba: "",
};

const americano = {
  name: "Modelo 04: Americano",
  preco: "R$: 33",
  frente: "Linho Bege",
  aba: "Linho Bege",
  copa: "Linho Bege",
  botao: "Linho Bege",
  fechador: "Bege",
  abaEmbaixo: "Linho Bege",
  abaSanduiche: "",
  abaRasgada: "",
  costuraAba: "",
  ilhos: "",
};

let modelos = [];
modelos.push(trucker, americano);
console.log(modelos[0].name);
console.log(modelos[1].name);

console.log(americano.length);
