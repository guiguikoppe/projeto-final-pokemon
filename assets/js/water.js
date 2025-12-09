async function criarCards() {
  const container = document.getElementById("container");

  const tipos = ["water"];

  for (const tipo of tipos) {
    const titulo = document.createElement("h2");

    //traduzir os nomes

    function traduzir() {
      if (tipo == "water") return "água";
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
      <h3>${det.name}</h3>
			<img src="${det.sprites.other["official-artwork"].front_default}">

		      `;
      const infoExtra = document.createElement("div");
      infoExtra.classList.add("info-extra");

      const attackStat = det.stats.find((stat) => stat.stat.name === "attack");
      const defenseStat = det.stats.find(
        (stat) => stat.stat.name === "defense"
      );

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
${
  attackStat
    ? `<div class="barra">
  <span>Ataque</span>
  <div class="progress">
    <div class="fill" style="width: ${attackStat.base_stat}%;">
      ${attackStat.base_stat}%  
    </div>
  </div>
</div>`
    : ""
}

${
  defenseStat
    ? `<div class="barra">
  <span>Defesa</span>
  <div class="progress">
    <div class="fill" style="width: ${defenseStat.base_stat}%;">
      ${defenseStat.base_stat}%
    </div>
  </div>
</div>`
    : ""
}


`;

      infoExtra.style.display = "none"; // começa escondido
      card.appendChild(infoExtra);

      card.addEventListener("click", () => abrirModal(det));

      area.appendChild(card);
    }

    container.appendChild(area);
  }
}

// executa assim que a pagina carregar
criarCards();
// ======== ELEMENTOS DO MODAL ========
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fechar");
const modalImg = document.getElementById("modal-img");
const modalNome = document.getElementById("modal-nome");
const modalInfo = document.getElementById("modal-info");

// ======== FUNÇÃO PARA ABRIR O MODAL =========
function abrirModal(det) {
  modal.style.display = "flex";

  modalImg.src = det.sprites.front_default;
  modalNome.textContent = det.name.toUpperCase();

  const attackStat = det.stats.find((stat) => stat.stat.name === "attack");
  const defenseStat = det.stats.find((stat) => stat.stat.name === "defense");
  const speedStat = det.stats.find((stat) => stat.stat.name === "speed");

  modalInfo.innerHTML = `
    <div class="modal-stat">
      <p><strong>ID:</strong> #${det.id}</p>
      <p><strong>Altura:</strong> ${det.height / 10} m</p>
      <p><strong>Peso:</strong> ${det.weight / 10} kg</p>
    </div>

    <div class="modal-stat">
      <p><strong>Tipos:</strong> ${det.types
        .map((t) => t.type.name)
        .join(", ")}</p>
      <p><strong>Habilidades:</strong> ${det.abilities
        .map((a) => a.ability.name)
        .join(", ")}</p>
    </div>

    ${
      attackStat
        ? `<div class="modal-barra">
      <span>Ataque</span>
      <div class="progress-modal">
        <div class="fill-modal" style="width: ${
          (attackStat.base_stat / 255) * 100
        }%;">
          ${attackStat.base_stat}
        </div>
      </div>
    </div>`
        : ""
    }

    ${
      defenseStat
        ? `<div class="modal-barra">
      <span>Defesa</span>
      <div class="progress-modal">
        <div class="fill-modal" style="width: ${
          (defenseStat.base_stat / 255) * 100
        }%;">
          ${defenseStat.base_stat}
        </div>
      </div>
    </div>`
        : ""
    }

    ${
      speedStat
        ? `<div class="modal-barra">
      <span>Velocidade</span>
      <div class="progress-modal">
        <div class="fill-modal" style="width: ${
          (speedStat.base_stat / 255) * 100
        }%;">
          ${speedStat.base_stat}
        </div>
      </div>
    </div>`
        : ""
    }
  `;
}

// ======== FECHAR O MODAL =========
fecharModal.addEventListener("click", () => (modal.style.display = "none"));

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

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
