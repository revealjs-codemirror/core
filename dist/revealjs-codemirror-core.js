/*! revealjs-codemirror-core - v0.0.0 - 2014-10-17
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
            return domNode.classList.contains('code');
        }
        return false;
    }

    function createCodeMirror(textarea){
        var editor = CodeMirror.fromTextArea(textarea);
        if (textarea.dataset && textarea.dataset.runnable) {
            var run = document.createElement('div');
            run.classList.add('run');
            run.innerText = 'Run';
            editor.getWrapperElement().appendChild(run);

            var clear = document.createElement('div');
            clear.classList.add('clear');
            clear.innerText = 'Clear';
            editor.getWrapperElement().appendChild(clear);

            var log = document.createElement('div');
            log.classList.add('log');
            editor.getWrapperElement().appendChild(log);
        }
    }

    revealjscodemirror.codemirrorify = function(){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(createCodeMirror);
    };
})(document, CodeMirror, revealjscodemirror);
