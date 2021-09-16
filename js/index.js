const form = document.getElementById("create-monster-form")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const [name, age, description] = event.target

    fetch("http://localhost:3000/monsters", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            name: name.value, 
            age: age.value, 
            description: description.value
        })
    })
    .then(response => response.json())
    .then(response => console.log(response))
})


// GET http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}
let pageNumber = 1

function fetchMonster() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(response => response.json())
        .then(response =>  response.forEach(r => showMonster(r)))
}
fetchMonster()


function showMonster(monster) {
    const monsterContainer = document.querySelector('#monster-container')
    const h1 = document.createElement("h1")
    h1.textContent = monster.name
    const h2 = document.createElement("h2")
    h2.textContent = monster.age
    const h3 = document.createElement("h3")
    h3.textContent = monster.description
    monsterContainer.append(h1, h2, h3)
}

// const back = document.querySelector("#back")
// back.addEventListener("click", handleBackClick)
// const front = document.querySelector("#front")


document.addEventListener("click", (event) => {
    if(event.target.matches("button#forward")) {
        event.preventDefault()
        handleFrontClick()
    }
    if(event.target.matches("#back")) {
        // handleBackClick()
    }
})

const handleFrontClick = () => {
    pageNumber += 1
    const monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ""
    fetchMonster()

}

