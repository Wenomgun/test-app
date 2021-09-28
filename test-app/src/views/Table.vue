<template>
  <v-container fluid style="height: 100vh;" >
    <v-layout>
      <div>
        Таблица
      </div>
    </v-layout>
    <v-layout fill-height>
      <posts @openPost="_showPostPanel($event)"></posts>
    </v-layout>
    <div @click="_hidePostPanel($event)">
      <v-overlay :z-index="zIndex"
                 :dark="dark"
                 :value="isOpened">
        <post-card></post-card>
      </v-overlay>
    </div>
  </v-container>
</template>

<script>

import Posts from "../components/Posts";
import PostCard from "../components/PostCard";

export default {
  name: 'Table',

  data: () => ({
    zIndex: 0,
    overlay: false,
    dark: false,
    currentItemPost: null
  }),

  components: {
    'posts': Posts,
    'post-card': PostCard,
  },

  computed: {
    isOpened() {
      return this.$store.state.openedPost;
    }
  },

  methods: {
    _showPostPanel(item) {
      this.$store.dispatch('changeCardState', item);
    },
    _hidePostPanel(e) {
      if (e.target.classList.contains('v-overlay__scrim')) {
        this.$store.dispatch('changeCardState', null);
      }

    }

  }

}
</script>