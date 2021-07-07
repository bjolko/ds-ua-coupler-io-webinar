# Useful analytics without expensive systems and unnecessary complications

## Coupler.io and Data Science UA webinar
 
### How to						
*	Prepare your data in BigQuery				
	-	Calculate / choose needed tables and data views			
* Prepare for Coupler.io connection (One time only)
	-	Create Service Account for Coupler.io integration			
	-	Generate JSON key for it			
	-	Give it BigQuery Viewer and BigQuery Job User permissions			
*	Import the data to your Google Sheets using Coupler.io add-on [Tutorial](https://help.coupler.io/article/141-bigquery-data-source)
*	Setup Slack				
	-	Create a bot and copy its token	[Slack Apps page](https://api.slack.com/apps)
	-	(optional) Add a channel for notifications			
	-	Add your bot to the channel			
*	Setup AppsScript project				
	-	Go to Tools => Script editor and give a name to your project			
	-	Setup credentials using [PropertiesService](https://developers.google.com/apps-script/reference/properties/properties-service)
	-	Write the script :)	[Slack Block kit builder](https://app.slack.com/block-kit-builder)
	-	Test run		
	-	Schedule		