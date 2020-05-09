<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>SurveyEmail</fullName>
        <description>SurveyEmail</description>
        <protected>false</protected>
        <recipients>
            <recipient>mateusz@wiorek.pl</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/SendEmailWithSurveyLink</template>
    </alerts>
    <alerts>
        <fullName>SurveyLinkEmail</fullName>
        <description>SurveyLinkEmail</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/SendEmailWithSurveyLink</template>
    </alerts>
</Workflow>
