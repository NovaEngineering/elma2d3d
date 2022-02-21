   
   var treeData = {
        name: "Перечень файлов",
        children: [
            //{name: "warestore2"},
            //{name: "warestore3"}
        ]
  
    }
    
 fetch('http://localhost:3000/buckets').then((res)=> {console.log('full ---  ' + res)});
 fetch('/buckets').then((res)=> {console.log('short ---  ' + res)});

 
 //x.textContent = 'from there to here'
  Vue.component("tree-item", {
    template: "#item-template",
    props: {
      item: Object
    },
    data: function() {
      return {
        isOpen: false
      };
    },
    computed: {
      isFolder: function() {
        return this.item.children && this.item.children.length;
      }
    },
    methods: {
      toggle: function() {
        if (this.isFolder) {
          this.isOpen = !this.isOpen;
        }
      },
      makeFolder: function() {
        if (!this.isFolder) {
          this.$emit("make-folder", this.item);
          this.isOpen = true;
        }
      }
    }
  });

  // boot up the demo
  var demo = new Vue({
    el: "#demo",
    data: {
      treeData: treeData
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

  console.log(document.styleSheets)