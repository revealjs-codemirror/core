/*global document:false, CodeMirror:false, revealjscodemirror:true */
(function(CodeMirror, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            var classAttribute = domNode.getAttribute('class');
            return (classAttribute && classAttribute.indexOf('code') !== -1);
        }
        return false;
    }

    function createCodeMirror(textarea){
	CodeMirror.fromTextArea(textarea);
    }

    revealjscodemirror.codemirrorify = function(){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(createCodeMirror);
    };
})(CodeMirror, revealjscodemirror);
