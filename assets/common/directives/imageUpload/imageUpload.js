/**
 * @ngdoc directive
 * @name csImageUpload
 * @restrict E
 *
 * @description
 * Create an image upload element.
 * -  Upload file either by clicking on element, or dragging and dropping file over element
 * -  after file upload, file fills the container as background-image
 * - 'hover' class added to element when dragging file over it
 * - display edit and delete buttons once image is uploaded
 *
 * @param {string=} imageUri Variable where dataURI (in Base64) is saved once file uploaded. Set to '' if empty.
 * @param {string} [name="image"] Override product name.
 * @param {string} [defaultImg="assets/flower-img.png"] Override default flower image that displays.
 * @param {string} [height="160px"] Override height.
 * @param {string} [width="250px"] Override width.
 *
 * @example
 * $scope.imageDataURI = ''; // data URI will be attached here
 * <image-upload
 *   image-uri="imageDataURI"
 *   name="product logo"
 *   default-img="assets/another-img.png"
 *   width="100%"
 *   height="200px">
 * </image-upload>
 */


angular.module('directives.imageUpload', [])

.directive("imageUpload", function () {
  return {
    restrict: 'E',
    scope: {
      imageUri: '=',
      name: '@',
      defaultImg: '@',
      width: '@',
      height: '@'
    },
    replace: true,
    templateUrl: 'directives.imageUpload.html',
    link: function (scope, element, attributes) {
      var rawElement = element[0];
      var $imageInfo = element.find('.image-info');
      var $editButtons = element.find('.edit-buttons');

      var _setWidthAndHeight = function () {
        element.css({
          width: scope.width || '250px',
          height: scope.height || '160px'
        });
      };

      var _addBackgroundImg = function (dataURI) {
        element.css({
          background: 'url(' + dataURI + ') no-repeat center',
          backgroundSize: 'auto 100%'
        });
        $imageInfo.hide();
        $editButtons.show();
      };

      var _removeBackgroundImg = function () {
        element.css({
          'background-image': '',
          'background-color': '#F8F8F8'
        });
        $imageInfo.show();
        $editButtons.hide();
      };

      var _readAndSaveFile = function (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
          scope.$apply(function () {
            scope.imageUri = event.target.result;
          });
        };
        reader.readAsDataURL(file);
      };

      var _promptFileUpload = function () {
        var $fileInput = angular.element('<input type="file"/>');
        $fileInput[0].click();
        $fileInput.on('change', function (changeEvent) {
          _readAndSaveFile(changeEvent.target.files[0]);
        });
      };

      var _listenForFileDrop = function () {
        rawElement.ondragover = function () {
          return false;
        };
        rawElement.ondragend = function () {
          return false;
        };
        rawElement.ondrop = function (event) {
          event.preventDefault();
          _readAndSaveFile(event.dataTransfer.files[0]);
        };
      };

      var _addOrRemoveBackground = function () {
        if (!scope.imageUri) {
          _removeBackgroundImg();
        } else {
          _addBackgroundImg(scope.imageUri);
        }
      };

      var _deleteImage = function() {
        scope.imageUri = '';
      };

      var _init = function () {
        scope.name = scope.name || 'image';
        scope.promptFileUpload = _promptFileUpload;
        scope.deleteImage = _deleteImage;

        _setWidthAndHeight();
        _listenForFileDrop();
        _addOrRemoveBackground();

        scope.$watch('imageUri', function () {
          _addOrRemoveBackground();
        });
      };
      _init();
    }
  };
});
