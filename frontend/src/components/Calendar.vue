<template>
    <div class="container mt-5 pt-4">
        <h1>Calendar</h1>
        <hr class="border-info"/>
        <!---input field of calendar page -->
        <div class="date-display">
            <h4 class="font-weight-bold float-left">{{selectedDate | date( 'standard' )}}
                <br/>
                <span class="font-weight-normal">{{day(this.selectedDate)}}</span>
            </h4>
            <form @change.prevent="fetchSearch()" enctype="multipart/form-data">
            <input class="select-date font-weight-bold float-right" id="date" 
                type="date" name="date" v-model="selectedDate"/>
            </form>
            <br/><br/><br/>
        </div>

        <!---calendar rows -->
        <!-- <AppAlert theme="info" v-if="status === 'LOADING'">
            <template v-slot:title>
                <strong>Hey there!</strong>
            </template>
            <strong>We are fetching events data...Hang on</strong>
        </AppAlert>
        
        <AppAlert theme="danger" v-else-if="status === 'ERROR'">
            <strong>{{error.message}}</strong>
        </AppAlert> -->
        
        <div class="calendar-1" > <!--v-else-->
            <AppAlert theme="info" v-if="calendarDummyData.length===0">
                <template v-slot:title>
                <h6>Hey there!</h6>
                </template>
                <h5><i class="fas fa-user-clock"></i> No events for the day.</h5>
            </AppAlert>  

            <AppAlert theme="info" v-else>
                <template v-slot:title>
                <h6>Hey there!</h6>
                </template>
                <h5><i class="fas fa-user-clock"></i> Events scheduled...</h5>
            </AppAlert>

            <div class="calendar">
                <div class="calendar-hour" v-for="hour in 24" :key="hour">
                    <div class="calendar-time text-muted">{{hour-1}}</div>
                    <div class="calendar-hour-box"></div>
                </div>    
                <div class="">
                    <div class="" v-for="calendar in calendarDummyData"
                    :key="calendar._id">
                        <div class="" v-for="events in calendar.events"
                        :key="events._id" >
                            <div class="calendar-events" v-for="dateTime in events.dates"
                            :key="dateTime._id">

                                <div class="calendar-event" v-if="dateTime.date === selectedDate" :style="[getHeight(dateTime),getPosition(dateTime)]">
                                    <div class="calendar-name px-1"><strong>{{calendar.name}} - {{events.title}}</strong></div>
                                    <div class="px-1">Link - <span class="link" v-on:click="link(events.link)">{{events.link}}</span></div>
                                </div> 
                            </div> 
                        </div>        
                    </div>    
                </div>
            </div>  
        </div>      
    </div>
</template>

