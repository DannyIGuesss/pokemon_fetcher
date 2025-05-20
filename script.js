document.getElementById("fetchBtn").addEventListener("click", async ()=> {
  const name = document.getElementById("pokemonInput").value.toLowerCase();
  const display = document.getElementById("pokemonInfo")

  if(!name) {
    display.innerHTML = "Please enter a Pokémon name.";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();
    
    const types = data.types.map(t => t.type.name).join(',');
    const stats = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');

    display.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><strong>Type:</strong> ${types}</p>
      <ul>${stats}</ul>
    `;
  } catch (error) {
    display.innerHTML = `<p>${error.message}</p>`
  }

})