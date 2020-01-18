<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Edit User</div>

                    <div class="card-body">
                        <form @submit.prevent="editUser">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>User Name:</label>
                                        <input type="text" class="form-control" v-model="user.name">
                                        <span v-if="errors && errors.name" class="text-danger">{{ errors.name[0] }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>User Email:</label>
                                        <input type="text" class="form-control" v-model="user.email">
                                        <span v-if="errors && errors.email"
                                            class="text-danger">{{ errors.email[0] }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Address:</label>
                                        <textarea class="form-control" v-model="user.address"></textarea>
                                        <span v-if="errors && errors.address"
                                            class="text-danger">{{ errors.address[0] }}</span>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Details:</label>
                                        <textarea class="form-control" v-model="user.details"></textarea>
                                        <span v-if="errors && errors.address"
                                            class="text-danger">{{ errors.details[0] }}</span>
                                    </div>
                                </div>
                            </div>


                            <br />
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <button class="btn btn-danger float-left" @click="goBack">Back</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success float-right">Edit User</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                id: this.$route.params.id,
                user: {},
                errors: {},
            }
        },
        mounted() {
            this.getBook();
        },
        methods: {
            getBook() {
                axios.get(`${CP.baseApiUrl}/users/${this.id}`)
                    .then(response => {
                        this.user = response.data;
                    });
            },

            editUser() {
                axios.put(`${CP.baseApiUrl}/users/${this.user.id}`, this.user)
                    .then(response => {
                        this.user = {};
                        this.$router.push('/');
                        //this.$toastr.s("SUCCESS", "User successfully edited");
                    })
                    .catch(error => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors || {};
                        }
                        this.$toastr.e("Something went wrong");
                    });
            },

            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>
