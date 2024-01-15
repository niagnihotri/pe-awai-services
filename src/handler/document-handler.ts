import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const expirationSeconds = 3600;
const bucketName = 'awai-dev-ui-file-uploads';

export async function documentUpload(event: APIGatewayProxyEvent): Promise<any> {
    if (event.body !== null && event.body !== undefined) {
		const { fileNames } = JSON.parse(event.body)
		let { folderName } = JSON.parse(event.body)
		const { contentType } = JSON.parse(event.body)
		const presignedUrls = []

		if (folderName === "") {
			const name = generateRandomNumberWithDate();
			folderName = name;
		}

		for (let i in fileNames) {
			try {
				const uploadPartParams = {
					Bucket: bucketName,
					Key: folderName +'/'+fileNames[i],
					Expires: expirationSeconds,
					'ContentType': contentType
				};

				const result = await s3.getSignedUrlPromise('putObject', uploadPartParams);
				presignedUrls.push({preSignedUrl: result, fileName: fileNames[i], folderName: folderName});

			} catch (error) {
				console.error('Error:', error);
				throw error;
			}

            return response.ok({
                preSignedUrls: presignedUrls
            });
		}
	}
}

export async function documentDownload(event: APIGatewayProxyEvent): Promise<any> {
    if (event.body !== null && event.body !== undefined) {
		const { fileName } = JSON.parse(event.body)
		let { folderName } = JSON.parse(event.body)

		  // Replace 'objectKey' with the key of the file you want to generate a pre-signed URL for
		  const objectKey = `${folderName}/${fileName}`;
		
		  try {
			const params = {
			  Bucket: bucketName,
			  Key: objectKey,
			  Expires: 3600 // URL expiration time in seconds
			};
			
			// Generate a pre-signed URL for the S3 object
			const signedUrl = await s3.getSignedUrlPromise('getObject', params);
		
			console.log('Pre-signed URL generated successfully:', signedUrl);

			return response.ok({
                preSignedUrls: signedUrl
            });
            
		  } catch (error) {
			console.error('Error generating pre-signed URL:', error);
			throw error;
		  }
		};
}

export async function documentDelete(event: APIGatewayProxyEvent): Promise<any> {
    if (event.body !== null && event.body !== undefined) {
        try {
            const bucketName = 'awai-dev-ui-file-uploads';
            const { fileNames } = JSON.parse(event.body)
            for (let i in fileNames) {
                const filePath = fileNames[i].split('/')[0] + "/" + fileNames[i].split('/')[1];
                const folderPath = fileNames[i].split('/')[0] + "/";

                console.log(`Deleted file Before Deletion: ${folderPath}${filePath}`);
                // Delete the specific file
                await s3.deleteObject({ Bucket: bucketName, Key: filePath }).promise();
                console.log(`Deleted file: ${filePath}`);

                // Check if the parent folder is empty
                const listObjectsParams = {
                    Bucket: bucketName,
                    Delimiter: '/',
                    Prefix: folderPath,
                };

                console.log(`listObjectsParams: ${listObjectsParams}`);
                const folderObjects = await s3.listObjectsV2(listObjectsParams).promise();
                console.log(`folderObjects: ${folderObjects}`);
                console.log(`folderObjects: ${JSON.stringify(folderObjects)}`);

                if (folderObjects.Contents.length === 0 && folderObjects.CommonPrefixes.length === 0) {
                    // The folder is empty; delete it
                    await s3.deleteObject({ Bucket: bucketName, Key: folderPath }).promise();
                    console.log(`Deleted empty folder: ${folderPath}`);
                }
            }
            
            return response.ok("Deletion Complete");
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }
}

function generateRandomNumberWithDate() {
	const randomNumber = Math.floor(1000 + Math.random() * 9000);
	const currentDate = new Date();
	const formattedDate = currentDate.toLocaleDateString('en-GB');
    let re = /\//gi;
    return formattedDate.replace(re,'-')+'_'+randomNumber;
}