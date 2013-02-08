//A collection of simple functions that don't neatly fit anywhere else.	
function bitToBool(value){
	if (typeof value == 'boolean') {
		return value;
	} else if ($.isNumeric(value)) {
		if (value == 0) {
			return false
		} else if (value == 1) {
			return true
		} else {
			return
		}
	} else {
		return
	}
}

//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/* Scrolls via animation to any id on the page. Pass the idea as
 * target
 */
function scrollTo( target, offset ){
	if( offset == undefined ){
		offset = 0;
	}
	 
    var targetPosition = $('#' + target).offset().top;
	targetPosition -= offset;
    $('html,body').animate({ scrollTop: targetPosition}, 'slow'); 
} 
