<template>
  <div class="percentage-chart-wrapper">
    <!-- Chart Heading -->
    <div v-if="title" class="title">
      <p>{{ title }}</p>
    </div>
    <!-- Percentage Chart -->
    <div class="percentage-chart" :style="makeWrapperStyles(height)">
      <div
        v-for="(block, inx) in blocks"
        :key="inx"
        v-tooltip="`${block.label} - ${block.width}%`"
        class="inner"
        :style="makeDimensions(block)"
      ></div>
    </div>
    <!-- Chart Legend / Key -->
    <div v-if="showLegend" class="legend">
      <div
        v-for="(block, inx) in blocks"
        :key="inx"
        v-tooltip="`${Math.round(block.width)}% (${block.value})`"
        class="legend-item"
      >
        <div v-if="block.label" class="dot" :style="makeDotColor(block)"></div>
        <div v-if="block.label" class="txt">{{ block.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAsPercent: {
      type: Boolean,
      default: true,
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 1,
    },
    values: {
      type: Array,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      defaultColors: [
        '#eb5cad',
        '#985ceb',
        '#5346f3',
        '#5c90eb',
        '#5cdfeb',
        '#00CCB4',
        '#5ceb8d',
        '#afeb5c',
        '#eff961',
      ],
    };
  },
  computed: {
    blocks() {
      let startPositionSum = 0;
      const results = [];
      const total = this.values.reduce((prev, cur) => (prev.size > 0 || prev) + cur.size);
      const multiplier = this.showAsPercent ? 100 / total : 1;
      for (const [index, value] of this.values.entries()) {
        const defaultColor = this.defaultColors[index % this.defaultColors.length];
        results.push({
          start: startPositionSum,
          width: Math.round(value.size * multiplier),
          color: value.color || defaultColor,
          label: value.label,
          value: value.size,
        });
        startPositionSum += value.size * multiplier;
      }
      return results;
    },
  },
  methods: {
    makeDimensions(block) {
      return `margin-left: ${block.start}%; width: ${block.width}%; background: ${block.color}`;
    },
    makeDotColor(block) {
      return `background: ${block.color};`;
    },
    makeWrapperStyles(height) {
      return `height: ${height}rem`;
    },
  },
};
</script>

<style scoped lang="scss">
.percentage-chart-wrapper {
  // Chart Title
  .title {
    p {
      font-size: 1rem;
      margin: 0.5rem 0;
      color: var(--widget-text-color);
      opacity: var(--dimming-factor);
    }
  }

  // Main Chart
  .percentage-chart {
    width: 100%;
    background: grey;
    position: relative;
    height: 2rem;
    margin: 0.5rem auto;
    border-radius: 3px;
    overflow: hidden;

    .inner {
      position: absolute;
      width: 30%;
      height: 100%;
      box-shadow: inset 0 -1px 2px #000000bf;

      &:hover {
        box-shadow: inset 0 -1px 4px #000000bf;
      }
    }
  }

  // Chart Legend
  .legend {
    display: flex;
    margin-top: 0.5rem;

    .legend-item {
      display: flex;
      align-items: center;

      .dot {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
      }

      .txt {
        font-size: 0.8rem;
        margin: 0.5rem;
        color: var(--widget-text-color);
        opacity: var(--dimming-factor);
      }

      &:hover {
        .txt {
          opacity: 1;
        }
      }
    }
  }
}
</style>
