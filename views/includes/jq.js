$(document).ready(() => { 
      //Список файлов проекта
      $.get("http://localhost:3000/buckets", (data) =>{
            $('#quantity').text(`Всего файлов ${data.body.items.length}`)
            $('#list').text('Файлы  проекта:')
            let myObjects = data.body.items;
            for (let i = 0; i < myObjects.length; i++) {
              $('#list').append(`<br> ${myObjects[i].bucketKey}`)  ;     
            };
      })
      //Форматы
      $.get("http://localhost:3000/formats", (data) =>{
            $('#formats').append(`<br> ${data.body.formats.dwg} <br> ${data.body.formats.fbx}`)  ;
      });
            
});

