<template>
    <v-container class="pokemon-card">
        <v-card @click="redirDetalhes()">
            <img :src="pokemon.imageUrl" :alt="pokemon.name" />
            <div class="pokemon-info">
                <h3>{{ capitalizarNome(pokemon.name) }}</h3>
                <p>Tipos: {{ pokemon.types }}</p>
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
      redirDetalhes(){ //TODO: DESCOBRIR COMO TRANSMITIR O ID DE CADA CARD PARA REDIRECIONAR COM DADOS
        this.$emit('mudar-geracao', this.pokemon.id)
        this.$router.push({ name: 'detalhes', params: { id: this.pokemon.id } });      }
    },
  };
  </script>
  
  <style scoped>
  
  .pokemon-card {
    margin-bottom: 20px;
  }
  
  .pokemon-info {
    padding: 16px;
    background-color: #f0f0f0;
  }
  
  .pokemon-name {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .pokemon-types {
    font-size: 16px;
    color: #333;
  }
  </style>
  