<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Read SQS Sample</title>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.2.43.min.js"></script>
        
        
        <script>
        //Configuration for your application
        
        
        
        var cognitoIdentityPoolID = 'REPLACE_WITH_YOURS';
        var sqsUrl = 'REPLACE_WITH_YOURS';
        var awsRegion = 'us-east-1';
        
        

        // set the default config object
		var creds = new AWS.CognitoIdentityCredentials({
		 IdentityPoolId: cognitoIdentityPoolID
		});
		AWS.config.credentials = creds;
		//Rather than using cognito, you also can hard code creds
		//AWS.config.update({accessKeyId: 'REPLACE', secretAccessKey: 'REPLACE'});
        AWS.config.region = awsRegion ;
        var sqs = new AWS.SQS();
       
        
        function getQ() {
        	
        	var params = {
			  QueueUrl: sqsUrl, /* required */
			  VisibilityTimeout: 0,
			  WaitTimeSeconds: 20
			};
			
			//
			// get message from sqs 
			//
			
			sqs.receiveMessage(params, function(err, data) {
			  if (err) console.log(err, err.stack); // an error occurred
			  else    {
			  	if (data.Messages[0])
			  	{
				  		var myData = data.Messages[0].Body;
				    
			//
			//do something with the message
		  	//
		  	
		  	document.getElementById("sqsMessage").innerHTML=myData;
		  	
		  	
		  	//
		  	// delete the sqs message
		  	//
		  	
			  	var params = {
					  QueueUrl: sqsUrl, /* required */
					  ReceiptHandle: data.Messages[0].ReceiptHandle /* required */
					};
					sqs.deleteMessage(params, function(err, data) {
					  if (err) console.log(err, err.stack); // an error occurred
					  else    
					  {
					   console.log(data);     
					  }     // successful response
					});
					  	
				  	
				  }
			  	console.log(data);   
			  	}        // successful response
			 
			 //
			 // check for another message
			 //
			 
			  	getQ();
			});
        	
        }
        
        </script>
    </head>
    <body onload="getQ()">
    	
        <h1>What's your favorite color?</h1>
        <div id="sqsMessage"></div>
    </body>
</html>