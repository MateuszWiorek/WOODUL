({
    doInit: function(component, event){
                component.set('v.mapMarkers', []);

                component.set('v.center', {
                    location: {
                        City: 'Kielce'
                    }
                });
                component.set('v.zoomLevel', 4);
                component.set('v.markersTitle', 'Accounts');
                component.set('v.showFooter', false);
    },
    doHandleMapDetails : function(cmp, event){
                      let accountsFromEv = event.getParam("accountsList");
                      cmp.set("v.resultsList", accountsFromEv);
                      let mapMarkers = [];
                      for( let i = 0; i<accountsFromEv.length; i++){
                      let account = accountsFromEv[i];
                       let marker = {
                          'location': {
                              'Street': account.ShippingStreet,
                              'City': account.ShippingCity
                           },
                            'value' : i,
                            'label' : {
                                color : 'white',
                                fontWeight : 'bold',
                                text : account.Name
                            },
                          'title': account.Name,
                          'icon': 'standard:location'
                        };
                       mapMarkers.push(marker);
                      }
                      if(accountsFromEv.length==1){
                          cmp.set('v.zoomLevel',8);
                                  cmp.set('v.center', {
                                      location: {
                                          City: accountsFromEv[0].ShippingCity
                                          }
                                  });
                          cmp.set('v.mapMarkers', mapMarkers);
                      }else{
                          cmp.set('v.zoomLevel',4);
                      cmp.set('v.mapMarkers', mapMarkers);
                              cmp.set('v.center', {
                                  location: {
                                      City: 'Kielce'
                                  }
                              });
                      }
    },

    doHandleMarkerSelect : function(component, event){
        let marker = event.getParam("selectedMarkerValue");
        console.log(marker);
        let accounts = component.get("v.resultsList");
        console.log(accounts);
                let detailsEvent2 = $A.get("e.c:WDL_DetailsInfoValues");
                detailsEvent2.setParams({
                    "accountDetailInfo" : accounts[marker]
                });
                detailsEvent2.fire();
    }
})