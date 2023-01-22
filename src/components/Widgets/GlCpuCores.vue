<template>
  <div class="glances-cpu-cores-wrapper">
    <div v-for="(chartData, index) in cpuChartData" :key="index" class="percentage-charts">
      <PercentageChart :values="chartData" :title="`Core #${index + 1}`" />
    </div>
  </div>
</template>

<script>
import WidgetMixin from '@/mixins/WidgetMixin';
import GlancesMixin from '@/mixins/GlancesMixin';
import { capitalize } from '@/utils/MiscHelpers';
import PercentageChart from '@/components/Charts/PercentageChart';

export default {
  components: {
    PercentageChart,
  },
  mixins: [WidgetMixin, GlancesMixin],
  data() {
    return {
      cpuChartData: null,
    };
  },
  computed: {
    endpoint() {
      return this.makeGlancesUrl('quicklook');
    },
  },
  created() {
    // Enable automatic updates (won't be applied if user has explicitly disabled)
    this.overrideUpdateInterval = 2;
  },
  methods: {
    /* Converts returned data into format for the percentage charts */
    processData(cpuData) {
      const cpuSections = [];
      for (const cpuInfo of cpuData.percpu) {
        const cpuSection = [];
        const ignore = new Set(['total', 'key', 'cpu_number', 'idle']);
        cpuSection.push({ label: 'Idle', size: cpuInfo.idle, color: '#20e253' });
        for (const keyName of Object.keys(cpuInfo)) {
          if (!ignore.has(keyName) && cpuInfo[keyName]) {
            cpuSection.push({ label: capitalize(keyName), size: cpuInfo[keyName] });
          }
        }
        cpuSections.push(cpuSection);
      }
      this.cpuChartData = cpuSections;
    },
  },
};
</script>

<style scoped lang="scss">
.glances-cpu-cores-wrapper {
  color: var(--widget-text-color);
  .percentage-charts:not(:last-child) {
    border-bottom: 1px dashed var(--widget-accent-color);
  }
}
</style>
