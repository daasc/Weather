<template>
  <div class="search">
    <div>
      <input
        v-model="search"
        type="search"
        name=""
        data-testid="input-search"
        placeholder="search..."
        @keyup.enter="doSearch()"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      search: '',
    }
  },
  methods: {
    doSearch() {
      if (this.search !== '') {
        this.$emit('doSearch', { term: this.search.trim() })
      }
    },
  },
}
</script>
<style lang="css">
.search > div {
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 1px #0091c2);
}

.search > div:after {
  content: '';
  background: white;
  width: 4px;
  height: 20px;
  position: absolute;
  top: 29px;
  right: 2px;
  transform: rotate(145deg);
}

.search > div > input {
  color: white;
  font-size: 16px;
  background: transparent;
  width: 25px;
  height: 25px;
  padding: 15px;
  border: solid 3px white;
  outline: none;
  border-radius: 35px;
  transition: width 0.5s;
}

.search > div > input::placeholder {
  color: #efefef;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.search > div > input:focus::placeholder {
  opacity: 1;
}

.search > div > input:focus,
.search > div > input:not(:placeholder-shown) {
  width: 250px;
}
</style>
