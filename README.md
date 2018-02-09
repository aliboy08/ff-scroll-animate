FF Scroll Animate v1.1
by Alistair Ponce

Animates elements on window scroll using css class, this is using plain/vanilla JS. 

* Supports inline options per element
* Removes scroll and resize events on animation complete, if all elements are done animating and no element has animate repeat
* You can use this site as reference for css animations: http://animista.net/

Options:

selector: string, element selector using "." or "#"

animate_class: string, css class used to animate, can be set inline in data-animate attribute

offset: int, offset position before animation activates

repeat: boolean, default = 0, animation repeats when element is in view again
        can be set with class name "animate-repeat" for true or "animate-once" for false

on_complete: function, callback function when all elements finish animating, if no element has repeat
