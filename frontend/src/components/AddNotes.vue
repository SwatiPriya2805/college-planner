<template>
        <div class="container mb-4" id="add-event-box">
            <h3 class="text-white">Add new notes</h3>
            <hr>
            <!--- input form for adding notes -->
            <form @submit.prevent="addNotes()" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="subject">Subject</label>
                        <input 
                            type="text"
                            class="form-control"
                            name="subject"
                            id="subject"
                            v-model.trim="form.subject"
                            placeholder="Subject name" 
                            @blur="$v.form.subject.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.subject),
                                'is-valid': shouldAppendValidClass($v.form.subject)
                            }"
                        />
                        <div v-if="$v.form.subject.$error">
                            <div v-if="!$v.form.subject.required" class="error-message">
                                <small>The subject field is required</small>
                            </div>
                            <div v-if="!$v.form.subject.minLength" class="error-message">
                                <small>The subject must have at least 8 characters</small>
                            </div>
                        </div>
                </div>

                <div class="form-group">
                  <label for="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="form-control"
                        v-model="form.description" 
                        placeholder="Add event description" 
                        rows="2"
                        @blur="$v.form.description.$touch()"
                        :class="{
                            'is-invalid': shouldAppendErrorClass($v.form.description),
                            'is-valid': shouldAppendValidClass($v.form.description)
                        }"
                    >
                    </textarea>
                    <div v-if="$v.form.description.$error">
                        <div v-if="!$v.form.description.required" class="error-message">
                            <small>The description field is required</small>
                        </div>
                        <div v-if="!$v.form.description.minLength" class="error-message">
                            <small>The description must have at least 12 characters</small>
                        </div>
                    </div> 
                </div>

                <div class="form-group">
                  <label for="link">Link</label>
                    <input 
                        name="link" 
                        id="link" 
                        class="form-control"
                        v-model.trim="form.link"
                        placeholder="https://lnkd.in/gJaxw8A"
                        @blur="$v.form.link.$touch()"
                        :class="{
                            'is-invalid': shouldAppendErrorClass($v.form.link),
                            'is-valid': shouldAppendValidClass($v.form.link)
                        }"
                    />
                    
                    <div v-if="$v.form.link.$error">
                        <div v-if="!$v.form.link.required" class="error-message">
                            <small>The link field is required</small>
                        </div>
                    </div> 
                </div>

                <button class="btn btn-info" type="submit" :disabled="$v.form.$invalid">Add notes</button>
            </form>
        </div>
      
</template>

<script>

    import Vue from 'vue';
    import { required, minLength } from 'vuelidate/lib/validators'
    import { addNotes } from '@/services/addNotes';
    import config from '@/config';

    export default {
        name: 'AddNotes',
        data() {
            return {
                processing: false,
                form: {
                    uploadDate: new Date().toDateString(),
                    subject: '',
                    description: '',
                    link:'',
                }
            };
        },
        validations: {
            form: {
                subject: {
                    required,
                    minLength: minLength(8)
                },
                description:{
                    required,
                    minLength:minLength(12)
                },
                link:{
                    required
                }
            }
        },
        methods: {
            
            addNotes() {
                this.$v.form.$touch();
                if( !this.$v.form.$invalid ) {
                    addNotes( this.form )
                        .then(() => this.$router.push( { name: 'notes' } ))
                        .then(()=>{
                            Vue.$toast.open({
                                message:'New notes added',
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
</style>