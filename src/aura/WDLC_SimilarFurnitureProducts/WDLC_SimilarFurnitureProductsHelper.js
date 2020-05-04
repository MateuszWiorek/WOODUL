/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doOnInit : function(component, event){
        let product = component.get("v.product2");
        let getSimilarAction = component.get("c.getSimilarProducts");
        getSimilarAction.setParams({
            "productId" : product.productId
        });
        getSimilarAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.similarProducts", response.getReturnValue());
                component.set("v.canBeShown", true);
                setTimeout(function() {
                 $('.carousel').slick({
                            autoplay: true,
                            autoplaySpeed: 3000,
                            dots: true,
                            arrows: true,
                            prevArrow : '<button type="button" class="slick-prev">'+$A.get("{!$Label.c.WDLC_Previous}")+'</button>',
                            nextArrow : '<button type="button" class="slick-next">'+$A.get("{!$Label.c.WDLC_Next}")+'</button>',
                            infinite: true,
                            speed: 1200,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        });
                 }, 0);
            }
        });
        $A.enqueueAction(getSimilarAction);
    }
})