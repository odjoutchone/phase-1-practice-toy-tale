let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      // Take my toys array make HTML with them in order to add them to the DOM
      let toysHTML = toys.map(function(toy) {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes}</p>
          <button class="like-btn" id="[toy_id]">Like ❤️</button>
        </div>
        `
      })
      document.querySelector("#toy-collection").innerHTML = toysHTML.join('')
      toyFormContainer.addEventListener("submit", function(){
        e.preventDefault()
        console.log(e.target.name)
        // Grab the inputs from form
        const toyName = e.target.name.value
        const toyImage = e.target.image.value

        fetch("http://localhost:3000/toys", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: toyName,
            image: toyImage,
            likes: 99
          })
      
        })
        .then(r =>r,json())
        .then(newToy => {
          console.log(newToy)
          //fetch updated the DB
          // Now I need to update the DOM
          // Converrt the newToy from JSON to HTML in order to add to DA DOM.com
          let newToyHTML = `
           <div class="card">
            <h2>${newToy.name}</h2>
            <img src=${newToy.image} class="toy-avatar" />
            <p>${newToy.likes}</p>
            <button class="like-btn" id="[toy_id]">Like ❤️</button>
          </div>
          `
          toyCollection.innerHTML +=newToyHTML
          console.log(e.target.reset())
          toyCollection.addEventListener("click", (e) =>{
            if (e.target.className === "like-btn") {
              let currentLikes = parseInt(e.target.previousElementsSibling.innerText)
              let newLikes = currentLikes + 1
              e.target.previousElementsSibling.innerText = newLikes + "likes"

              fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
                method: "PATCHT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                  likes: newLikes
                })
              })
            }
          }) 
        })
      })       

    })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      // submit listener here
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});





