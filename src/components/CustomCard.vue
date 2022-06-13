<template lang="pug">

div(class="card")
  div(class="center")
    img(:src="character.image" :alt="`image of ${character.name}`" style="width: 100%; border-top-right-radius: 1rem;border-top-left-radius: 1rem;")
  div(class="row")
    div(class="col-6")
      p(class="title text-center") {{ character.name }}
      ul(style="padding: 1rem;")
        li(class="text-montserrat") Gender: {{ character.gender }}
        li(class="text-montserrat") Localizacion: {{ character.location.name }}
        li(class="text-montserrat") Origin: {{ character.origin.name }}

    div(class="col-6")
      div(v-if="character.status == 'Dead'")
        div(class="alert alert-danger")
          p {{ character.status }}
      div(v-else-if="character.status == 'Alive'")
        div(class="alert alert-success")
          p {{ character.status }}
      div(v-else)
        div(class="alert alert-secondary")
          p(style='text-alaigth: center') {{ character.status }}

      div(class="alert alert-secondary")
        p(style='text-alaigth: center') {{ character.species }}

</template>

<script>
export default {
  props: {
    character: { type: Object, required: true }
  }
}
</script>
