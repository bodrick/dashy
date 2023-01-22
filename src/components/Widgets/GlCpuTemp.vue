<template>
  <div v-if="tempData" class="glances-temp-wrapper">
    <div v-for="sensor in tempData" :key="sensor.label" class="temp-row">
      <p class="label">{{ sensor.label | formatLbl }}</p>
      <p :class="`temp range-${sensor.color}`">{{ sensor.value | formatVal }}</p>
    </div>
  </div>
</template>

<script>
import WidgetMixin from '@/mixins/WidgetMixin';
import GlancesMixin from '@/mixins/GlancesMixin';
import { capitalize, fahrenheitToCelsius } from '@/utils/MiscHelpers';

export default {
  filters: {
    formatLbl(lbl) {
      return capitalize(lbl);
    },
    formatVal(val) {
      return `${Math.round(val)}°C`;
    },
  },
  mixins: [WidgetMixin, GlancesMixin],
  data() {
    return {
      tempData: null,
      noResults: false,
    };
  },
  computed: {
    endpoint() {
      return this.makeGlancesUrl('sensors');
    },
  },
  methods: {
    getTempColor(temp) {
      if (temp <= 50) return 'green';
      if (temp > 50 && temp < 75) return 'yellow';
      if (temp >= 75) return 'red';
      return 'grey';
    },
    processData(sensorData) {
      const results = [];
      for (const sensor of sensorData) {
        const tempC = sensor.unit === 'F' ? fahrenheitToCelsius(sensor.value) : sensor.value;
        results.push({
          label: sensor.label,
          value: tempC,
          color: this.getTempColor(tempC),
        });
      }
      this.tempData = results;
    },
  },
};
</script>

<style scoped lang="scss">
.glances-temp-wrapper {
  .temp-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p.label {
      margin: 0.5rem 0;
      color: var(--widget-text-color);
    }
    p.temp {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      font-weight: bold;
      &.range-green {
        color: var(--success);
      }
      &.range-yellow {
        color: var(--warning);
      }
      &.range-red {
        color: var(--danger);
      }
      &.range-grey {
        color: var(--medium-grey);
      }
    }
    &:not(:last-child) {
      border-bottom: 1px dashed var(--widget-text-color);
    }
  }
}
</style>
