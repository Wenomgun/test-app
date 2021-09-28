import Vue from 'vue'
import Vuex from 'vuex'
import axiosInst from '../api';
import {GET_POSTS_BY_ID, POSTS, POSTS_BY_ID} from "../api/routes";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    isLoading: false,
    error: '',
    errorEditPost: '',
    openedPost: null,
    currentPage: 1,
    totalPage: 0
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setErrorEditPost(state, payload) {
      state.errorEditPost = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setIsOpenedPost(state, payload) {
      state.openedPost = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setTotalPage(state, payload) {
      state.totalPage = payload;
    },
    updatePosts(state, payload) {
      state.posts = state.posts.map((post) => {
        return post.id === payload.id ? {...post, ...payload} : post;
      })
    }
  },
  actions: {
    fetchPosts({commit}) {
      commit('setIsLoading', true);
      return axiosInst.get(POSTS()).then((res) => {
        commit('setPosts', res.data);
        commit('setIsLoading', false);
      }).catch((e) => {
        commit('setError', e);
        commit('setIsLoading', false);
      });
    },
    fetchPostsById({commit}, page) {
      commit('setIsLoading', true);
      return axiosInst.get(GET_POSTS_BY_ID(page)).then((res) => {
        commit('setPosts', res.data);
        commit('setTotalPage', res.data.length);
        commit('setIsLoading', false);
      }).catch((e) => {
        commit('setError', e);
        commit('setIsLoading', false);
      });
    },
    updatePostById({commit}, editedPost) {
      return axiosInst.patch(POSTS_BY_ID(editedPost.id), JSON.stringify(editedPost), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((res) => {
        commit('updatePosts', res.data);
        commit('setIsOpenedPost', null);
      }).catch((e) => {
        commit('setErrorEditPost', e);
      });
    },
    changeCardState({commit}, openedPost) {
      commit('setIsOpenedPost', openedPost);
    },
    changeCurrentPage({commit}, page) {
      commit('setCurrentPage', page);
    }
  },
  modules: {
  }
})
