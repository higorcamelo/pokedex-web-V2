<template>
    <v-container class="pokemon-card">
        <v-card>
            <img :src="pokemon.imageUrl" :alt="pokemon.name" />
            <div class="pokemon-info">
                <h3>{{ capitalizarNome(pokemon.name) }}</h3>
                <p v-if="pokemon.types">Type: {{ capitalizarTipos(pokemon.types) }}</p>
            </div>
        </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
    },
    methods: {
      capitalizarNome(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      capitalizarTipos(tipos) {
        const tiposFormatados = tipos.map((tipo) => this.capitalizarNome(tipo.type.name));
        return tiposFormatados.join('/ ');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilize o card do Pokémon conforme necessário */
  </style>
  