<template lang="pug">
head
  title Rick and Morty
  meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")
  meta(property="og:title" content="Rick and Morty")
  meta(property="og:image" content="https://media.discordapp.net/attachments/906891142602305606/906911978646290452/yellowboard-removebg-preview1.png")
  meta(property="og:url" content="https://www.yellowboard.avocadosnetwork.com")
  meta(property="og:description" content="Bienvenido a yellowboad academy, donde podrás poner a prueba tus habilidades de primaria o tus hijos podrán reforzar sus conocimientos de primaria para la escuela.")
  meta(name="keywords" content="yellowboard, board, yellow, webapp, react")
  link(rel="icon" href="https://www.freeiconspng.com/uploads/rick-avatar-blue-vers--icon-12.png" sizes="96x96")
  link(rel="preconnect" href="https://fonts.googleapis.com")
  link(rel="preconnect" href="https://fonts.gstatic.com" crossorigin)
  link(href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet")
  link(href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet")

#App
  section(class="banner")
    div(class="banner-dark")
      img(class="banner-image" src="https://vignette.wikia.nocookie.net/international-entertainment-project/images/0/08/Rick_and_Morty_-_logo_(English).png/revision/latest?cb=20170408193423")
      p(class="banner-text") 
        | Made By Pablo Cabrera with 
        a(href="https://rickandmortyapi.com/", target="_blank") rickandmortyapi.com
  div(style="display: grid; grid-template-columns: repeat(auto-fit, minmax(50%, 1fr)); grid-gap: 3rem; padding: 1.5rem;")
    p(class="title2") Characters
    div
      input.input(type="text" placeholder="Search" v-model="searchQuery" @change="search ()" style="width: 100%; font-size: 2rem; padding: 1rem; font-family: 'Kdam Thmor Pro', sans-serif; background-color: transparent; color: #97CE4C; border: 0.5px dotted #97CE4C;")
      //- button(@click="search") Buscar
    

  div(class="pagination")
    div(class="pagination-container center")
      div(v-if="page > 1" class="pagination-item" @click="returnPage()")
        p &laquo;
      div(class="pagination-item" v-if="page > 1")
        p {{ page - 1 }}
      div(class="pagination-item pagination-active")
        p {{ page }}
      div(class="pagination-item" v-if="page < totalPages")
        p {{ page + 1 }}
      div(class="pagination-item" v-if="page < totalPages" @click="next()")
        p &raquo;

  section(style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); grid-gap: 3rem; padding: 1.5rem;" v-if="characters.length > 0")
    CustomCard(v-for="character in characters" :character="character" title="character.name")
  section(v-else)
    div(class="not-fount")
      p Not fount
</template>

<script>
import CustomInputs from './components/CustomInputs.vue'
import CustomCard from './components/CustomCard.vue'
import characterService from './services/character'


export default {
  name: 'App',
  data(){
    return{
      searchQuery: '',
      characters: [],
      searchMessage: '',
      page: 1,
      totalRes: 0,
      totalPages: 0,
    }
  },
  components:{
    CustomInputs, CustomCard
  },
  methods:{
    async search () {
      try{
          this.page = 1
          let res = await characterService.search(this.searchQuery, '', this.page)
          this.characters = res.results
          this.totalPages = res.info.pages
          this.totalRes = res.info.count
      }catch(err){
          this.characters = []
      }
      
    },
    async next () {
      try{
          let tempNextPage = this.page + 1
          this.page + 1;
          let res = await characterService.search(this.searchQuery, '', tempNextPage)
          this.characters = res.results
          this.totalPages = res.info.pages
          this.totalRes = res.info.count
          this.page = tempNextPage
      }catch(err){
          this.characters = []
      }
    },
    async returnPage () {
      try{
          let tempPrePage = this.page - 1
          let res = await characterService.search(this.searchQuery, '', tempPrePage)
          this.characters = res.results
          this.totalPages = res.info.pages
          this.totalRes = res.info.count
          this.page = tempPrePage
      }catch(err){
          this.characters = []
      }
    }
  },
  created () {
    (async() => {
      let res = await characterService.search(this.searchQuery, '', this.page)
      this.totalPages = res.info.pages
      this.totalRes = res.info.count
      this.characters = res.results
      this.searchMessage = `Encontrados: ${res.info.count}`
    })()
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

</style>
