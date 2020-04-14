/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
    makeCarousel: function(component, event){
        setTimeout(function() {
            $('.carousel').slick({
                autoplay: false,
                autoplaySpeed: 7000,
                dots: true,
                centerPadding: '0',
                pauseOnHover: false,
                arrows: false,
                infinite: true,
                speed: 3000,
                slidesToShow: 1,
                slidesToScroll: 1,
                zIndex: 1
            });
            $(document.body).css('overflow', 'hidden');
            let myElement = document.getElementsByClassName('contentRegion');
            for(let i = 0; i<myElement.length ; i++){
                myElement[i].style.padding = "0";
            }
        }, 0);
        console.log(component.find("divElement"));
    },
    goToSearch : function(component, event, helper){
        component.set("v.productName",$A.get("{!$Label.c.WDLC_FirstTypeOfSearch}"));
        helper.doGoToSearch(component,event);
    },
    goToSearchRaw : function(component,event, helper){
        component.set("v.productName", $A.get("{!$Label.c.WDLC_SecondTypeOfSearch}"));
        helper.doGoToSearch(component,event);
    },
    doInit : function(component, event, helper) {
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);
    },
})