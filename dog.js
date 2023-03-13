const breed = document.querySelector(".breeds")
const breedImg = document.querySelector(".breed-img")
const select = document.querySelector(".select-opt")
const btn = document.querySelector(".search-btn")
const input = document.querySelector(".search-input")




function retchAll() {
    axios(`https://dog.ceo/api/breeds/list/all`)
        .then((res) => {
            Object.keys(res.data.message).map((el) => {
                breed.innerHTML += `<button class="breed-btn btn btn-primary m-1">${el}</button>`
                select.innerHTML += `<option value="${el}">${el}</option>`
            })
        })
        .then(() => getBtn())
}
retchAll()

select.addEventListener("change", (e) => {
    retchImg(e.target.value)
})

function retchImg(name) {
    axios(`https://dog.ceo/api/breed/${name}/images/random`)
        .then((res) => {
            breedImg.innerHTML = `<img src="${res.data.message}"/>`
        })
}
retchImg()

function getBtn() {
    const buttons = document.querySelectorAll(".breed-btn")
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            retchImg(btn.innerHTML)
        })
    })
}
getBtn()


input.addEventListener("input", (e) => {
    retchImg(e.target.value)
})


btn.addEventListener("click", () => {
    retchImg(input.value.trim())
})
