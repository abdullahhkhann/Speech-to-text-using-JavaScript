var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

$(document).ready(function() {
  var textbox = $('#textbox');
  var instructions = $('.instructions');
  var content = '';

  recognition.continuous = true;
  recognition.lang = 'en-US';

  $('#startBtn').click(function (event) {
      if(content.length) {
        content += ' ';
      }
      recognition.start();
    });

    textbox.on('input', function (){
      content = $(this).val();
    });

  $('.stopBtn').click(function (event) {
    recognition.stop();
  });

  $('.clearBtn').click(function (event) {
    content = '';
    textbox.val(content);
    instructions.text('Text Cleared!');
    recognition.stop();
  });

  recognition.onstart = function () {
    instructions.text("Recording Voice....");
  };

  recognition.onend = function () {
    instructions.text("Voice Recording Stopped!");
  };

  recognition.onspeechend = function () {

    instructions.text("Voice Recording Stopped!");
    recognition.stop();

// ------------------------------------------------------------------------------------------------------------
    /*var answer = window.prompt("You've stopped speaking \n Do you want to continue recording? (yes/no) ");
    if (answer == "yes") {
      //recognition.start();
      //recognition.onstart = function () {
        instructions.text("Click the button to continue recording!");
        recognition.start();
      //};
    }
    else if (answer == "no") {
      //recognition.stop();
      //recognition.onend = function () {
        instructions.text("Voice Recording Stopped!");
        recognition.stop();
      //};
    }
    else {
      alert("Invalid response \n Please enter 'yes' or 'no'");
      instructions.text("");
      recognition.stop();
    }*/
// -------------------------------------------------------------------------------------------------------------
  };

  recognition.onerror = function () {
    instructions.text("Something went wrong, please try again...")
  };

  recognition.onresult = function (event) {
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;

    content += transcript;

    textbox.val(content);
  };
});
