<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Menssagens</div>

                    <div class="card-body">
                        <div class="alert alert-info" v-if="messages.length <= 0" >
                            Nenhuma Menssagem!
                        </div>
                        <p v-for="(message, index) in messages" :key="index" >
                            <strong>{{ message.title }}</strong> - <small>{{ message.created_at }}</small><br>
                            {{ message.body }}<br>

                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                messages:[]
            }
        },
        mounted() {
            Echo.channel('message-received').listen('SendMessage', (e) => {
                this.messages.push(e);
                console.log(e);
            });
        }
    }
</script>
