/*! revealjs-codemirror-core - v0.0.0 - 2014-10-21
* Copyright (c) 2014 ; Licensed MIT */
window.revealjscodemirror = (function(){
  return {
    version: '0.0.0'
  };
})();
(function($){
    var identity = function(element) { return element; };

    var Log = $.Log = function(){
        this._listeners = [];
        this._lines = [];
    };
    Log.prototype.lines = function(){
        return this._lines.map(identity);
    };
    Log.prototype.append = function(line){
        this._lines.push(line);
        this.notify();
    };
    Log.prototype.clear = function(){
        this._lines = [];
        this.notify();
    };
    Log.prototype.addListener = function(listener){
        this._listeners.push(listener);
    };
    Log.prototype.notify = function(){
        this._listeners.forEach(function(listener){
            listener.call(this, this.lines());
        }.bind(this));
    };
})(revealjscodemirror);

(function(document, CodeMirror, Q, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            return domNode.classList.contains('code');
        }
        return false;
    }

    function createRunOnclick(textarea, log, options){
        var runHandler = function(value){
            var deferred = Q.defer();
            deferred.resolve([value.split('\n')]);
            return deferred.promise;
        };
        if (options && options.runHandler) {
            runHandler = options.runHandler;
        }
        runHandler(textarea.value).then(function(lines){
            lines.forEach(function(line){ log.append(line); });
        }).done();
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
                { element: 'div', class: 'run', innerText: 'Run', onclick: createRunOnclick(textarea, log, options) },
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
