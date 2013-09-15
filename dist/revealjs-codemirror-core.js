/*! revealjs-codemirror-core - v0.0.0 - 2013-09-16
* Copyright (c) 2013 ; Licensed MIT */
window.revealjscodemirror = (function(){
  return {
    version: '0.0.0'
  };
})();
(function(CodeMirror, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            var classAttribute = domNode.getAttribute('class');
            if (classAttribute && classAttribute.indexOf('code') !== -1) {
                return true;
            }
        }
        return false;
    }

    revealjscodemirror.codemirrorify = function(){
        var textareas = document.querySelectorAll('textarea');
        for (var index = 0; index < textareas.length; index++){
            var textarea = textareas[index];
            if (hasCodeClass(textarea)) {
                CodeMirror.fromTextArea(textarea);
            }
        }
    };
})(CodeMirror, revealjscodemirror);
