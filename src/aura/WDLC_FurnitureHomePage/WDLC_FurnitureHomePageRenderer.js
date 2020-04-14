/**
 * Created by Mateusz Wiorek on 27.03.2020.
 */
({
       afterRender : function(cmp,helper){
            this.superAfterRender();
            let myElement = document.getElementsByClassName('contentRegion');
            for(let i = 0; i<myElement.length ; i++){
                myElement.item(i).style.padding = "0";
            }
       },
})