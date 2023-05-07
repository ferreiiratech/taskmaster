const main = document.querySelector("main");
const btnRegister = document.querySelector(".btn-register");
const divLogin = document.querySelector(".div-login");
const divHomeCadastro = document.querySelector(".div-home-cadastro");
const formCadastro = document.querySelector(".form-cadastro");
const btnCancelar = document.querySelector(".btn-cancelar");

// image profile
const img = document.querySelector(".img-t");
const inputImg = document.getElementById("image-input");
const imgProfile = document.querySelector(".img-profile");

// Armazena os itens temporariamente
const arrayElementDivHome = [];
const arrayElementDivCadastro = [];
const arrayElementDivlogin = [];

// Altera title da página
const changePageTitle = (title) => {
  document.title = "TaskMaster";
  if (title != undefined) {
    document.title += title;
  }
};

// Armazenar os itens nos arrays
const storesArrayElements = (div, array) => {
  for (let i = 0; i < div.children.length; i++) {
    array.push(div.children[i]);
  }
};

// Exibe ou limpa os elementos na página
const showOrClearElements = (array, action, length) => {
  array == arrayElementDivHome ? (length = 4) : length;
  for (let i = 0; i < length; i++) {
    array[i].style.display = action;
    if (array[i].classList.value == "logo-page") {
      array[i].style.display = "flex";
    }
  }
};

const openRegister = () => {
  main.style.animation = "btnRegisterAnimation 0.4s ease-in-out forwards";
  clearHome();
  inputImg;
};

// Remove os elementos dos array, assim, alterando a home e mostra a area de cadastro
const clearHome = () => {
  changePageTitle(" | Cadastro");

  // limpa area de login
  storesArrayElements(divLogin, arrayElementDivlogin);
  showOrClearElements(
    arrayElementDivlogin,
    "none",
    arrayElementDivlogin.length
  );

  // limpa area de cadastro
  storesArrayElements(divHomeCadastro, arrayElementDivHome);
  showOrClearElements(arrayElementDivHome, "none", arrayElementDivHome.length);

  // exibe cadastro
  setTimeout(() => (formCadastro.style.display = "flex"), 350);
};

// apaga area de cadastro e volta para o home
const openHome = () => {
  main.style.animation = "btnRegisterAnimationReverso 0.4s ease-in-out";
  formCadastro.style.display = "none";
  showOrClearElements(
    arrayElementDivCadastro,
    "block",
    arrayElementDivCadastro.length
  );

  setTimeout(
    () =>
      showOrClearElements(
        arrayElementDivlogin,
        "block",
        arrayElementDivlogin.length
      ),
    350
  );

  setTimeout(
    () =>
      showOrClearElements(
        arrayElementDivHome,
        "block",
        arrayElementDivHome.length
      ),
    350
  );

  changePageTitle();

  imgProfile.style.backgroundImage = "url('img/profile.svg')";
};

// upload da imagem profile
const uploadImageProfile = () => {
  const file = inputImg.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    imgProfile.innerHTML = "";
    imgProfile.style.backgroundImage = `url(${reader.result})`;
    // img.setAttribute('src', reader.result);
  });
  reader.readAsDataURL(file);
};

// eventos
btnRegister.addEventListener("click", openRegister);
btnCancelar.addEventListener("click", openHome);
inputImg.addEventListener("change", uploadImageProfile);
