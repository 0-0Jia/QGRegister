<style scoped lang="scss">
    .chartCon {
        height: 400px;
        background: white;
    }

    .total-container {
        height: 50px;

        .total {
            height: 100%;
            margin: auto;
            font-size: 1.2rem;
        }
    }

    .no-data {
        position: relative;
        height: 350px;
        font-size: 1.2rem;
        line-height: 350px;

        img {
            display: block;
            margin: auto;
            position: absolute;
            top: 0;
            width: 100%;
        }

        p {
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
</style>

<template>
    <div class="chartCon">
        <div class="total-container">
            <div class="total">
                <span style="font-size: 1rem;color: #00C5AA">总数</span>:{{total}}
            </div>
        </div>
        <div class="no-data" v-if="!showWhich">
            <p>{{fault}}</p>
        </div>
        <div style="height: 350px" id="myChart" v-if="showWhich"></div>
    </div>
</template>

<script>
    export default {
        props: {
            chartCon: Object
            // chartCon: {
            //     chartData: 图表数据，类似于：{"resultList":[{}], "totalComponentNumber":30, "totalPrintHeight":765.0 },
            //     chartType: 图表类型，是个数字：1->温度, 2->高度, 3->数量
            // }
        },

        data() {
            return {
                MyChart: null,
                total: '暂无',
                showWhich: true,
                fault: null
            }
        },
        mounted() {
            this.init()
        },

        watch: {
            /**
             * 监听图表类型的变化，一切就生成图表
             */
            "chartCon.chartData": function () {
                if(this.chartCon.chartData != null) {
                    this.MyChart.hideLoading()
                    //判断对象是否有message属性有则说明无返回信息
                    if (this.chartCon.chartData.hasOwnProperty("message") === true) {
                        this.MyChart.clear()
                        this.total = '暂无'
                        this.fault = this.chartCon.chartData.message
                        this.showWhich = false
                        return
                    } else {
                        this.showWhich = true
                        this.MyChart.clear()
                    }

                    if (this.chartCon.chartType === 2) {
                        this.total = this.chartCon.chartData.totalPrintHeight + 'mm'
                    } else if (this.chartCon.chartType === 3) {
                        this.total = this.chartCon.chartData.totalComponentNumber + '件'
                    } else {
                        this.total = '暂无'
                    }
                    this.generateChart()
                } else {
                    this.fault = ''
                    this.MyChart.showLoading()
                }
            },

            total: function () {
                if (this.total == null) {
                    this.total = '暂无'
                }
            }

        },

        methods: {
            /**
             * 初始化echart实例
             */
            init() {
                this.MyChart = this.$echarts.init(document.getElementById('myChart'))
            },
            /**
             * 生成图表
             */
            generateChart() {
                let option = null
                let type = this.chartCon.chartType

                switch (type) {
                    case 1: {
                        if (this.chartCon.chartData != null) {
                            option = this.temperature(this.chartCon.chartData.resultList)
                        } else {
                            return;
                        }
                    }
                        break;
                    case 2: {
                        if (this.chartCon.chartData != null) {
                            option = this.printerHeight(this.chartCon.chartData.resultList)
                        } else {
                            return;
                        }
                    }
                        break;
                    case 3: {
                        if (this.chartCon.chartData != null) {
                            option = this.componentNumber(this.chartCon.chartData.resultList)
                        } else {
                            return
                        }
                    }
                        break;
                    default: {
                        this.$message.error('类型字段不对应')
                    }
                        break;
                }
                this.MyChart.setOption(option);
            },

            /**
             * 处理作业高度的数据
             */
            printerHeight(statisticsData) {
                let option = {
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        name: '高度/mm',
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        stack: 'confidence-band',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#00c5aa', //改变折线点的颜色
                                lineStyle: {
                                    color: '#00c5aa' //改变折线颜色
                                }
                            }
                        },
                    }],
                    legend: {
                        orient: 'vertical',
                    },
                    grid: {
                        top: "30px",
                    }
                }
                for (let i = 0; i < statisticsData.length; i++) {
                    //把时间推进option的time字段中
                    option.xAxis.data.push((statisticsData[i].startTime.replace(new RegExp('-', "g"), '/')).replace(" ", "\n"))
                    //将作业高度推进数组中
                    if(statisticsData[i].printerHeight !== 0) {
                        option.series[0].data.push(statisticsData[i].printHeight)
                    }
                }

                return option
            },

            /**
             * 处理零件数量数据
             */
            componentNumber(statisticsData) {
                let option = {
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        name: '数量/件',
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#00c5aa', //改变折线点的颜色
                                lineStyle: {
                                    color: '#00c5aa' //改变折线颜色
                                }
                            }
                        },
                    }],
                    legend: {
                        orient: 'vertical',
                    },
                    grid: {
                        top: "30px",
                    }
                }

                for (let i = 0; i < statisticsData.length; i++) {
                    //把时间推进option的time字段中
                    option.xAxis.data.push((statisticsData[i].startTime.replace(new RegExp('-', "g"), '/')).replace(" ", "\n"))
                    if(statisticsData[i].componentNumber !== 0) {
                        option.series[0].data.push(statisticsData[i].componentNumber)
                    }
                }
                return option
            },

            /**
             * 处理温度数据
             */
            temperature(statisticsData) {
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['成型桶温度', '桶底温度', '工作台温度'],

                    },
                    grid: {
                        top: "58px",

                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        name: '温度/℃',
                        type: 'value'
                    },
                    series: [
                        {
                            name: '成型桶温度',
                            type: 'line',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '桶底温度',
                            type: 'line',
                            stack: '总量',
                            data: []
                        },
                        {
                            name: '工作台温度',
                            type: 'line',
                            stack: '总量',
                            data: []
                        },
                    ]
                }

                for (let i = 0; i < statisticsData.length; i++) {
                    //把时间推进option的time字段中
                    option.xAxis.data.push((statisticsData[i].time.replace(new RegExp('-', "g"), '/')).replace(" ", "\n"))
                    //保存成型桶温度
                    if(statisticsData[i].bucketTemperature != 0) {
                        option.series[0].data.push(statisticsData[i].bucketTemperature)
                    }
                    if(statisticsData[i].bottomTemperature != 0) {
                        //保存桶底温度
                        option.series[1].data.push(statisticsData[i].bottomTemperature)
                    }
                    if(statisticsData[i].workbenchTemperature != 0) {
                        //保存工作台温度
                        option.series[2].data.push(statisticsData[i].workbenchTemperature)
                    }
                }
                return option
            },
        }
    };
</script>
