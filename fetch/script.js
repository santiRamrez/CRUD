const d = document,
  $form = d.querySelector(".form"),
  $title = d.querySelector(".crud-title"),
  $template = d.querySelector("#crudTemplate").content,
  $fragment = d.createDocumentFragment();

let globalData = "";

//Using .then in a simple GET Request
const starting = () => {
  try {
    fetch("http://localhost:3000/salad-food")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((obj) => {
          $template.querySelector(".name").textContent = obj.name;
          $template.querySelector(".price").textContent = obj.price;
          console.log(obj.name);
          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });

        d.querySelector("tbody").appendChild($fragment);
      });
  } catch (error) {
    console.log(error);
  }
};

// const starting2 = async () => {
//   try {
//     let response = await fetch("http://localhost:3000/salad-food");
//     let data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

d.addEventListener("DOMContentLoaded", starting);
