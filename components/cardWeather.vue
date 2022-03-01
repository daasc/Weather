<template>
  <div class="card" data-testid="card-weather">
    <div class="card__weather" :class="color()">
      <div class="icons">
        <img :src="urlImage()" alt="" />
      </div>
      <div class="card__results">
        <div class="card__main">{{ weather.weather[0].main }}</div>
        <div class="card__number" data-testid="card-number">
          {{ weather.main.temp }}°
        </div>
      </div>
    </div>
    <div class="card__content">
      <div class="card__name_city">{{ weather.name }}</div>
      <div class="card__next_information">
        <div>
          <span>Max</span>
          <span>20 °</span>
        </div>
        <div>
          <span>Min</span>
          <span>15 °</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardWeather',
  computed: {
    weather() {
      const obj = Object.assign(
        {},
        { ...this.$store.state.weather.weatherObjs }
      )
      const result = JSON.parse(JSON.stringify(obj))
      if (Object.keys(result).length) {
        result.main.temp = Math.ceil(result.main.temp)
        return result
      }
      return { main: { temp: {} } }
    },
  },
  methods: {
    urlImage() {
      return require(`@/assets/img/${this.weather.weather[0].icon}.png`)
    },
    color() {
      if (this.weather.weather[0].icon.includes('n')) {
        if (
          this.weather.weather[0].id >= 500 &&
          this.weather.weather[0].id <= 531
        ) {
          return 'night-rain'
        }
        if (
          this.weather.weather[0].id >= 600 &&
          this.weather.weather[0].id <= 622
        ) {
          return 'night-snow'
        }
        return 'night'
      } else {
        if (
          this.weather.weather[0].id >= 500 &&
          this.weather.weather[0].id <= 531
        ) {
          return 'day-rain'
        }
        if (
          this.weather.weather[0].id >= 600 &&
          this.weather.weather[0].id <= 622
        ) {
          return 'day-snow'
        }
        return 'day'
      }
    },
  },
}
</script>
<style lang="scss">
.card {
  width: 25%;
  height: 80vh;
  position: relative;
  margin: 0 auto;
  display: flex;
  border-radius: 15px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .card__weather {
    width: 100%;
    height: 70%;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    .icons {
      width: 35%;
      height: 30%;
      align-self: flex-end;
      margin: 5px;
      img {
        width: 100%;
      }
    }
    .card__results {
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      gap: 23%;
      .card__main,
      .card__number {
        color: white;
        text-align: center;
      }
      .card__number {
        font-size: 4em;
        font-weight: bolder;
      }
      .card__main {
        font-size: 2em;
      }
    }
  }

  .card__content {
    width: 100%;
    height: 30%;
    background: white;
    color: #d4d0db;
    font-weight: bold;
    .card__name_city {
      padding: 10px;
      font-size: 20px;
      text-align: center;
    }

    .card__next_information {
      display: flex;
      flex-direction: column;
      gap: 15px;

      div {
        display: flex;
        justify-content: space-between;
        padding: 0px 30px;
      }
    }
  }
}
</style>
