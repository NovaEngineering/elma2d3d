var viewer = null;
var options = {getAccessToken: getForgeToken};

 //токен из манифеста
var tokenManifest = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d2FyZXN0b3JlMy8zMi0yMS0lRDAlOTMlRDAlQUQzXyVEMCU5NSVEMCVBMSVEMCU5RiVEMCU5NCVEMCU5N18lRDAlQUQlRDAlQkIlRDAlQkMlRDAlQjBfJUQwJUExJUQwJUJBJUQwJUJCJUQwJUIwJUQwJUI0JUUyJTg0JTk2M18lRDAlQUQucnZ0'

var documentId ="urn:"+tokenManifest;
        Autodesk.Viewing.Initializer(options, function onInitialized() {
            var htmlDiv = document.querySelector('#forgeViewer')
            viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
            viewer.start();    

            Autodesk.Viewing.Document.load(documentId,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
            );
        });
      
      function onDocumentLoadSuccess(doc) {
        
        var viewable = doc.getRoot().getDefaultGeometry();
        if (viewable) {
          viewer
            .loadDocumentNode(doc, viewable)
            .then(function (result) {
              console.log("Viewable Loaded!");
            })
            .catch(function (err) {
              console.log("Viewable failed to load.");
              console.log(err);
            });
        }
      }

        function onDocumentLoadFailure(viewerErrorCode) {
        console.error(' onDocumentLoadFailureerror');
        }
        // Декларирование функции для авторизации по токену
        function getForgeToken(callback) {
        jQuery.ajax({
            url: "/public_token",
            success: function (res) {callback(res.access_token, res.expires_in)},  
           
        });
      }
    