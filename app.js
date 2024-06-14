import express from "express";
import { pets } from "./petList.js";

const app = express();

// Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
      <li><a href="/animals/dogs">Dogs</a></li>
      <li><a href="/animals/cats">Cats</a></li>
      <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
  `);
});

// Animals route
app.get("/animals/:pet_type", (req, res) => {
  const { pet_type } = req.params;
  const animals = pets[pet_type]; //Fetching Data from the pets Object

  if (!animals) {
    res.send(`<p>No pets of type ${pet_type} found.</p>`);
  } else {
    res.send(`
      <h1>List of ${pet_type}</h1>
      <ul>
        ${animals
          .map(
            (pet, index) =>
              `<li><a href="/animals/${pet_type}/${index}">${pet.name}</a></li>`
          )
          .join("")}
      </ul>
    `);
  }
});

// Pet profile route
app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const petType = req.params.pet_type;
  const petId = parseInt(req.params.pet_id);

  const pet = pets[petType][petId];

  if (!pet) {
    res.send(`<p>No pet found with ID ${petId}.</p>`);
  } else {
    res.send(`
      <h1>${pet.name}</h1>
      <img src="${pet.url}" alt="${pet.name}">
      <p>${pet.description}</p>
      <ul>
        <li>Breed: ${pet.breed}</li>
        <li>Age: ${pet.age}</li>
      </ul>
    `);
  }
});

app.listen(8000, () => console.log("Server is running on port 8000"));
