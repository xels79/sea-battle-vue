/**
 * 
 * Для оформления вывода use jQuery
 *  
 */
class MyConsole {
    constructor(id) {
        this._console = $(id);
    }
    clear() {
        this._console.children().remove();
    }
    log(obj) {
        const el = this._renderObj(obj, '', true);
        this._console.append(el);
        this._console.scrollTop(this._console[0].scrollHeight);
    }
    _createKey(keyName, addClass) {
        const key = $('<div>');
        key.addClass("console__key");
        if (addClass) {
            key.addClass(addClass);
        }
        key.text(keyName);
        return key;
    }
    _createValue(valueData, addClass) {
        const value = $('<div>');
        const valueType = typeof(valueData);
        let valueContent='';
        value.addClass("console__value");
        value.addClass(valueType);
        if (addClass) {
            value.addClass(addClass);
        }
        if (valueData instanceof Array){
            value.addClass('array');
            value.removeClass(valueType);
            return this._renderObj(valueData);
        }else if (valueType === 'function'){
            valueContent = `<function> ${valueData.name?valueData.name:'anonymous'}`;
        }else if (valueType === 'object'){
            return this._renderObj(valueData);
        }else{
            valueContent = `${valueData}`;
        }

        value.append($("<pre>").text(valueContent));
        return value;

    }
    _createLine(key, value, addClass) {
        const line = $('<div>');
        line.addClass('console__line');
        if (key) {
            line.append(key);
        }
        if (value) {
            line.append(value);
        }
        if (addClass) {
            line.addClass(addClass);
        }
        return line;
    }
    _createStartLine(openingSign, addClass){
        addClass = addClass || '';
        openingSign = openingSign || '{';
        return $('<div>').addClass('console__block-open').text( openingSign );
    }
    _createEndLine(closingSign, addClass){
        addClass = addClass || '';
        closingSign = closingSign || '}';
        return $('<div>').addClass('console__block-close').text( closingSign );
    }
    _renderStartLine( block, obj ){
        if (obj instanceof Array){
            block.addClass('array');
            block.append(this._createStartLine('['));
        }else if (typeof (obj) === 'object') {
            block.addClass('object');
            block.append(this._createStartLine());
        }
    }
    _renderEndLine( block, obj ){
        if (obj instanceof Array){
            block.addClass('array');
            block.append(this._createEndLine(']'));
        }else if (typeof (obj) === 'object'){
            block.append(this._createEndLine());
        }
    }
    _defineValueTypeAndRenderThis(value, keyBlock){
        if (value instanceof Array) {
            return this._renderObj(value);
        } else {
            if (typeof(value) === 'function'){
                keyBlock.addClass('funct__key');
            }
            return this._createValue(value);
        }
    }
    _renderObjContent(block, obj){
        let itemCount = Object.keys(obj).length;
        Object.keys(obj).forEach(key => {
            const keyBlock = this._createKey(key);
            block.append(
                this._createLine(
                    keyBlock,
                    this._defineValueTypeAndRenderThis(obj[key], keyBlock),
                    --itemCount ? 'comma' : ''
                )
            );
        });
    }
    _defineObjectTypeAndRenderThis( block, obj ){
        if (typeof (obj) === 'object') {
            this._renderObjContent( block, obj );
        } else {
            block.addClass('string')
            block.append(this._createLine(this._createValue(obj)));
        }        
    }
    _renderObj(obj, addClass,isSubBlock) {
        const block = $('<div>');
        block.addClass('console__block');
        if (!isSubBlock){
            block.addClass('block__is-sub');
        }
        if (addClass) {
            block.addClass(addClass);
        }
        this._renderStartLine( block, obj );
        this._defineObjectTypeAndRenderThis( block, obj );
        this._renderEndLine( block, obj );
        return block;
    }
}