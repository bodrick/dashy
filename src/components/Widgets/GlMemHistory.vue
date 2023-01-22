<template>
  <div class="glances-cpu-history-wrapper">
    <div :id="chartId" class="gl-history-chart"></div>
  </div>
</template>

<script>
import WidgetMixin from '@/mixins/WidgetMixin';
import GlancesMixin from '@/mixins/GlancesMixin';
import ChartingMixin from '@/mixins/ChartingMixin';
import { timestampToTime, getTimeAgo } from '@/utils/MiscHelpers';

export default {
  components: {},
  mixins: [WidgetMixin, GlancesMixin, ChartingMixin],
  data() {
    return {};
  },
  computed: {
    limit() {
      return this.options.limit || 100;
    },
    endpoint() {
      return this.makeGlancesUrl(`mem/history/${this.limit}`);
    },
  },
  created() {
    this.overrideUpdateInterval = 20;
  },
  methods: {
    processData(memData) {
      const readings = memData.percent;
      const labels = [];
      const systemValues = [];
      for (const dataPoint of readings) {
        labels.push(timestampToTime(dataPoint[0]));
        systemValues.push(dataPoint[1]);
      }

      const chartTitle = this.makeTitle(readings);
      const datasets = [{ name: 'Memory', type: 'bar', values: systemValues }];
      this.generateChart({ labels, datasets }, chartTitle);
    },
    makeTitle(system) {
      return `Memory Usage over past ${getTimeAgo(system[0][0]).replace('ago', '')}`;
    },
    generateChart(timeChartData, chartTitle) {
      return new this.Chart(`#${this.chartId}`, {
        title: chartTitle,
        data: timeChartData,
        type: 'axis-mixed',
        height: this.chartHeight,
        colors: this.chartColors,
        truncateLegends: true,
        lineOptions: {
          regionFill: 1,
          hideDots: 1,
        },
        axisOptions: {
          xIsSeries: true,
          xAxisMode: 'tick',
        },
        tooltipOptions: {
          formatTooltipY: (d) => `${Math.round(d)}%`,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.glances-cpu-history-wrapper {
  .gl-history-chart {
  }
}
</style>
