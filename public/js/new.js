

/*
var vm = new Vue ({
    el: '#vuetree',
data: {
    message: x
}});
*/
var vm = new Vue ({
    el: "#vuetree",
    data() {
        return {
            info: null, //
        }
    },
    mounted() {
        axios
            .get('http://localhost:3000/buckets_raw')
            .then(response => (this.info = response))
    }
})


