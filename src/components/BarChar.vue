<script>
import Chart from "chart.js";
import { RouterLink, RouterView } from 'vue-router';
export default {
    props: ['votes', 'labelInput', 'Option'],
    mounted() {
        // 獲取 Canvas 元素的引用
        const ctx = this.$refs.chartCanvas.getContext('2d');

        // 設定圖表資料
        const chartData = {
            labels: this.Option,
            datasets: [
                {
                    label: this.labelInput,
                    data: this.votes,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // 長條的填充顏色
                    borderColor: 'rgba(75, 192, 192, 1)', // 長條的邊框顏色
                    borderWidth: 1 // 長條的邊框寬度
                }
            ]
        };

        // 設定圖表選項
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                    ticks: {
                        precision: 0
                    }
                }
            }
        };

        // 建立並繪製長條圖
        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    }
};
</script>

<template>
    <div class="about">


        <div>
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>



<style>
canvas {
    max-width: 600px;
    margin: 0 auto;
}

.about {
    width: 90vw;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>