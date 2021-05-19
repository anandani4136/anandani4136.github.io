"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//Quick and temporary reference for translation
var spanDict = {
  "book":"libro",
  "laptop":"tableta",
  "remote":"remote",
  "chair":"silla",
  "cell phone":"teléfono móbil",
  "sports ball":"pelota deportiva"
};
var hindiDict = {
  "book":"kitaab",
  "laptop":"iPad",
  "remote":"remote",
  "chair":"kursee",
  "cell phone":"cell phone",
  "sports ball":"Khel kud ki ball"
};


//Text-to-Speech for the identified object
function textSpeak(){
  var text = document.getElementById("detectedObjectLbl").innerHTML
  var valueT = text
  var voice = "US English Female"
  if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectHindi"){
    voice = "Hindi Male"
    for(var key in hindiDict) {
      var value = hindiDict[key];
      if(key==text){
        valueT = value
        break
      } else {
        valueT = text
      }
    }
    responsiveVoice.speak(""+valueT, voice)
  }
  else if(document.getElementById("selectionsID").options[document.getElementById("selectionsID").selectedIndex].value=="selectSpanish"){
    voice = "Spanish Female"
    for(var key in spanDict) {
      var value = spanDict[key];
      if(key==text || key == document.getElementById("detectedObjectLbl").innerHTML){
        valueT = value
        break
      } else {
        valueT = text
      }
    }
    responsiveVoice.speak(""+valueT, voice)
  }
  else{
    responsiveVoice.speak(""+valueT, voice)
  }
}

//updates the text on the page
function updateText(text){
  document.getElementById("detectedObjectLbl").innerHTML = text
}

var recognizedObjects = ["a"]

//parses out the object and updates the canvas to indicate the source of the object detection
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.videoRef = React.createRef(), _this.canvasRef = React.createRef(), _this.styles = {
      position: 'fixed',
      top: 150,
      left: 20
    }, _this.detectFromVideoFrame = function (model, video) {
      model.detect(video).then(function (predictions) {
        _this.showDetections(predictions);

        requestAnimationFrame(function () {
          _this.detectFromVideoFrame(model, video);
        });
      }, function (error) {
        console.log("Couldn't start the webcam");
        console.error(error);
      });
    }, _this.showDetections = function (predictions) {
      var ctx = _this.canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      var font = "24px helvetica";
      ctx.font = font;
      ctx.textBaseline = "top";

      predictions.forEach(function (prediction) {
        var x = prediction.bbox[0];
        var y = prediction.bbox[1];
        var width = prediction.bbox[2];
        var height = prediction.bbox[3];
        // Draw the bounding box.
        if(prediction.class!="person"){
          ctx.strokeStyle = "#2fff00";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, width, height);
          // Draw the label background.
          ctx.fillStyle = "#2fff00";
          var textWidth = ctx.measureText(prediction.class).width;
          var textHeight = parseInt(font, 10);
          // draw top left rectangle
          ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
          // draw bottom left rectangle
          ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

          // Draw the text last to ensure it's on top.
        
          ctx.fillStyle = "#990000";
          ctx.fillText(prediction.class, x, y);
          ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
          console.log((prediction.class))
          updateText(prediction.class)
          if(prediction.score.toFixed(2) > 0.7){
            if(!recognizedObjects.includes(prediction.class)){
              textSpeak();
              recognizedObjects.unshift(prediction.class)
              recognizedObjects.pop()
            }
            //console.log(recognizedObjects) 
          }
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // reference to both the video and canvas


  // we are gonna use inline style


  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
        // define a Promise that'll be used to load the webcam and read its frames
        var webcamPromise = navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        }).then(function (stream) {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the videoRef
          _this2.videoRef.current.srcObject = stream;

          return new Promise(function (resolve) {
            _this2.videoRef.current.onloadedmetadata = function () {
              resolve();
            };
          });
        }, function (error) {
          console.log("Couldn't start the webcam");
          console.error(error);
        });

        // define a Promise that'll be used to load the model
        var loadlModelPromise = cocoSsd.load();

        // resolve all the Promises
        Promise.all([loadlModelPromise, webcamPromise]).then(function (values) {
          _this2.detectFromVideoFrame(values[0], _this2.videoRef.current);
        }).catch(function (error) {
          console.error(error);
        });
      }
    }

    // here we are returning the video frame and canvas to draw,
    // so we are in someway drawing our video "on the go"

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement("video", {
          style: this.styles,
          autoPlay: true,
          muted: true,
          ref: this.videoRef,
          width: "720",
          height: "600"
        }),
        React.createElement("canvas", { style: this.styles, ref: this.canvasRef, width: "720", height: "650" })
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);