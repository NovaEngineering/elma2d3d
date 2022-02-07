$(document).ready(() => { 
      $.get("http://localhost:3000/buckets", (data) =>{
      $('#quantity').text(`Всего файлов ${data.body.items.length}`)
      $('#list').text('Файлы  проекта:')
      let myObjects = data.body.items;
      for (let i = 0; i < myObjects.length; i++) {
      console.log(myObjects[i].bucketKey);
      $('#list').append(`<br> ${myObjects[i].bucketKey}`)  ;     
   };
   //$('#formats').text('Допсутимые форматы:')
   $("body").append('<div id="formats">Список форматов</div>')
   $.get("http://localhost:3000/formats", (data) =>{
           let myFormats = data.body.formats;
     // for (let i = 0; i < myFormats.length; i++) {
     // console.log(myFormats[i]);
      $('#formats').append(`<br> ${data.body.formats.dwg} <br> ${data.body.formats.fbx}`)  ;
     // }
      
   })
})
})
  
