interface PerformanceResults {
  measurements: number;
  average: number;
}

const performanceResults: Record<string, PerformanceResults> = {};
export const performanceCounter = (name: string) => {
  const counter = performanceResults[name] || (performanceResults[name] = {
    average: 0,
    measurements: 0,
  });
  const end = () => {
    const diff = performance.now() - start;
    const m = counter.measurements;
    counter.average = counter.average * (m / (m + 1)) + diff * (1 / (m + 1));
    counter.measurements = m + 1;
    if (counter.measurements % 100 === 0) {
      console.log(counter);
    }
  };
  const start = performance.now();
  return end;
};
