/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应vue2 h5 的自定义图表图例legend组件，适应h5移动端系统;依赖框架vue vant2 框架，字体图标为个人字体图标，server，oss已集成的阿里巴巴图标 
 * */

var diyEchartLegend = {
    name:"diyEchartLegend",
    template:`<div class="diy-echart-legend mg-20" class="flex-wrap">
    <template v-for="(item, index) in list" >
        <div class="diy-echart-legend-item mr-25" :key="index" v-if="item.type" 
            @click.stop="legendItemClick(item, index)"
            :class="item.disabled ? 'diy-echart-legend-item-disabled' : '' " >
            <span class="mr-5 diy-echart-legend-item-icon" :style="{color: item.disabled ? '#ccc' : colorList[index] }">{{ '\u25CF' }}</span>
            <span class="diy-echart-legend-item-text mr-5">{{ item.text }}</span>
            <i class="icon-tanhao iconfont "  v-if="typeof item.notice == 'string'" @click.stop="openNotice(item.notice)"></i>
            <i class="icon-tanhao iconfont "  v-else-if="typeof item.notice == 'object'" @click.stop="openNotice(item.notice)"></i>
        </div> 
      </template>
        <van-popup v-model="showNotice" position="bottom"  >
            <div v-if="typeof noticeText == 'string'" class="pd-20">{{ noticeText }}</div>
            <div v-else-if="typeof noticeText == 'object'" class="pd-20">
                <p v-for="(item,index) in noticeText" :key="index">{{ item }}</p>
            </div>
        </van-popup>
      </div>`,
    data() {
        return {
            list:this.legend_list,
            colorList:this.color_list,
            noticeText:'',
            showNotice:false,
        }
    },
    computed:{
        
    },
    watch:{					
        
    },
    created() {
       
    },
    props:{
        legend_list:{
            type:Array,
            default(){
                return []
            }
        },
        color_list:{
            type:Array,
            default(){
                return []
            }
        },
    },
    mounted() {

    },
    methods:{
        legendItemClick(item, index){
            item.disabled = !item.disabled;
            this.$emit('legend_item_click', {currItem:[item, index], list:this.list})
        },
        openNotice(notice){
            this.noticeText = notice;
            this.showNotice = true;
        }
        
    }

};