/*global document:false, CodeMirror:false, revealjscodemirror:true */
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
			[
				{ element: 'div', class: 'run', innerText: 'Run' },
				{ element: 'div', class: 'clear', innerText: 'Clear' },
				{ element: 'div', class: 'log' },
			].forEach(function(description){
				var element = document.createElement(description.element);
				element.classList.add(description.class);
				if (description.innerText) {
					element.innerText = description.innerText;
				}
				editor.getWrapperElement().appendChild(element);
			});
        }
    }

    revealjscodemirror.codemirrorify = function(){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(createCodeMirror);
    };
})(document, CodeMirror, revealjscodemirror);
