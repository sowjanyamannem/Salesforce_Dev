import { LightningElement } from 'lwc';

export default class Popup extends LightningElement {
    
  createSalesforceRecord() {
        // Fetch Jira data (replace with your Jira API endpoint and logic)
        fetch('https://your-jira-instance/rest/api/2/issue/ISSUE-123')
          .then(response => response.json())
          .then(jiraData => {
            // Process Jira data and extract relevant information
      
            // Create Salesforce record (replace with your Salesforce API endpoint and logic)
            fetch('https://your-salesforce-instance/services/data/v54.0/sobjects/Account/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Add Salesforce authentication headers
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
              },
              body: JSON.stringify({
                // Replace with Salesforce record data based on Jira information
                'Name': jiraData.summary,
                'Description__c': jiraData.description
              })
            })
              .then(response => response.json())
              .then(salesforceData => {
                console.log('Salesforce record created:', salesforceData);
                alert('Salesforce record created successfully!');
              })
              .catch(error => console.error('Error creating Salesforce record', error));
          })
          .catch(error => console.error('Error fetching Jira data', error));
      }
      

}