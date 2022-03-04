<template>
  <div class="card" data-testid="card-weather">
    <div class="card__weather" :class="color()" data-testid="color-weather">
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
          <span>{{ weather.main.temp_max }} °</span>
        </div>
        <div>
          <span>Min</span>
          <span>{{ weather.main.temp_min }} °</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgJson from '@/db/img.json'
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
        result.main.temp_max = Math.ceil(result.main.temp_max)
        result.main.temp_min = Math.ceil(result.main.temp_min)
        return result
      }
      return {
        name: '',
        main: { temp: {}, temp_max: 0, temp_min: 0 },
        weather: [{ main: 0, icon: '' }],
      }
    },
  },
  methods: {
    urlImage() {
      this.addColor()
      return imgJson[this.weather.weather[0].icon]
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
    addColor() {
      document.querySelector('body').className = ''
      document.querySelector('body').classList.add(this.color())
    },
  },
}
</script>
<style lang="scss">
@media (min-width: 0px) {
  .card {
    width: 99%;
    height: 75vh;
    position: relative;
    margin-top: 35px;
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    .card__weather {
      width: 100%;
      height: 77.5%;
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
      height: 22.5%;
      background: white;
      color: #a6a3a3;
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
}

@media (min-width: 850px) {
  .card {
    width: 25%;
    margin: 0 auto;
  }
}
</style>
