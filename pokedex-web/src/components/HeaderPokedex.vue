<template>
  <div class="header-container">
    <div class="header-row">
      <!-- Título e sprite -->
      <div class="header-left">
        <h2 class="title" @click="redirecionarPaginaPrincipal">PokeWeb V2</h2>
        <img :src="sprite" :width="50" class="sprite-image" @click="redirecionarPaginaPrincipal" />
      </div>

      <!-- V-Select -->
      <div class="header-center">
        <v-select
          v-if="showSelect"
          label="Geração"
          :items="generations"
          variant="underlined"
          v-model="selecGen"
          @update:modelValue="selecionarGeracao"
        ></v-select>
      </div>

      <!-- V-Autocomplete -->
      <div class="header-right">
        <v-autocomplete label="Pesquisar" :items="pokemonNames" v-model="searchTerm" @input="onPokemonSelected"></v-autocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import blaziken from '@/assets/blaziken.png';
import { getAllPkmn } from '@/services/pokeapiService';

export default {
  props: ['geracaoAtual'],
  data() {
    return {
      generations: ['Kanto', 'Jotho', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'],
      sprite: blaziken,
      selecGen: null,
      searchTerm: '',
      pokemonList: [],
      showSelect: true, // Define se o v-select será exibido ou não (true para exibir, false para ocultar)
    };
  },
  methods: {
    async fetchPokemonDataByGeneration(gen) {
      try {
        const pokemonsData = await getAllPkmn(gen);
        this.pokemonList = pokemonsData.map((pokemonData) => ({
          id: pokemonData.id,
          name: this.capitalizarNome(pokemonData.name),
          types: this.capitalizarNome(pokemonData.types),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    capitalizarNome(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
    redirecionarPaginaPrincipal() {
      this.$router.push('/');
    },
    onPokemonSelected(value) {
      // Encontrar o Pokémon selecionado com base no nome
      const selectedPokemon = this.pokemonList.find((pokemon) => pokemon.name === value);
      if (selectedPokemon) {
        // Redirecionar para a página de detalhes do Pokémon com base no ID selecionado no autocomplete
        this.$router.push({ name: 'detalhes', params: { id: selectedPokemon.id } });
      }
    },
    selecionarGeracao() {
      // Obter o índice da geração selecionada com base no seu nome
      const index = this.generations.indexOf(this.selecGen);
      this.fetchPokemonDataByGeneration(index + 1); // Adicionar 1 ao índice pois os índices das gerações começam em 0
      // Emitir evento para informar a mudança de geração para a página principal
      this.$emit('mudar-geracao', index + 1);
    },
  },
  computed: {
    // Obter uma lista somente com os nomes dos Pokémon
    pokemonNames() {
      return this.pokemonList.map((pokemon) => pokemon.name);
    },
  },
  mounted() {
    // Carregar dados de todos os Pokémon quando o componente for montado
    this.fetchPokemonDataByGeneration(this.geracaoAtual);
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Subrayada:wght@700&display=swap');

/* Estilos do header */
.header-container {
  padding: 10px; /* Espaçamento interno para o header */
  background-color: #FFD700; /* Cor de fundo laranja */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-family: 'Montserrat Subrayada', sans-serif;
  font-size: 24px;
  color: #FFFFFF;
  cursor: pointer;
}

.sprite-image {
  cursor: pointer;
}

/* Estilos do v-select */
.header-center {
  flex: 1;
  margin-left: 20px;
}

.v-select {
  width: 100%;
  max-width: 250px;
}

/* Estilos do v-autocomplete */
.header-right {
  flex: 1;
  margin-left: 20px;
}

.v-autocomplete {
  width: 100%;
  max-width: 250px;
}
</style>
