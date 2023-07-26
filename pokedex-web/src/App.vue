<template>
  <v-app>
    <header-pokedex :geracaoAtual="geracaoAtual" @mudar-geracao="onMudancaGeracao"></header-pokedex>
    <v-container v-if="!loading">
      <v-row>
        <v-col v-for="pokemon in pokemonList" :key="pokemon.id" cols="12" sm="6" md="4" lg="3">
          <pokemon-card :pokemon="pokemon" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="d-flex align-center justify-center fill-height">
      <v-progress-circular :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
    </v-container>
  </v-app>
</template>

<script>
import pokemonCard from '@/components/pokemonCard.vue'
import HeaderPokedex from '@/components/HeaderPokedex.vue'
import { getAllPkmn, getPkmnDetails } from '@/services/pokeapiService.js';

export default {
  name: 'App',
  components: {
    'pokemon-card': pokemonCard,
    'header-pokedex': HeaderPokedex
  },
  data() {
    return {
      geracaoAtual: 1,
      pokemonList: [],
      loading:true
    }
  },
  async created() {
    await this.fetchPokemonList(this.geracaoAtual)
    console.log(getPkmnDetails(256))
  },

  methods: {
    capitalizarNome(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
    async fetchPokemonList(gen) {
      try {
        const pokemonsData = await getAllPkmn(gen);

        this.pokemonList = pokemonsData.map((pokemonData) => ({
          id: pokemonData.id,
          name: this.capitalizarNome(pokemonData.name),
          types: this.capitalizarNome(pokemonData.types),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
        }));
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    onMudancaGeracao(index) { //TODO: Ajustes no atraso da geração
      // Atualizar a geração selecionada com o índice recebido do evento
      this.geracaoAtual = index;
      // Chamar a função fetchPokemonList passando o índice da geração atual selecionada
      this.fetchPokemonList(this.geracaoAtual);
    },
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fill-height {
  height: 100%;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
