<script setup lang="ts">
  const props = defineProps({
    width: {
      type: Number,
      default: 274
    }
  });
</script>

<template>
  <div class="cheat-sheet" :style="{ width }">
    <ul>
      <li>
        Lançar os dados e calcular as pontuações
      </li>
      <li>
        Determinar quais os jogadores que ganham um dado de consolação
      </li>
      <li>
        Trocar dados
      </li>
      <li>
        Escolher um novo dado
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .cheat-sheet {
    font-family: Calibri, sans-serif;
    box-sizing: border-box;
    color: #333;
    margin: 4px;
    border-radius: 5px;
    background-color: white;
    border: 3px solid #666;
    width: 274px;
    text-align: start;
    vertical-align: top;
  }

  ul {
    margin: 2px;
    padding-left: 12px;
  }

  li {
    font-size: 8px;
  }

  li::marker {
    content: counter(list-item, number) ". ";
    color: #333;
  }

</style>


<!-- <li>
            Lanzar dados y calcular puntuación / Lançar os dados e calcular as pontuações / Tirare i dadi e calcolare il punteggio
          </li>
          <li>
            Determinar qué jugadores reciben dados piadosos / Determinar quais os jogadores que ganham um dado de consolação / Determinare chi ottiene i dadi pietà
          </li>
          <li>
            Canjear dados / Trocar dados / Scambiare i dadi
          </li>
          <li>
            Elegir un nuevo dado / Escolher um novo dado / Scegliere un nuovo dado
          </li> -->