var viewer = null;
var options = {getAccessToken: getForgeToken};
var tokenCoded = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d2FyZXN0b3JlMi8zMi0yMS0lRDAlOTMlRDAlQUQyXyVEMCU5NSVEMCVBMSVEMCU5RiVEMCU5NCVEMCU5N18lRDAlQUQlRDAlQkIlRDAlQkMlRDAlQjBfJUQwJUExJUQwJUJBJUQwJUJCJUQwJUIwJUQwJUI0JUUyJTg0JTk2Ml8lRDAlQUQucnZ0'
 //токен из forgetool vscode
  var tokenTool = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d2FyZXN0b3JlMi8zMi0yMS0lRDAlOTMlRDAlQUQyXyVEMCU5NSVEMCVBMSVEMCU5RiVEMCU5NCVEMCU5N18lRDAlQUQlRDAlQkIlRDAlQkMlRDAlQjBfJUQwJUExJUQwJUJBJUQwJUJCJUQwJUIwJUQwJUI0JUUyJTg0JTk2Ml8lRDAlQUQucnZ0'
var selfGet = 'YWRzay5vYmplY3RzOm9zLm9iamVjdDp3YXJlc3RvcmUyLzMyLTIxLSVEMCU5MyVEMCVBRDJfJUQwJTk1JUQwJUExJUQwJTlGJUQwJTk0JUQwJTk3XyVEMCVBRCVEMCVCQiVEMCVCQyVEMCVCMF8lRDAlQTElRDAlQkElRDAlQkIlRDAlQjAlRDAlQjQlRTIlODQlOTYyXyVEMCVBRC5ydnQ='
var documentId ="urn:"+selfGet;
/*
function utf8_to_b64(str)  {
  return window.btoa(str)}

let url = new URL('http://localhost:3000/bucket_details')
url.searchParams.set('bucketKey', 'warestore2');
//console.log(url2);
fetch(url).then(res=>res.json()).then(data => console.log(data.body.items[0].objectId));
let urn = 
   */
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
            url: "/public_token",
            success: function (res) {callback(res.access_token, res.expires_in)},  
           
        });
      }
    