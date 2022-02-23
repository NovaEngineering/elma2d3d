$(document).ready(
        () => { $('#tree').jstree({
    "core" : {
        "data" :
        {
            "url" : "/buckets",
            "dataType" : "json",
            "data": function (node) {
                return {    
                    "id": node.id,
                };
            }
        }
    }
    })
    },
    jQuery("a").on('click', () => {console.log('chosen1')})
);
