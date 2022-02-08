var viewer = null;
var options = {getAccessToken: getForgeToken};
var tokenCoded = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d2FyZXN0b3JlMi8zMi0yMS0lRDAlOTMlRDAlQUQyXyVEMCU5NSVEMCVBMSVEMCU5RiVEMCU5NCVEMCU5N18lRDAlQUQlRDAlQkIlRDAlQkMlRDAlQjBfJUQwJUExJUQwJUJBJUQwJUJCJUQwJUIwJUQwJUI0JUUyJTg0JTk2Ml8lRDAlQUQucnZ0'
// токен из forgetool vscode
  var tokenTool = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d2FyZXN0b3JlMi8zMi0yMS0lRDAlOTMlRDAlQUQyXyVEMCU5NSVEMCVBMSVEMCU5RiVEMCU5NCVEMCU5N18lRDAlQUQlRDAlQkIlRDAlQkMlRDAlQjBfJUQwJUExJUQwJUJBJUQwJUJCJUQwJUIwJUQwJUI0JUUyJTg0JTk2Ml8lRDAlQUQucnZ0'

var documentId ="urn:"+tokenCoded;
console.log(documentId);    
      // токен из https://www.base64encode.org/
      

        Autodesk.Viewing.Initializer(options, function onInitialized() {
            var htmlDiv = document.getElementById("forgeViewer");
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
            url: "/publictoken",
            success: function (res) {callback(res.access_token, res.expires_in), console.log(res.access_token)},  
           
        });
      }
    