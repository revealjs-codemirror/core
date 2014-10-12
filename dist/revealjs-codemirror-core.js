/*! revealjs-codemirror-core - v0.0.0 - 2014-10-12
* Copyright (c) 2014 ; Licensed MIT */
window.revealjscodemirror = (function(){
  return {
    version: '0.0.0'
  };
})();
(function(document, CodeMirror, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            var classAttribute = domNode.getAttribute('class');
            return (classAttribute && classAttribute.indexOf('code') !== -1);
        }
        return false;
    }

    function createCodeMirror(textarea){
        var editor = CodeMirror.fromTextArea(textarea);
        if (textarea.dataset && textarea.dataset.runnable) {
            var run = document.createElement('div');
            run.setAttribute('class', 'run');
            run.innerText = 'Run';
            editor.getWrapperElement().appendChild(run);
        }
    }

    revealjscodemirror.codemirrorify = function(){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(createCodeMirror);
    };
})(document, CodeMirror, revealjscodemirror);
