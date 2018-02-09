/*!
 * FF Scroll Animate v1.1
 * (c) 2018 Five by Five
 * license: http://www.opensource.org/licenses/mit-license.php
 */
var FFScrollAnimate = function(options){
	
	// If all elements are animated, event handlers will be removed
	// Options:
	// selector: string, element selector using "." or "#"
	// animate_class: string, css class used to animate, can be set inline in data-animate attribute
	// offset: int, offset position before animation activates
	// repeat: boolean, default = 0, animation repeats when element is in view again, can be set with class name "animate-repeat" for true or "animate-once" for false
	// on_complete: function, callback function when all elements finish animating, if no element has repeat
	 
	// Defaults
	if( typeof options.offset === 'undefined' ) options.offset = 0;
	if( typeof options.repeat === 'undefined' ) options.repeat = false;

	var elements,
		animated_elements_count; 
	
	var _start = function(){
		
		elements = document.querySelectorAll(options.selector);
		// document.querySelectorAll doesn't return an array but an object.
		// To turn this object into a loopable array, you can use Array.prototype.slice.call(arrayName)
		elements = Array.prototype.slice.call(elements);
		
		animated_elements_count = elements.length;
		
		_addEventHandlers();
		_inView();
	}
	
	var _addEventHandlers = function(){
		window.addEventListener('scroll', _inView, false);
		window.addEventListener('resize', _inView, false);
	}
	
	var _removeEventHandlers = function(){
		window.removeEventListener('scroll', _inView, false);
		window.removeEventListener('resize', _inView, false);
	}
	
	var _inView = function() {
		
		if( animated_elements_count === 0 ) {
			
			// All elements animated, remove event handlers
			_removeEventHandlers();
			
			// On complete callback
			if( typeof options.on_complete === 'function' ) {
				options.on_complete();
			}
		}
		
		elements.forEach(function(element, index) {
			
			var element_animate_class = options.animate_class;
			
			if( element.attributes['data-animate'] ) {
				// Check if element has inline animate class
				element_animate_class = element.attributes['data-animate'].nodeValue;
			}
			
			var element_animate_repeat = options.repeat;
			if( element.classList.contains('animate-once') ) {
				// Check if element has inline animate repeat class
				element_animate_repeat = false;
			}
			if( element.classList.contains('animate-repeat') ){
				element_animate_repeat = true;
			}
			
			// Get element inline animate class, if none use animation setting
			
			var pos = element.getBoundingClientRect();
			
			if(
				pos.top >= 0 &&
				pos.left >= 0 &&
				pos.bottom <= (
					window.innerHeight + options.offset ||
					document.documentElement.clientHeight + options.offset
				) &&
				pos.right <= (
					window.innerWidth + options.offset ||
					document.documentElement.clientWidth + options.offset
				)
			)
			{
				// In view
				if( !element.classList.contains(element_animate_class) ) {
					
					element.classList.add(element_animate_class); // add animate class
					
					if( !element_animate_repeat ) {
						// Remove element in array after animation
						elements.splice(index, 1);
						animated_elements_count--;
					}
				}
				
			}
			else if( pos.bottom < 0 || pos.top > window.innerHeight )
			{
				// Out of view
				if( element.classList.contains(element_animate_class) ) {
					element.classList.remove(element_animate_class); // remove animate class
				}
			}
			
		});
	}
	
	return {
		start: _start
	}
}