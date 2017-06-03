import * as azure from 'azure-storage';

process.env['AZURE_STORAGE_ACCOUNT'] = 'cognativeimages';
process.env['AZURE_STORAGE_ACCESS_KEY'] = 'vWzKIHpIZkGHeYjoA93jv8FY+UjCI5FhtKLA9qpISEbzE2c7Ll7xSgbhpsS75PSPC74SXtSZnRcQsOmFO/cARw==';

var blobService = azure.createBlobService();
var images = "images";

function saveToBlob(name, stream) {

    return new Promise(
        (resolve, reject) => stream.pipe(blobService.createWriteStreamToBlockBlob(images, name, (err, result) => (err) ? reject(err) : resolve(result)))
    );
}

function getUrl(name) {

    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 15);

    var expiryDate = new Date(startDate);
    expiryDate.setFullYear(startDate.getFullYear() + 30);

    var permissions = azure.BlobUtilities.SharedAccessPermissions.READ;

    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };

    var sasToken = blobService.generateSharedAccessSignature(images, name, sharedAccessPolicy);

    return blobService.getUrl(images, name, sasToken);
}


export {
    saveToBlob,
    getUrl
}