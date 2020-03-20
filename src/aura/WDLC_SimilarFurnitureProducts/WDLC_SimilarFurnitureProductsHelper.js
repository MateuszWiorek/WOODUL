/**
 * Created by Mateusz Wiorek on 20.03.2020.
 */
({
    doOnInit : function(component, event){
        let product = component.get("v.product");
        let getSimilarAction = component.get("c.getSimilarProducts");
        getSimilarAction.setParams({
            "productId" : "01t5J000000FuOoQAK"
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
                            prevArrow : '<button type="button" class="slick-prev">Previous</button>',
                            nextArrow : '<button type="button" class="slick-next">Next</button>',
                            infinite: true,
                            speed: 1200,
                            slidesToShow: 5,
                            slidesToScroll: 5
                        });
                 }, 0);
            }
        })
    }
})