/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应vue2 h5 的tab页组件，适应h5移动端系统;依赖框架vue vant2 框架，字体图标为个人字体图标，server，oss已集成的阿里巴巴图标
 * */

var xhbMobileCommonTab = {
    name:"xhbMobileCommonTab",
    template:`<div class="xhb-mobile-common-tab diy-tab-box "  :class="vertical ? 'diy-tab-box-vertical' : '' ">
                <a class="diy-tab-item" :class="item.active ? 'active' : ''" v-for="(item,index) in diyTabList" :key="index" 
                @click="tabClick(item)">{{ item.name }}</a>
            </div>`,
    data() {
        return {
            diyTabList:this.list,
            currDiyTabSort:1,
        }
    },
    watch:{					
        
    },
    created() {
       
    },
    props:{
        list:{
            type:Array,
            default(){
              return []
            }
        },
        vertical:{
            type:Boolean,
            default:false
        }
        
    },
    mounted() {

    },
    methods:{
        tabClick(item){
            if(this.currDiyTabSort == item.id) return;
            this.diyTabList.forEach(item => {
                item.active = false;
            });
            item.active = true;
            this.currDiyTabSort = item.id;
            
            this.$emit('tab_click',item)
        
        },
        currDiyTabSortChange(sort){
            this.currDiyTabSort = sort;
        }
    }

};