<script>
    import AppAlert from '@/components/utils/AppAlert';
    //import { fetchCalendarData } from '@/services/calendarData';

    export default{
        name:'Calendar',
        components:{
            AppAlert
        },
        data(){
            return {
                status: 'LOADING',
                selectedDate:'2021-06-30',
                dateTime:[],
                //calendarData: [],
                calendarDummyData:[
                    {
                        _id:1,
                        name:'IET',
                        description:'lorem annnnnnnjscb cjsn ncjds jshbxsc cbshcbi',
                        linkdin:'https://www.linkedin.com/company/iet-on-campus-bit-mesra/',
                        facebook:'https://www.linkedin.com/company/iet-on-campus-bit-mesra/',
                        img:"../assets/IET.png",
                        events:[
                            {
                                _id:122,
                                title:'2 hr K20 DSA Introductory Contest',
                                description:"Tired of sitting at home in this dreary situation?Do not be distraught, as IET BIT Mesra brings you it's Data Structures and Algorithms Introductory contest, to help you sharpen your DSA skills and evaluate your knowledge.",
                                dates:[
                                    {
                                        _id:1234,
                                        date:'2021-06-30',
                                        startTime:{
                                            hours:18,
                                            minutes:0,
                                        },
                                        endTime:{
                                            hours:20,
                                            minutes:0,
                                        }
                                    },
                                    {
                                        _id:1235,
                                        date:'2021-06-29',
                                        startTime:{
                                            hours:17,
                                            minutes:0,
                                        },
                                        endTime:{
                                            hours:20,
                                            minutes:0,
                                        }
                                    },

                                ],
                                link:'https://lnkd.in/gJaxw8A'
                            },
                            {
                                _id:123,
                                title:'K20 DSA Introductory Contest',
                                description:"Tired of sitting at home in this dreary situation?Do not be distraught, as IET BIT Mesra brings you it's Data Structures and Algorithms Introductory contest, to help you sharpen your DSA skills and evaluate your knowledge.",
                                dates:[
                                    {
                                        _id:1233,
                                        date:'2021-06-30',
                                        startTime:{
                                            hours:12,
                                            minutes:15,
                                        },
                                        endTime:{
                                            hours:13,
                                            minutes:0,
                                        }
                                    },
                                    {
                                        _id: 1223,
                                        date:'2021-06-28',
                                        startTime:{
                                            hours:"17",
                                            minutes:"0",
                                        },
                                        endTime:{
                                            hours:"20",
                                            minutes:"0",
                                        }
                                    },

                                ],
                                link:'https://lnkd.in/gJaxw8A'
                            }
                        ],
                    }
                ],
                error: null,
            }
        },
        // created() { // when component instance is created and its data is available
        //     this.status = 'LOADING';
            
        //     fetchCalendarData(this.selectedDate)
        //         .then( calendarData => {
        //             this.calendarData = calendarData;
        //             this.status = 'LOADED';
        //         })
        //         .catch( error => {
        //             this.error = error;
        //             this.status = 'ERROR'
        //         })
            
        // },
        methods:{
            // fetchSearch(){
            //     this.status = 'LOADING';
            
            //     fetchCalendarData(this.selectedDate)
            //         .then( calendarData => {
            //             this.calendarData = calendarData;
            //             this.status = 'LOADED';
            //         })
            //         .catch( error => {
            //             this.error = error;
            //             this.status = 'ERROR'
            //         });
            // },
            day(date){
                var str=(new Date(date)).toDateString();
                return str.substring(0,3);
            },
            getHeight(calendardata){ 
                const endHour=calendardata.endTime.hours, endMinute=calendardata.endTime.minutes,startHour=calendardata.startTime.hours, startMinute= calendardata.startTime.minutes ;
                const HEIGHT_HOUR_BOX = 30, MARGIN_HOUR_BOXES = 5; 
                const totalMinutes = ( endHour - startHour ) * 60 + ( endMinute - startMinute );
                return {
                    height: totalMinutes * HEIGHT_HOUR_BOX / 60 + ( endHour - startHour ) * MARGIN_HOUR_BOXES + 'px'
                };
            },
            
            getPosition( calendardata ) {
                const startHour=calendardata.startTime.hours, startMinute=calendardata.startTime.minutes;
                const minutesFromStartOfDay = startHour * 60 + startMinute;
                console.log(startHour, startMinute, minutesFromStartOfDay);
                const HEIGHT_HOUR_BOX = 30, MARGIN_HOUR_BOXES = 5;
                return {
                    top:(minutesFromStartOfDay * HEIGHT_HOUR_BOX / 60 + startHour * MARGIN_HOUR_BOXES) + 'px',
                    left: '50px',
                    right: '10px'
                };
            },
            
            link(url){
                window.open(url, "_blank");
            }
        }
    }
</script>

<style scoped>
.calendar {
    position: relative;
}

.calendar-hour {
    display: flex;
    margin-bottom: 5px;
}

.calendar-time {
    flex: 0 0 40px;
}

.calendar-hour-box {
    flex-grow: 1;
    min-height: 30px;
    background-color:rgba(137, 211, 236, 0.76);
}
.calendar-event {
    position: absolute;
    background-color: rgb(211, 211, 211);
    opacity: 0.8;
    overflow:auto;
    color:black;
}
.select-date:hover{
    cursor: pointer;
}
.link{
    cursor: pointer;
    color:#175d80;
}
</style>