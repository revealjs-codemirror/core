/*global document:false, CodeMirror:false, revealjscodemirror:true */
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
