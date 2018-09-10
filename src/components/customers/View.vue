<template>
    <div class="customer-view" v-if="customer">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>{{ customer.id }}</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>{{ customer.name }}</th>
                </tr>
                <tr>
                    <th>Email</th>
                    <th>{{ customer.email }}</th>
                </tr>
                <tr>
                    <th>Phone</th>
                    <th>{{ customer.phone }}</th>
                </tr>
                <tr>
                    <th>Website</th>
                    <th>{{ customer.website }}</th>
                </tr>
            </table>
            <router-link to="/customers">Back to all customers</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Customer",
        created(){
            axios.get(`http://vue-spa-api/api/customers/${this.$route.params.id}`, {
                headers: {
                    "Authorization": `Bearer ${ this.$store.getters.currentUser.token }`
                }
            })
                .then((response) => {
                    this.customer = response.data.customer;
                })
                .catch((err) => {
                    reject("Wrong something");
                })
        },
        data() {
            return {
                customer: null
            }
        }
    }
</script>

<style scoped>
    .customer-view{
        display: flex;
        align-items: center;
    }
    .user-img{
        flex: 1;
    }
    .user-img img {
        max-width: 160px;
    }
    .user-info {
        flex: 3;
        /*overflow-x: scroll;*/
    }
</style>