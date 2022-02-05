$(document).ready(() => { 
   $.get("http://localhost:3000/buckets", (data) =>{console.log(data.body.items); $('#list').text(data.body.items);})
   
})