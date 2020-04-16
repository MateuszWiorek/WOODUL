/**
 * Created by Mateusz Wiorek on 07.04.2020.
 */
({
    afterLoad : function(component, event){
        const panorama = new PANOLENS.ImagePanorama( $A.get("{!$Resource.WDLC_TestImage}") );
        const viewer = new PANOLENS.Viewer();
        viewer.add( panorama );
    }
})