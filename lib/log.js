/*global revealjscodemirror*/
(function($){
    var identity = function(element) { return element; };

    var Log = $.Log = function(){
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
})(revealjscodemirror);
