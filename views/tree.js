$(document).ready(
   () => { $('#tree').jstree({
        "core" : {
            "data" : {
                "url" : "http://localhost:3000/buckets",
                "dataType" : "json",
                "data": function (node) {
                    return { "id": node.id };
                  }
                            }
    }
    })
    }
);
