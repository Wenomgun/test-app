<template>
  <div>
    <v-simple-table v-if="!isLoading && !error" style="width: 100%">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">UserId</th>
          <th class="text-left">Title</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in posts" :key="item.id" @click="_openPost(item)">
          <td>{{ item.userId }}</td>
          <td>{{ item.title }}</td>
        </tr>
        </tbody>
        <tfoot>
        <div class="text-center">
          <v-pagination
              :value="currentPage"
              :length="totalPage"
              @input="_changePage($event)"
          ></v-pagination>
        </div>
        </tfoot>
      </template>
    </v-simple-table>


    <div v-if="isLoading">
      <v-progress-circular
          indeterminate
          :size="100"
          color="primary"
      ></v-progress-circular>
    </div>

    <div v-if="error">
      {{error}}
    </div>

  </div>

</template>

<script>
  export default {
    name: 'Posts',

    data: () => ({

    }),

    created() {
      this.$store.dispatch('fetchPostsById', this.currentPage);
    },

    computed: {
      posts() {
        return this.$store.state.posts;
      },
      isLoading() {
        return this.$store.state.isLoading;
      },
      currentPage() {
        return this.$store.state.currentPage;
      },
      totalPage() {
        return this.$store.state.totalPage;
      },
      error() {
        return this.$store.state.error;
      }
    },
    methods: {
      _openPost(item) {
        this.$emit('openPost', item);
      },
      _changePage(page) {
        this.$store.dispatch('changeCurrentPage', page);
        this.$store.dispatch('fetchPostsById', page);
      }
    }
  }
</script>
