// Variáveis que armazenam as tag HTML
const imgInput = document.getElementById("imgInput");
let imgs = document.querySelectorAll("#clone .imgOriginal");
const imgSemBg = document.getElementById("imgSemBg");
const imgDownloadLink = document.getElementById("imgDownloadLink");

// Variável que vai receber a imagem no formato BLOB
let imgFile;

// Função que coloca a imagem do input no preview
const receberImagem = (e) => {
  console.log("Blob da imagem upada", e.target.files[0]);
  imgFile = e.target.files[0];
  for (let img of imgs) {
    img.src = URL.createObjectURL(imgFile);
  }
  modificarLogo("nova-img");
};
imgInput.addEventListener("input", receberImagem);

// Função que chama a API que remove o BG https://clipdrop.co/apis/docs/remove-background
const removerBackground = async () => {
  // Cria um FormData, é o formato que ele quer que envie o corpo com essas duas propiedades
  const formData = new FormData();
  formData.append("image_file", imgFile);
  formData.append("type", "png");

  // Headers da API
  const headers = {
    "user-agent": "ClipDrop-BatchProcess",
    "x-api-key":
      "9f37b4743e766de569aa487eba5e21267c0f404e53cd00ba8f3e8a373af32687ea72a071a84d8681e418747da37ce2a5",
  };

  // Fetch da API que tira o BG e retorna a imagem sem o bg
  await fetch(`https://clipdrop-api.co/remove-background/v1`, {
    method: "POST",
    headers,
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.blob();
      } else {
        throw "Erro na requisição";
      }
    })
    .then((blob) => {
      console.log(blob);
      const base64 = URL.createObjectURL(blob);
      console.log(base64);
      for (let img of imgs) {
        img.src = base64;
      }
    })
    .catch((error) => console.error(error));
};

// Variáveis responsáveis pela estilização da logo
let tamanhoValue = 1;
let posX = 0;
let posY = 0;
let inverterValue = 0;
let pbValue = 0;

// Função que recebe um atributo responsável pela estilização da logo
const modificarLogo = (atributo) => {
  switch (atributo) {
    case "inverter":
      if (inverterValue === 0) {
        inverterValue = 1;
      } else {
        inverterValue = 0;
      }
      break;
    case "aumentar":
      tamanhoValue += 0.05;
      break;
    case "diminuir":
      tamanhoValue -= 0.05;
      break;
    case "direita":
      posX += 3;
      break;
    case "esquerda":
      posX -= 3;
      break;
    case "cima":
      posY -= 3;
      break;
    case "baixo":
      posY += 3;
      break;
    case "pb":
      if (pbValue === 1) {
        pbValue = 0;
        document.getElementById("pb-btn").innerHTML = "Aplicar Preto&Branco";
      } else {
        pbValue = 1;
        document.getElementById("pb-btn").innerHTML = "Remover Preto&Branco";
      }
      break;
    case "nova-img":
      tamanhoValue = 1;
      posX = 0;
      posY = 0;
      inverterValue = 0;
      pbValue = 0;
  }

  let count = 0;

  for (img of imgs) {
    count++;
    if (count === 2) {
      img.style.transform = `rotateY(180deg) scale(${tamanhoValue}) translateX(${posX}px) translateY(${posY}px)`;
    } else {
      img.style.transform = `scale(${tamanhoValue}) translateX(${posX}px) translateY(${posY}px)`;
    }
    img.style.filter = `invert(${inverterValue}) grayscale(${pbValue})`;
    if (count === 3) count = 0;
  }

  count = 0;
};

// Objeto com todas as informações do modelo TRUCKER
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

// Objeto com todas as informações do modelo AMERICANO
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

// Armazena os modelos
let modelos = [];
modelos.push(trucker, americano);

// Variáveis para tratar o DOM
const imgFrenteBone = document.getElementById("front-bone");
const imgAtrasBone = document.getElementById("back-bone");
const imgEsquerdaBone = document.getElementById("left-bone");
const imgDireitaBone = document.getElementById("right-bone");
const modeloName = document.getElementById("modelo-name");
const modeloValue = document.getElementById("modelo-value");
const ul = document.getElementById("info-list");

// Função responsável pela inserção das informações do modelo no preview
const modeloSelector = (modelo) => {
  let infoList = "";
  let chave = "";

  switch (modelo) {
    case "trucker":
      document.getElementById("model-btn").innerHTML = modelos[0].name;
      imgFrenteBone.src = "./assets/img/Modelos/modelo1.1.png";
      imgAtrasBone.src = "./assets/img/Modelos/modelo1.2.png";
      imgEsquerdaBone.src = "./assets/img/Modelos/modelo1.3.png";
      imgDireitaBone.src = "./assets/img/Modelos/modelo1.4.png";
      modeloName.innerHTML = modelos[0].name.toUpperCase();
      modeloValue.innerHTML = modelos[0].preco.toUpperCase();

      for (let [key, value] of Object.entries(modelos[0])) {
        if (key === "name" || key === "preco") continue;
        if (key === "botao") {
          chave = "Botão";
        } else if (key === "abaEmbaixo") {
          chave = "Aba Embaixo";
        } else if (key === "abaSanduiche") {
          chave = "Aba Sanduíche";
        } else if (key === "abaRasgada") {
          chave = "Aba Rasgada";
        } else if (key === "costuraAba") {
          chave = "Costura Aba";
        } else if (key === "ilhos") {
          chave = "Ilhós";
        } else {
          chave = key;
        }

        infoList += `<li><b>${chave.toUpperCase()}:</b> ${value.toUpperCase()}</li>`;
      }

      break;
    case "americano":
      document.getElementById("model-btn").innerHTML = modelos[1].name;
      imgFrenteBone.src = "./assets/img/Modelos/modelo2.1.png";
      imgAtrasBone.src = "./assets/img/Modelos/modelo2.2.png";
      imgEsquerdaBone.src = "./assets/img/Modelos/modelo2.3.png";
      imgDireitaBone.src = "./assets/img/Modelos/modelo2.4.png";
      modeloName.innerHTML = modelos[1].name.toUpperCase();
      modeloValue.innerHTML = modelos[1].preco.toUpperCase();

      for (let [key, value] of Object.entries(modelos[1])) {
        if (key === "name" || key === "preco") continue;
        if (key === "botao") {
          chave = "Botão";
        } else if (key === "abaEmbaixo") {
          chave = "Aba Embaixo";
        } else if (key === "abaSanduiche") {
          chave = "Aba Sanduíche";
        } else if (key === "abaRasgada") {
          chave = "Aba Rasgada";
        } else if (key === "costuraAba") {
          chave = "Costura Aba";
        } else if (key === "ilhos") {
          chave = "Ilhós";
        } else {
          chave = key;
        }

        infoList += `<li><b>${chave.toUpperCase()}:</b> ${value.toUpperCase()}</li>`;
      }

      break;
  }

  ul.innerHTML = infoList;
};

modeloSelector("trucker");

// Função responsável pelo armazenamento da estilização da logo em um modelo
const clonarHTML = () => {
  const node = document.getElementById("clone");
  const clone = node.cloneNode(true);
  clone.id = "cloned";
  document.getElementById("layout-clone").appendChild(clone);
  document.getElementById("layout-ready").style.opacity = "1";
};

// Função responsável pela estilização do menu de estilização
const toggleFilters = () => {
  document.getElementById("container").classList.toggle("closed");
};
