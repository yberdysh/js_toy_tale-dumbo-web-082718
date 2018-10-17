document.addEventListener("DOMContentLoaded", async () => {
  const toyDiv = document.querySelector('#toy-collection')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  toyForm.addEventListener("submit", makeNewToy)

  let toys = await fetchToys()
  renderToys(toys)

  addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


  async function fetchToys(){
    const res = await fetch("http://localhost:3000/toys")
    return await res.json()
  }

  function renderToys(toys){
    toys.forEach(toy => renderDiv(toy))
  }

  function renderDiv(toy){
    let card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar">index.js<p>${toy.likes}</p><button class="like-btn" data-id="${toy.id}">Like <3</button>`
    const likeBtn = card.querySelector('.like-btn')
    likeBtn.addEventListener("click", increaseLikes)
    toyDiv.append(card)
  }

  async function makeNewToy(event){
    event.preventDefault()
    const name = event.target.name.value
    const image = event.target.image.value
    let response = await fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, image})
    })
    let newToy = await response.json()
    renderDiv(newToy)
  }

  async function increaseLikes(event){
    let id = event.target.getAttribute("data-id")
    let parent = event.target.parentElement
    let numLikes = parseInt(parent.querySelector('p').innerText)
    parent.querySelector('p').innerText = numLikes + 1
    await fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: numLikes + 1})
    })
  }

})

