async function criarCards() {
  const container = document.getElementById("container");

  //rocha, fantasma, dragao e aço -> tipos
  const tipos = ["fire"];

  for (const tipo of tipos) {
    const titulo = document.createElement("h2");

    //traduzir os nomes

    function traduzir() {
 if (tipo == "fire") return "fogo";
      else return "";
    }

    titulo.textContent = `${traduzir().toUpperCase()}`;
    titulo.classList.add("titulo-tipos");
    container.appendChild(titulo);

    const resp = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const data = await resp.json();

    const lista = data.pokemon.slice(0, 12);

    const area = document.createElement("div");
    area.classList.add("grupo-tipo");

    for (const p of lista) {
      const resp2 = await fetch(p.pokemon.url);
      const det = await resp2.json();

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
			<h4>#${det.id}</h4>
			<img src="${det.sprites.front_default}">
			<h3>${det.name}</h3>
		      `;
      const infoExtra = document.createElement("div");
      infoExtra.classList.add("info-extra");

	  const attackStat = det.stats.find(stat => stat.stat.name === 'attack');
	  const defenseStat = det.stats.find(stat => stat.stat.name === 'defense');

      // exemplo de informações extras
      infoExtra.innerHTML = `
    <p><strong>Altura:</strong> ${det.height}</p>
    <p><strong>Peso:</strong> ${det.weight}</p>
    <p><strong>Tipos:</strong> ${det.types
      .map((t) => t.type.name)
      .join(", ")}</p>
    <p><strong>Habilidades:</strong> ${det.abilities
      .map((a) => a.ability.name)
      .join(", ")}</p>
	  <p><strong>Força do Ataque:</strong> ${attackStat ? attackStat.base_stat : 'N/A'}</p>
	  <p><strong>Força da Defesa:</strong> ${defenseStat ? defenseStat.base_stat : 'N/A'}</p>

`;

      infoExtra.style.display = "none"; // começa escondido
      card.appendChild(infoExtra);

      // quando clicar no card, alterna a exibição
      card.addEventListener("click", () => {
        const aberto = card.classList.toggle("expandido");
        infoExtra.style.display = aberto ? "block" : "none";
      });

      area.appendChild(card);
    }

    container.appendChild(area);
  }
}

// executa assim que a pagina carregar
criarCards();
//Não mexer abaixo é apenas o codigo de claro e escuro---->
// botão
const botao = document.getElementById("tema-btn");

// verifica se o usuário já escolheu um tema antes
if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark");
    botao.textContent = "☀️ Modo Claro";
}

// clique para trocar o tema
botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const modoEscuroAtivo = document.body.classList.contains("dark");

    if (modoEscuroAtivo) {
        botao.textContent = "☀️ Modo Claro";
        localStorage.setItem("tema", "escuro");
    } else {
        botao.textContent = "🌙 Modo Escuro";
        localStorage.setItem("tema", "claro");
    }
});
