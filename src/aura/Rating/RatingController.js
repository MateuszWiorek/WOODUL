({
    starClick : function(component, event, helper) {
        var colorOn = component.get("v.colorOn"); 
        var colorOff = component.get("v.colorOff"); 
        var el = event.target;
        var rating = 0;
        while (el) {
            rating++;
	        el.style.fill = colorOn;
			el = el.previousElementSibling;    		        
        }
        el = event.target.nextElementSibling;
        while (el) {
	        el.style.fill = colorOff;
			el = el.nextElementSibling;    		        
        }
        component.set("v.rating", rating);
        let myEvent = component.getEvent("changeEvent");
        myEvent.setParams({"ratingProduct": rating});
        myEvent.fire();

	}
})