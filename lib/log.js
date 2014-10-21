/*global revealjscodemirror*/
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
    };
    Log.prototype.clear = function(){
        this._lines = [];
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
