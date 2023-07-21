<template>
    <v-container fluid fill-height>
      <!-- Cabeçalho com sprites e título -->
      <v-row class="header-row justify-content-center">
        <!-- Lado esquerdo com os sprites -->
        <v-col v-for="sprite in leftSprites" :key="sprite.name" cols="1">
          <img :src="getSpriteUrl(sprite.sprite)" :alt="sprite.name" height="50" />
        </v-col>
  
        <!-- Parte central com o título -->
        <v-col cols="2" class="text-center">
          <h2 class="title">PokeWeb V2</h2>
        </v-col>
  
        <!-- Lado direito com os sprites -->
        <v-col v-for="sprite in rightSprites" :key="sprite.name" cols="1">
          <img :src="getSpriteUrl(sprite.sprite)" :alt="sprite.name" height="50" />
        </v-col>
      </v-row>
  
      <!-- Linha com os botões das gerações -->
      <v-row class="generation-row justify-content-center" style="background: linear-gradient(to right, #FFD700, #FFA500);">
        <v-col cols="12">
          <v-btn-group>
            <v-btn v-for="generation in generations" :key="generation" text class="generation-btn">
              {{ generation }}
            </v-btn>
          </v-btn-group>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>
  import togekiss from '@/assets/togekiss.png';
  import magnezone from '@/assets/magnezone.png';
  import araquanid from '@/assets/araquanid.png';
  import slurpuff from '@/assets/slurpuff.png';
  import porygonz from '@/assets/porygon-z.png';
  import blaziken from '@/assets/blaziken.png';
  
  export default {
    data() {
      return {
        generations: ['Kanto', 'Jotho', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'],
        leftSprites: [
          { sprite: togekiss, name: 'Togekiss' },
          { sprite: magnezone, name: 'Magnezone' },
          { sprite: araquanid, name: 'Araquanid' },
        ],
        rightSprites: [
          { sprite: slurpuff, name: 'Slurpuff' },
          { sprite: porygonz, name: 'Porygon-Z' },
          { sprite: blaziken, name: 'Blaziken' },
        ],
      };
    },
    methods: {
      getSpriteUrl(sprite) {
        return sprite;
      },
    },
  };
  </script>
  
  <style>
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