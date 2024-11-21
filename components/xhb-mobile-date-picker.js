/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应vue2 h5 的时间选择器组件，适应h5移动端系统;依赖框架vue vant2 框架，字体图标为个人字体图标，server，oss已集成的阿里巴巴图标 
 * */

var xhbMobileDatePicker = {
    name:"xhbMobileDatePicker",
    template:`<div class="xhb-mobile-date-picker-container">
            <div class="xhb-mobile-date-picker flex_flex-start">
                <i class="iconfont icon-icon-test59 xhb-mobile-date-picker-arrow"></i>
                <div class="xhb-mobile-date-picker-input-box"  @click="openPicker">
                    <i class="iconfont icon-rili1 xhb-mobile-date-picker-preicon"></i>
                    <input v-model="val"  class="xhb-mobile-date-picker-input" :placeholder="placeholder" readonly  
                    :type="(val && val != '') ? 'hidden' : 'text' "/>
                    <span v-show="val && val != '' ">{{val}}</span>
                </div>						
                <i class="iconfont icon-icon-test61 xhb-mobile-date-picker-arrow"></i>
            </div>
            <van-popup v-model="showDatePicker" position="bottom" :close-on-click-overlay="false" v-if="vantDatePickerType.includes(type)">
                <van-datetime-picker
                    v-model="dateDatePicker.currentDate"
                    :type="type"
                    :title="placeholder"
                    :min-date="dateDatePicker.minDate"
                    :max-date="dateDatePicker.maxDate"
                    @confirm="confirmDateEvent"
                    @cancel="showDatePicker = false"
                    />
            </van-popup>
            <van-popup v-model="showYearPicker" position="top" :close-on-click-overlay="false" v-if="type == 'year'">
				<van-picker show-toolbar :columns="yearList" 
					ref="diyYearPickerDOM"
					v-model="yearDatePicker.currentDate"
					:title="placeholder"
					@confirm="confirmYearEvent"
					@cancel="showYearPicker = false" />
			</van-popup>
        </div>`,
    data() {
        return {
            // val: this.value,
            xhbMobileDatePickerKey:+new Date(),
            showDatePicker:false,
			dateDatePicker:{},
            vantDatePickerType:['date','year-month'],//vant组件支持的日期类型
            showYearPicker:false,
            yearList:[],
            yearDatePicker:{
                currentDate:[$.getOnTime('y')],
            },
        }
    },
    computed:{
        val(){
            if(this.vantDatePickerType.includes(this.type)){
                return this.value
            }else{
                return this.yearDatePicker.currentDate[0]
            }
            
        }
    },
    watch:{					
        val(newValue){
            this.$emit('input', newValue);//父子组件双向数据绑定value输入
        }
    },
    created() {
        let commonDefaultDate = this.getCommonDateOptions();
        this.dateDatePicker = {...commonDefaultDate};
        this.yearList = this.getYearList(1997,2099);
    },
    props:{
        placeholder:{
            type: String,
            default:'请输入内容'
        },
        value:{
            type: String,
            default:''
        },
        type:{//定义日期类型时间类型，可选值为 year, year-month，date           
            type: String,
            default:'date'
        }
        
    },
    mounted() {

    },
    methods:{
        getYearList(minYear,maxYear){
            let list = [];
            for (let index = minYear; index <= maxYear; index++) {
                list.push(index);
            }
            return list
        },
        getCommonDateOptions(){
            return {
                minDate: new Date(1997, 0, 1),
                maxDate: new Date(2099, 12, 31),
                currentDate: new Date(),
            }
        },
        getYearList(minYear,maxYear){
            let list = [];
            for (let index = minYear; index <= maxYear; index++) {
                list.push(index);
            }
            return list
        },
        // 打开弹层
        openPicker(){
            if(this.type == 'year'){//自定义选择器
                this.showYearPicker = true;
                this.$emit('open_year_picker',this.val)
                if(this.yearDatePicker.currentDate != '') {			
                    this.$nextTick(()=>{
                        this.$refs.diyYearPickerDOM.setValues( this.yearDatePicker.currentDate );
                    });
                    
                }
            }else{//vant选择器
                this.showDatePicker = true;
                this.$emit('open_date_picker',this.val)
            }
            
        },
        //确定日期
        confirmDateEvent(value){
            let typeFormatDateList = {
                'year': 'yyyy',
                'date':'yyyy-MM-dd',
                'year-month':'yyyy-MM'
            };            

            this.showDatePicker = false;               
            if(value && value != ''){
                let res = this.formatDateToAny(value, typeFormatDateList[this.type]);
                // 需要父组件回写
                this.$emit('confirm_date_event',res);
            }         
        },
        // 确定年
        confirmYearEvent(value,index){
            this.$emit('confirm_year_event',value);
            this.showYearPicker = false;            
            if(value && value != ''){
                this.yearDatePicker.currentDate = [value];		
            }
        },
        /**
         * 时间对象
         * @param {Date} date 时间对象
         * @param {String} sFormat 格式符号
         * yyyy-MM-dd h:m:s	年月日时分秒，如：“2018-12-12 12:12:02”
            yyyy-MM-dd 	年月日，如：“2018-12-12”
            yyyy-MM	年月，如：“2018-12”
            yyyy	年，如：“2018”
        */
        formatDateToAny(date,sFormat) {
            // console.info('日子', date.getFullYear())
            // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            return this.timestampToTime(+date / 1000, sFormat)
        },        
        /**
         * 时间戳转换格式
         * @param {Number} timestamp3 时间戳
         * @param {String} sFormat 要转换的数据格式,不传为：'yyyy-MM-dd h:m:s'
         sFormat格式字符串:
            'yyyy-MM-dd h:m:s'年月日时分秒
            'yyyy-MM-dd'
            'yyyy-MM'
            'h:m'
            'yyyy'
            .....
            */
        timestampToTime(timestamp3, sFormat) {
            function addZero(n) {
                return (n <= 9 ? ("0" + n) : n);
            }
            var newDate = new Date();
            newDate.setTime(timestamp3 * 1000);
            Date.prototype.format = function(format) {
                var date = {
                    "M+": addZero(this.getMonth() + 1),
                    "d+": addZero(this.getDate()),
                    "h+": addZero(this.getHours()),
                    "m+": addZero(this.getMinutes()),
                    "s+": addZero(this.getSeconds()),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                            date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
                }

                return format;
            }
            return newDate.format(sFormat || 'yyyy-MM-dd h:m:s');
        },
    }

};