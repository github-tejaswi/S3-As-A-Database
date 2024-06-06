
import { HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

export class BuckerManager {
    constructor(s3Client) {
      this.s3Client = s3Client;
    }
   // Function to check if a bucket exists
   checkAndCreateBucketExists = async (bucketName, location) => {
    let bucketStatus = false;
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
      bucketStatus= true;
    } catch (error) {
        bucketStatus = false;
     }
    if(!bucketStatus){
        const params = {
            Bucket: bucketName,
            CreateBucketConfiguration: { LocationConstraint: location },
          };
          try {
            await this.s3Client.send(new CreateBucketCommand(params));
            console.log(`Bucket "${bucketName}" created successfully.`);
          } catch (error) {
            console.error(`Error creating bucket: ${error.message}`);
          }
    }
 };
}