class DescriptiveStatistics {
    constructor(data) {
      this.data = data;
      this.sortedData = data.slice().sort((a, b) => a - b);
    }

    mean() {
      const sum = this.data.reduce((acc, value) => acc + value, 0);
      return sum / this.data.length;
    }

    median() {
      const length = this.sortedData.length;
      const middle = Math.floor(length / 2);

      if (length % 2 === 0) {
        return (this.sortedData[middle - 1] + this.sortedData[middle]) / 2;
      } else {
        return this.sortedData[middle];
      }
    }

    mode() {
      const frequencyMap = new Map();

      this.data.forEach(value => {
        frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
      });

      let maxFrequency = 0;
      let modes = [];

      frequencyMap.forEach((frequency, value) => {
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          modes = [value];
        } else if (frequency === maxFrequency) {
          modes.push(value);
        }
      });

      return modes;
    }

    range() {
      return this.sortedData[this.sortedData.length - 1] - this.sortedData[0];
    }

    variance() {
      const meanValue = this.mean();
      const squaredDifferences = this.data.map(value => (value - meanValue) ** 2);
      const sumSquaredDiff = squaredDifferences.reduce((acc, value) => acc + value, 0);
      return sumSquaredDiff / this.data.length;
    }

    standardDeviation() {
      return Math.sqrt(this.variance());
    }

    quartiles() {
      const length = this.sortedData.length;
      const q1 = this.median(this.sortedData.slice(0, Math.floor(length / 2)));
      const q2 = this.median(this.sortedData);
      const q3 = this.median(this.sortedData.slice(Math.ceil(length / 2)));

      return { q1, q2, q3 };
    }

    interquartileRange() {
      const { q1, q3 } = this.quartiles();
      return q3 - q1;
    }
  }

  function calculateStatistics() {
    const dataInput = document.getElementById('dataInput');
    const outputDiv = document.getElementById('output');
    const inputData = dataInput.value.trim();

    if (inputData === '') {
      outputDiv.innerHTML = '<p>Please enter data.</p>';
      return;
    }

    const data = inputData.split(',').map(value => parseFloat(value.trim()));

    if (data.some(isNaN)) {
      outputDiv.innerHTML = '<p>Invalid input. Please enter numeric values.</p>';
      return;
    }

    const stats = new DescriptiveStatistics(data);

    outputDiv.innerHTML = `
      <p>Mean: ${stats.mean()}</p>
      <p>Median: ${stats.median()}</p>
      <p>Mode: ${stats.mode()}</p>
      <p>Range: ${stats.range()}</p>
      <p>Variance: ${stats.variance()}</p>
      <p>Standard Deviation: ${stats.standardDeviation()}</p>
      <p>Quartiles: Q1 = ${stats.quartiles().q1}, Q2 = ${stats.quartiles().q2}, Q3 = ${stats.quartiles().q3}</p>
      <p>Interquartile Range: ${stats.interquartileRange()}</p>
    `;
  }

  