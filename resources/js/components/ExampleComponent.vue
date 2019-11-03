<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Menssagens</div>

                    <div class="card-body">
                        <div class="alert alert-info" v-if="Object.keys(dataMessage).length === 0 && dataMessage.constructor === Object" >
                            Não há Menssagens!
                        </div>
                        <p v-for="(msg, index) in dataMessage" :key="index" >
                            <strong>{{ msg.title }}</strong> - <small>{{ msg.created_at }}</small><br>
                            {{ msg.body }}<br>
                        </p>
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
        props:[
            'userId',
            'msgs'
        ],
        data () {
            return {
                dataMessage:{},
                messages:[]
            }
        },
        mounted() {
            Echo.private('message.received.'+this.userId).listen('SendMessage', (e) => {
                this.messages.push(e);
                console.log(e);
            });

            this.dataMessage = JSON.parse(this.msgs);
        }
    }
</script>
