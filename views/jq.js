$(document).ready(() => { 
   $.get("http://localhost:3000/buckets", (data) =>{
      $('#quantity').text(`Всего файлов ${data.body.items.length}`)
      $('#list').text('Файлы  проекта:')
      let myObjects = data.body.items;
      for (let i = 0; i < myObjects.length; i++) {
      console.log(myObjects[i].bucketKey);
      $('#list').append(`<br> ${myObjects[i].bucketKey}`)      
   }
})
})
  
