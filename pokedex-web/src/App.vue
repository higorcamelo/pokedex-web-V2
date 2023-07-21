<template>
  <v-app>
      <header-pokedex></header-pokedex>
      <v-container>
        <v-row>
          <v-col v-for="pokemon in pokemonList" :key="pokemon.id" cols="12" sm="6" md="4" lg="3">
            <pokemon-card :pokemon="pokemon" />
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import pokemonCard from '@/components/pokemonCard.vue'
import HeaderPokedex from '@/components/HeaderPokedex.vue'
import { getAllPKMN, getByNamePKMN } from '@/services/pokeapiService.js';

export default {
  name: 'App',
  components: {
    'pokemon-card': pokemonCard,
    'header-pokedex': HeaderPokedex
  },
  data() {
    return {
      pokemonList: []
    }
  },
  async created() {
    await this.fetchPokemonList()
  },

  methods: {
    capitalizarNome(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
    async fetchPokemonList() {
      try {
        const pokemonsData = await getAllPKMN();
        const pokemonDetailsPromises = pokemonsData.map(pokemonData => getByNamePKMN(pokemonData.name));
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        this.pokemonList = pokemonDetails.map((details, index) => ({ //TODO: Pq que a API retorna errado?!
          id: index + 1,
          name: this.capitalizarNome(details.name),
          types: details.types.map((typeObj) => this.capitalizarNome(typeObj.type.name)).join(' / '),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
      } catch (error) {
        console.error(error);
      }
    }
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
</style>
