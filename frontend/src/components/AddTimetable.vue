<template>
        <div class="container" id="add-event-box">
            <h3 class="text-white">Add new time table</h3>
            <hr>
            <!--- input form for adding notes -->
            <form @submit.prevent="addTimetable()" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="semester">Semester</label>
                        <input 
                            type="number"
                            class="form-control"
                            name="semester"
                            id="semester"
                            v-model.trim="form.semester"
                            placeholder="Semester number" 
                            @blur="$v.form.semester.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.semester),
                                'is-valid': shouldAppendValidClass($v.form.semester)
                            }"
                        />
                        <div v-if="$v.form.semester.$error">
                            <div v-if="!$v.form.semester.required" class="error-message">
                                <small>The semester field is required</small>
                            </div>
                            <div v-if="!$v.form.semester.checkSem" class="error-message">
                                <small>The semester must have value between 1 - 10.</small>
                            </div>
                        </div>
                </div>

                <div class="form-group">
                    <label for="image">Image</label>
                    <br/>
                        <!-- <input 
                            type="file"
                            name="image"
                            id="image"
                            @change="onFileSelected"
                            @blur="$v.form.image.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.image),
                                'is-valid': shouldAppendValidClass($v.form.image)
                            }"
                        /> -->
                        <input 
                            class="form-control"
                            type="text" 
                            name="image" id="image"
                            v-model="form.image"
                            @blur="$v.form.image.$touch()"
                                :class="{
                                    'is-invalid': shouldAppendErrorClass($v.form.image),
                                    'is-valid': shouldAppendValidClass($v.form.image)
                                }"
                        />
                        <br/>
                        <div v-if="$v.form.image.$error">
                            <div v-if="!$v.form.image.required" class="error-message">
                                <small>The image field is required</small>
                            </div>
                        </div>
                        <!-- <div v-if="this.form.image !== null">
                            Image preview
                            <br/>
                            <img class="m-2 image" :src="avatar" alt="selected image" width="600">
                        </div> 
                        <div v-if="$v.form.image.$error">
                            <div v-if="!$v.form.image.checkFile" class="error-message">
                                <small>The image field is required</small>
                            </div>
                        </div> -->
                </div>


                <button class="btn btn-info" type="submit" :disabled="$v.form.$invalid">Add time table</button>
            </form>
        </div>
      
</template>

<script>

    import Vue from 'vue';
    import { required} from 'vuelidate/lib/validators'
    import { addTimetable } from '@/services/addTimetable';
    import config from '@/config';

    export default {
        name: 'AddTimetable',
        data() {
            return {
                processing: false,
                form: {
                    uploadDate: new Date().toDateString(),
                    semester: '',
                    image:'',
                    //image:null
                },
                //avatar:null
            };
        },
        validations: {
            form: {
                semester: {
                    required,
                    checkSem: function(value) {
                        if(value>=1 && value<=10){
                            return true;
                        }
                        else{
                            return false;
                        }
                    },
                },
                image:{
                    // checkFile: function(){
                    //      if(this.form.image === null){
                    //         return false;
                    //     }
                    //     else{
                    //         return true;
                    //     }
                    // },
                    required
                }
            }
        },
        methods: {
            // onFileSelected(event){

            //     this.form.image = event.target.files[0];
            //     let reader = new FileReader();
            //     reader.readAsDataURL(this.form.image);
            //     reader.onload = event => {
            //         this.avatar = event.target.result
            //     }
            // },
            addTimetable() {
                this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
                    addTimetable( this.form )
                        .then(() => this.$router.push( { name: 'timetable' } ))
                        .then(()=>{
                            Vue.$toast.open({
                                message:'New time table added',
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        })
                        .catch( error => {
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        });
                } else {
                    console.log( 'invalid input values' );
                }
            },
            shouldAppendValidClass( field ) {
                console.log( field );
                return !field.$invalid && field.$model && field.$dirty;
            },
            shouldAppendErrorClass( field ) {
                return field.$error;
            }
        }
    }
</script>
    
<style scoped>
#add-event-box{
  background-color:rgba(101, 215, 230, 0.801);
  border-radius: 4px;
  padding: 25px;
  border-top: 1px solid rgb(172, 171, 171) !important;
}
@media screen and (min-width: 300px) and (max-width:500px) {
    .image{
        width:300px !important; 
    }
}
</style>