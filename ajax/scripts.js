const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".form"),
  $title = d.querySelector(".crud-title"),
  $template = d.querySelector("#crudTemplate").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.send(JSON.stringify(data));
};

const getAllSaladFood = () => {
  ajax({
    // method: "GET",
    url: "http://localhost:3000/salad-food",
    success: (res) => {
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".price").textContent = el.price;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.name;
        $template.querySelector(".edit").dataset.price = el.price;
        $template.querySelector(".delete").dataset.id = el.id;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });

      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.error(err);
      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
    data: null,
  });
};

d.addEventListener("DOMContentLoaded", getAllSaladFood);

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Create - POST
      ajax({
        url: "http://localhost:3000/salad-food",
        method: "POST",
        success: (res) => location.reload(),
        error: () => $form.insertAdjacentHTML(`<p><b>${err}</b></p>`),
        data: {
          name: e.target.name.value,
          price: e.target.price.value,
        },
      });
    } else {
      //Update - PUT
      ajax({
        url: `http://localhost:3000/salad-food/${e.target.id.value}`,
        method: "PUT",
        success: (res) => location.reload(),
        error: () =>
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
          name: e.target.name.value,
          price: e.target.price.value,
        },
      });
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Plato";
    $form.name.value = e.target.dataset.name;
    $form.price.value = e.target.dataset.price;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    //Delete - It must not have data at all
    ajax({
      url: `http://localhost:3000/salad-food/${e.target.dataset.id}`,
      method: "DELETE",
      success: (res) => location.reload(),
      error: () => alert(error),
    });
  }
});
