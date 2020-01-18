<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12" id="userList">
                <div class="card">
                    <div class="card-header">
                        Users
                        <router-link :to="'/users/create'" 
                            class="btn btn-primary btn-xs float-right">Creeate
                        </router-link>
                        <div class="input-group input-group-sm">
                            <input class="form-control form-control-navbar" @keyup="searchit" v-model="search" type="search" placeholder="Search" aria-label="Search">
                            <div class="input-group-append">
                                <button class="btn btn-navbar btn-info" @click="searchit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users.data" :key="user.id" 
                                    v-on:click="clickRow(user)"
                                    class='clickable-row'>
                                    <td>{{user.name}}</td>
                                    <td>{{user.email}}</td>
                                    <td>
                                        <router-link :to="'/users/'+user.id" class="btn btn-primary">Edit</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="users" 
                            :limit="3" @pagination-change-page="searchit" 
                            v-if="search.length > 1"></pagination>
                        <pagination :data="users" 
                            :limit="3" @pagination-change-page="getUsers" 
                            v-else></pagination>
                    </div>
                </div>
            </div>

            <div class="col-md-6" v-if="Object.keys(user).length > 0">
                <div class="card">
                    <div class="card-header">User details
                        <button type="button" class="close" @click="closeDetails">&times;</button>
                    </div>

                    <div class="card-body">
                        <h4>Name:</h4>{{ user.name }}
                        <h4>Email:</h4>
                        <p>{{ user.email }}</p>
                        <h4>Address:</h4>
                        <p>{{ user.address }}</p>
                        <h4>Details:</h4>
                        <p>{{ user.details }}</p>
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
                user: {},
                users: {},
                search:''
            }
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers(page = 1) {
                axios.get(`${CP.baseApiUrl}/users?page=${page}`)
                    .then(response => {
                        this.users = response.data;
                    });
            },

            searchit(page = 1) {
                let search = this.search;
                if (search.length > 1) {
                    axios.get(`${CP.baseApiUrl}/users?page=${page}&search=${this.search}`)
                    .then(response => {
                        this.users = response.data;
                    });
                }else{
                    this.getUsers();
                }
            },

            clickRow (user) {
                axios.get(`${CP.baseApiUrl}/users/${user.id}`)
                    .then(response => {
                        document.getElementById('userList').className = "col-md-6";
                        this.user = response.data;
                    });
            },

            closeDetails() {
                this.user = {};
                document.getElementById('userList').className = "col-md-12";
            }
        }
    }

</script>