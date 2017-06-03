import * as azure from 'azure-storage';
import * as  multer from 'multer';
import * as MulterAzureStorage from 'multer-azure-storage';

import '../config';

const blobService = azure.createBlobService();
const images = "images";

const uploadHandler = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: process.env.AZURE_STORAGE_ENDPOINT,
    azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
    containerName: images,
    containerSecurity: 'blob'
  })
});

function saveToBlob(name, stream) {

    return new Promise(
        (resolve, reject) => stream.pipe(blobService.createWriteStreamToBlockBlob(images, name, (err, result) => (err) ? reject(err) : resolve(result)))
    );
}

function getUrl(name) {

    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 15);

    const expiryDate = new Date(startDate);
    expiryDate.setFullYear(startDate.getFullYear() + 30);

    const permissions = azure.BlobUtilities.SharedAccessPermissions.READ;

    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };

    const sasToken = blobService.generateSharedAccessSignature(images, name, sharedAccessPolicy);

    return blobService.getUrl(images, name, sasToken);
}


export {
    saveToBlob,
    getUrl,
    uploadHandler
}