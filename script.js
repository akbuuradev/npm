const row = document.querySelector(".row")
const input = document.querySelector(".search-input")
const btn = document.querySelector(".search-btn")
const select = document.querySelector(".select-sort")
const selectReg = document.querySelector(".select-reg")


axios(`https://restcountries.com/v3.1/all`)
    .then((task) => {
        console.log(task.data)
        window.scroll(0,0)
        row.innerHTML = ""
        task.data.map((el) => {
            row.innerHTML += `<div class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px;">
<img src="${el.flags.svg}" alt="bg" width="100%" height="250px" class="card-img-top object-fit-cover border rounded">
<div class="card-body">
<h1>Страна - ${el.name.common}</h1>
<h2>Столица - ${el.capital ? el.capital:"No"}</h2>
<h2>Регионы - ${el.region}</h2>
<h2>Население - ${el.population}</h2>
<h2>Площодь - ${el.area}кв<sup>2</sup></h2>
<h2>Сокращ - ${el.fifa ? el.fifa:"No"}</h2>
</div>
</div>`
        })
    })

let all = null

function task(API) {
    axios(`https://restcountries.com/v3.1/${API}`)
        .then((res) => {
            all = res.data
            get(res.data)
        })
}

task("all")
btn.addEventListener("click", () => {
    task(`name/${input.value}`)
})

function get(data) {
    row.innerHTML = ""
    data.map((el) => {
        row.innerHTML += `<div class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px;">
<img src="${el.flags.svg}" alt="bg" width="100%" height="300px" class="card-img-top object-fit-cover border rounded">
<div class="card-bogy">
<h3>Страна - ${el.name.common}</h3>
<h4>Регионы - ${el.region}</h4>
<h4>Население - ${el.population}</h4>
<h4>Площодь - ${el.area}кв<sup>2</sup></h4>
<h4>Столица - ${el.capital}</h4>
<h4>Сокращ - ${el.fifa ? el.fifa : "No"}</h4>
</div>
</div>`
    })
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        task(`name/${input.value}`)
    }
})

input.addEventListener("input", (e) => {
    task(`name/${e.target.value}`)

})


select.addEventListener("change", (e) => {
    const value = e.target.value
        if (value === "population") {
            const result = all.sort((a, b) => {
                return b.population - a.population
    })
        get(result)
    } else if(value === "area") {
        const result = all.sort((a, b) => {
            return b.area - a.area
        })
        get(result)
    } else if (value === "A-Z") {
            const result = all.sort((a, b) => {
                if (b.name.common[0] > a.name.common[0]) {
                    return -1
                } else if (b.name.common[0] < a.name.common[0]) {
                    return 1
                }
            })
            get(result)
        } else if (value === "Z-A") {
            const result = all.sort((a, b) => {
               if (b.name.common[0] > a.name.common[0]) {
                   return 1
               } else if (b.name.common[0] < a.name.common[0]) {
                   return -1
               }
            })
            get(result)
        }
})

selectReg.addEventListener("change", (e) => {
    const value = e.target.value
    if (value === "Europe") {
        const result = all.filter((el) => {
            return el.region === "Europe"
        })
        get(result)
    } else if (value === "Asia") {
        const result = all.filter((el) => {
            return el.region === "Asia"
        })
        get(result)
    } else if (value === "Americas") {
        const result = all.filter((el) => {
            return el.region === "Americas"
        })
        get(result)
    } else if (value === "Africa") {
        const result = all.filter((el) => {
            return el.region === "Africa"
        })
        get(result)
    } else if (value === "Oceania") {
        const result = all.filter((el) => {
            return el.region === "Oceania"
        })
        get(result)
    }
})

