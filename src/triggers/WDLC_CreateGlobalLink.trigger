///**
// * Created by Mateusz Wiorek on 01.04.2020.
// */
//
trigger WDLC_CreateGlobalLink on ContentDocumentLink (after insert) {
    Set<String> ids = new Set<String>();
    for (ContentDocumentLink cd : Trigger.new) {
        ids.add(cd.ContentDocumentId);
    }
    List<ContentVersion> cvs = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :ids];
    List<ContentDistribution> cds = new List<ContentDistribution>();
    for (ContentVersion cv : cvs) {
        ContentDistribution cd = new ContentDistribution();
        cd.Name = 'Test';
        cd.ContentVersionId = cv.id;
        cd.PreferencesAllowViewInBrowser = true;
        cd.PreferencesLinkLatestVersion = true;
        cd.PreferencesNotifyOnVisit = false;
        cd.PreferencesPasswordRequired = false;
        cd.PreferencesAllowOriginalDownload = true;
        cds.add(cd);
    }
    insert cds;
}