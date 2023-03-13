const user = document.querySelector(".user")
const input = document.querySelector(".search-input")
const btn = document.querySelector(".search-btn")
const select = document.querySelector(".select-sort")
const selectReg = document.querySelector(".select-reg")


axios(`https://jsonplaceholder.typicode.com/users`)
    .then((use) => {
        console.log(use.data)
        use.data.map((el) => {
            user.innerHTML += `<div class="col-4 my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px;">
                <img src="./img/user.png" alt="img" width="60%" height="200px" class="user-img d-flex align-items-center justify-content-space-between">
<h2> Имя - ${el.name}</h2>
<h3>Адрес - ${el.address.city}</h3>
<h3>Email - ${el.email}</h3>
<h3>Веб-сайт - ${el.website}</h3>
<a class="user-tel" href="tel:+996">Тел - ${el.phone}</a>
            </div>`
        })
    })


