<template>
  <div>
    <div v-if="error">
      {{error}}
    </div>

  <v-container v-if="!error" fluid style="height: 100vh; width: 100px" class="post-card" >
    <v-layout>
      <form @submit.prevent="_submit" style="width: 100%; padding: 50px">
        <v-text-field
            v-model="titlePost"
            label="Title"
            required
        ></v-text-field>
        <v-textarea
            v-model="bodyPost"
            label="Body"
            counter
        ></v-textarea>
        <v-btn class="mr-4" type="submit" :disabled="isSubmit">
          Сохранить
        </v-btn>
      </form>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  export default {
    name: 'PostCard',

    data: () => ({
      isSubmit: false,
      titlePost: '',
      bodyPost: ''
    }),

    created() {
      this.titlePost = this.openedPost.title;
      this.bodyPost = this.openedPost.body;
    },

    computed: {
      openedPost() {
        return this.$store.state.openedPost;
      },
      error() {
        return this.$store.state.errorEditPost;
      }
    },
    methods: {
      _submit () {
        this.isSubmit = true;
        this.$store.dispatch('updatePostById', {
          id: this.openedPost.id,
          title: this.titlePost,
          body: this.bodyPost
        }).then(() => {
          this.isSubmit = false;
        });
      },
    }
  }
</script>

<style>
.post-card {
  position: fixed;
  top: 0;
  right: 0;
  min-width: 700px;
  background: #FFFFFF;
  transition: all 0.1s;
}
</style>
