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

    revealjscodemirror.codemirrorify = function(){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(CodeMirror.fromTextArea);
    };
})(CodeMirror, revealjscodemirror);
