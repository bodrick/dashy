<template>
  <div class="glances-cpu-history-wrapper">
    <div :id="chartId" class="gl-history-chart"></div>
  </div>
</template>

<script>
import WidgetMixin from '@/mixins/WidgetMixin';
import GlancesMixin from '@/mixins/GlancesMixin';
import ChartingMixin from '@/mixins/ChartingMixin';
import { convertBytes, getTimeAgo, timestampToTime } from '@/utils/MiscHelpers';

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
      return this.makeGlancesUrl(`network/history/${this.limit}`);
    },
  },
  created() {
    this.overrideUpdateInterval = 10;
  },
  methods: {
    processData(trafficData) {
      const preliminary = {
        upload: [],
        download: [],
      };

      for (const keyName of Object.keys(trafficData)) {
        let upOrDown = null;
        if (keyName.includes('_tx')) upOrDown = 'up';
        else if (keyName.includes('_rx')) upOrDown = 'down';
        for (const dataPoint of trafficData[keyName]) {
          const dataTime = this.getRoundedTime(dataPoint[0]);
          if (upOrDown === 'up') {
            if (preliminary.upload[dataTime]) preliminary.upload[dataTime] += dataPoint[1];
            else preliminary.upload[dataTime] = dataPoint[1];
          } else if (upOrDown === 'down') {
            if (preliminary.download[dataTime]) preliminary.download[dataTime] += dataPoint[1];
            else preliminary.download[dataTime] = dataPoint[1];
          }
        }
      }
      const timeLabels = [];
      const uploadData = [];
      const downloadData = [];
      const startDate = Object.keys(preliminary.upload)[0];
      for (const date of Object.keys(preliminary.upload)) {
        timeLabels.push(timestampToTime(date));
        uploadData.push(preliminary.upload[date]);
      }
      for (const date of Object.keys(preliminary.download)) {
        downloadData.push(preliminary.download[date]);
      }
      const datasets = [
        { name: 'Upload', type: 'bar', values: uploadData },
        { name: 'Download', type: 'bar', values: downloadData },
      ];
      const chartTitle = this.makeTitle(startDate);
      this.generateChart({ labels: timeLabels, datasets }, chartTitle);
    },
    getRoundedTime(date) {
      const roundTo = 1000 * 60;
      return new Date(Math.round(new Date(date).getTime() / roundTo) * roundTo);
    },
    makeTitle(startDate) {
      return `Network Activity over past ${getTimeAgo(startDate).replace('ago', '')}`;
    },
    generateChart(timeChartData, chartTitle) {
      return new this.Chart(`#${this.chartId}`, {
        title: chartTitle,
        data: timeChartData,
        type: 'axis-mixed',
        height: this.chartHeight,
        colors: ['#f6f000', '#04e4f4'],
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
          formatTooltipY: (d) => convertBytes(d),
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
