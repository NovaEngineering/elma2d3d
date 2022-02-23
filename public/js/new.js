   
//Это данные для дерева
var treeBucketsData = {
    name: "Перечень файлов",
    children: [
      {name: "warestore2"},   
      {name: "warestore3"}
    ]
}

//Это компонент c глобальной регистрацией
//Компонент - переиспользованный экземпляр Vue
// tree-item - название компонента
Vue.component("tree-item", {
template: "#item-template",
// props список входных параметров
props: {
  item: Object
},
});

//Разбираем экземпляр Vue

var demo = new Vue({
  //Это все опции
  // Селектор html элемента
  el: "#demo",
  // Данные
  data: {
    //treeData уходит в html tag tree-item, что етсь компонент
    treeData: treeBucketsData
  },

  methods: {
    makeFolder: function(item) {
      Vue.set(item, "children", []);
      this.addItem(item);
    },
    addItem: function(item) {
      item.children.push({
        name: "new stuff"
      });
    }
  }
});
