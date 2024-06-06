import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export class FileManager {
    constructor(s3Client) {
      this.s3Client = s3Client;
    }
    // Get Data from Local Path
    getLocalFileContent(localFilePath){
        let fileContent = '';
        try{
          fileContent = fs.readFileSync(localFilePath);
        } catch(error){
            console.log(`Error: ${error.message}`);
        }
        return fileContent;
    }
    // Upload File into Bucket
    uploadFile = async (bucketName, bucketFileName, fileContent) => {
     try {
          const params = {
            Bucket: bucketName,
            Key: bucketFileName,
            Body: fileContent,
          };
          await this.s3Client.send(new PutObjectCommand(params));
          console.log(`File "${bucketFileName}" uploaded successfully to bucket "${bucketName}".`);
     } catch (error) {
        console.error(`Error uploading file: ${error.message}`);
     }
    };
    // Read File in a Bucket
    readFile = async(bucketName, bucketFileName)=>{
        const { Body } = await this.s3Client.send(
            new GetObjectCommand({
              Bucket: bucketName,
              Key: bucketFileName,
            })
        );
        return await Body.transformToString();
    };

};