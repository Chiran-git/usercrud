<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">User Create Component</div>

                    <div class="card-body">
                        <form>

                            <span v-for="error in errors" class="error">{{ error }}</span>

                            <section v-if="step == 1">
                                <h3>Step 1</h3>
                                <input type="text" 
                                    name="" class="form-control" 
                                    placeholder="What is your name?" 
                                    v-model="form.name">
                            </section>

                            <section v-if="step == 2">
                                <h3>Step 2</h3>
                                <input type="tel" 
                                    name="" class="form-control" 
                                    placeholder="What is your is telephone no?" 
                                    v-model="form.phone">
                                <input type="email" name="" 
                                    class="form-control" 
                                    placeholder="What is your email address?" 
                                    v-model="form.email">
                            </section>

                            <section v-if="step ==3">
                                <h3>Step 3</h3>
                                <textarea 
                                    placeholder="Type your message" 
                                    class="form-control" 
                                    v-model="form.message"></textarea>
                            </section>

                            <button 
                                class="btn btn-warning btn-xs float-left" 
                                @click.prevent="prevStep()"
                                v-if="step !== 1">Prev</button>
                            <button 
                                class="btn btn-success btn-xs float-right" 
                                @click.prevent="nextStep()"
                                v-if="step !== totalSteps">Next</button>

                            <button 
                                class="btn btn-success btn-xs float-right" 
                                @click.prevent="submit()"
                                v-if="step == 3">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                step: 1,
                totalSteps : 3,

                form: {
                    name: null,
                    email: null,
                    phone: null,
                    message: null
                },

                errors: []
            }
        },

        mounted() {

        },

        methods: {

            prevStep() {
                this.step--;
            },

            nextStep() {
                if (this.validate()) {
                    this.step++;
                }
            },


            validate() {
                if (this.step == 1) {
                    console.log("this is step 1")
                    if (!this.form.name) {
                        this.errors = "Please fill up your name";
                        return false;
                    }
                }

                if (this.step == 2) {
                    console.log("this is step 2")
                    if (!this.form.email) {
                        this.errors = "Please provide your email";
                        return false;
                    }
                    if (!this.form.phone) {
                        this.errors = "Please provide a phone number";
                        return false;
                    }
                }

                if (this.step == 3) {
                    console.log("this is step 3")
                    if (!this.form.message) {
                        this.errors = "Please fill up your message";
                        return false;
                    }
                }

                this.errors = [];
                return true;
            },

            submit() {

            }
        }
    }
</script>

<style scoped>
    .error {
        color : red;
    }
</style>
