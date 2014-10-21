/*global document:false, CodeMirror:false, Q:false, revealjscodemirror:true */
(function(document, CodeMirror, Q, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            return domNode.classList.contains('code');
        }
        return false;
    }

    function createRunOnclick(textarea, options){
        var runHandler = function(){
            var deferred = Q.defer();
            deferred.resolve(textarea.value);
            return deferred.promise();
        };
        if (options && options.runHandler) {
            runHandler = function(){
                return options.runHandler(textarea.value);
            };
        }
        return runHandler;
    }

    function createElementFactory(editor) {
        return function createElement(description) {
            var element = document.createElement(description.element);
            element.classList.add(description.class);
            if (description.innerText) {
                element.innerText = description.innerText;
            }
            if (description.onclick) {
                element.onclick = description.onclick.bind(editor);
            }
            if (description.afterCreate) {
                description.afterCreate(element);
            }
            return element;
        };
    }

    function createCodeMirror(textarea, options){
        var editor = CodeMirror.fromTextArea(textarea, options);
        var createElement = createElementFactory(editor);
        var log = new revealjscodemirror.Log();
        if (textarea.dataset && textarea.dataset.runnable) {
            [
                { element: 'div', class: 'run', innerText: 'Run', onclick: createRunOnclick(textarea, options) },
                { element: 'div', class: 'clear', innerText: 'Clear', onclick: log.clear.bind(log) },
                { element: 'div', class: 'log', afterCreate: function(element){
                    log.addListener(function(){
                        while(element.firstChild) {
                            element.removeChild(element.firstChild);
                        }
                        log.lines().forEach(function(line){
                            var p = document.createElement('p');
                            p.innerText = line;
                            element.appendChild(p);
                        });
                    });
                } },
            ].map(createElement).forEach(function(element){
                editor.getWrapperElement().appendChild(element);
            });
        }
    }

    revealjscodemirror.codemirrorify = function(options){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(function(textarea){
                createCodeMirror(textarea, options);
            });
    };
})(document, CodeMirror, Q, revealjscodemirror);
