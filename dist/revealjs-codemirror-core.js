/*! revealjs-codemirror-core - v0.0.0 - 2013-09-15
* Copyright (c) 2013 ; Licensed MIT */
window.revealjscodemirror = (function(){
  return {
    version: '0.0.0'
  };
})();
(function(CodeMirror, revealjscodemirror){
    'use strict';

    revealjscodemirror.codemirrorify = function(){
        var textareas = document.querySelectorAll('textarea');
        for (var index = 0; index < textareas.length; index++){
            var textarea = textareas[index];
            if (textarea) {
                CodeMirror.fromTextArea(textarea);
            }
        }
    };
})(CodeMirror, revealjscodemirror);
