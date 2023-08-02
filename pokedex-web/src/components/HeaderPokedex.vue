<template>
  <v-container fluid fill-height>
    <!-- Cabeçalho com sprites e título -->
    <v-row class="header-row justify-content-center">
      <v-col cols="2" class="text-center">
        <h2 class="title">PokeWeb V2</h2>
      </v-col>
      <v-col>
        <v-img :src="sprite" :width="100"></v-img>
      </v-col>
    </v-row>

    <!-- Linha com os botões das gerações -->
    <v-row class="generation-row justify-content-center" style="background: linear-gradient(to right, #FFD700, #FFA500);">
      <v-col cols="12">
        <v-select label="Geração" :items="geracoesOptions" variant="underlined" v-model="selecGen" @change="selecionarGeracao"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import blaziken from '@/assets/blaziken.png';

export default {
  props: ['geracaoAtual'],
  data() {
    return {
      generations: ['Kanto', 'Jotho', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'],
      sprite: blaziken,
      selecGen: null,
    };
  },
  computed: {
    geracoesOptions() {
      return this.generations.map((geracao) => ({
        text: geracao,
        value: geracao,
      }));
    },
  },
  methods: {
    getSpriteUrl(sprite) {
      return sprite;
    },
    selecionarGeracao() {
      console.log(this.selecGen);
      this.$emit('mudar-geracao', this.selecGen);
    },
  },
};
</script>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Subrayada:wght@700&display=swap');
.v-btn {
  margin: 5px 10px; /* Espaçamento vertical 5px e horizontal 10px entre os botões */
  border-radius: 50px; /* Bordas mais arredondadas nos botões */
  font-weight: bold; /* Deixar o texto em negrito nos botões */
}

.header-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(to right, #FFD700, #FFA500); /* Gradiente laranja */
  padding: 10px 0; /* Espaçamento interno */
}

.title {
  font-family: 'Montserrat Subrayada', sans-serif;
  font-size: 24px; /* Tamanho do título */
  color: #FFFFFF; /* Cor do título branca */
  margin: 0; /* Remover margens do título */
}

.sprite-name {
  text-align: center;
}

.generation-row {
  margin-top: 20px;
}

.generation-btn {
  background-color: #FFDAA0; /* Cor de fundo laranja suave para os botões das gerações */
  color: #FFFFFF; /* Cor do texto branca para os botões das gerações */
  transition: background-color 0.3s; /* Efeito de transição */
}

/* Efeito hover */
.generation-btn:hover {
  background-color: #FFD07B; /* Cor de fundo laranja mais escura ao passar o mouse nos botões */
}

</style>