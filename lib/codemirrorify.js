/*global document:false, CodeMirror:false, revealjscodemirror:true */
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
