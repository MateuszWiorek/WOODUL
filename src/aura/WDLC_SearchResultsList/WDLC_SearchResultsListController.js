/**
 * Created by Mateusz Wiorek on 18.03.2020.
 */
({
     doInit : function(component, event, helper) {
         let meta = document.createElement("meta");
         meta.setAttribute("name", "format-detection");
         meta.setAttribute("http-equiv", "Content-Security-Policy")
         meta.setAttribute("content", "date=no;img-src 'self' data:");
         document.getElementsByTagName('head')[0].appendChild(meta);
        helper.doOnInit(component,event);
     },
     handleApplicationEvent : function(component, event, helper){
         helper.doHandleApplicationEvent(component, event);
     }
})