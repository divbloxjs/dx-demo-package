const dx = require('../../dx-app');
const dxDemoPackageController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class DxDemoPackageEndpoint extends divbloxEndpointBase {
    constructor() {
        super();

        this.endpointName = "dxDemoPackage"; // Change this to set the actual url endpoint
        this.endpointDescription = "dxDemoPackage endpoint"; // Change this to be more descriptive of the endpoint

        // TODO: Declare any additional operations here
        const getPackageName = this.getOperationDefinition(
            {
                "operationName": "getPackageName",
                "allowedAccess": ["anonymous"], // If this array does not contain "anonymous", a JWT token will be expected in the Auth header
                "operationDescription": "This sentence describes the operation",
                "parameters": [], // An array of this.getInputParameter()
                "requestType": "GET", // GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE
                "requestSchema": {}, // this.getSchema()
                "responseSchema": {}, // this.getSchema()
            }
        );

        // You need to do this in order for the operation to be available on the endpoint.
        // Also, this declaration provides the necessary input for swagger ui present the docs for this
        this.declareOperations([getPackageName]);

        // TODO: Declare any entity schemas here if needed
        // An example of how to declare entity schemas for swagger ui
        //this.declareEntitySchemas(["anEntityInYourDataModel"]);
    }

    async executeOperation(operation, request, dxInstance = null) {
        if (!await super.executeOperation(operation, request, dxInstance)) {
            return false;
        }

        // Here we have to deal with our custom operations
        switch(operation) {
            case 'getPackageName': await this.getPackageName();
                break;
            // TODO: Add additional cases here for each declared operation
        }

        return true;
    }

    async getPackageName() {
        this.setResult(true, "Package name is dxDemoPackage");
    }

    // TODO: Add implementations for each declared operation below
}
const dxDemoPackageEndpointInstance = new DxDemoPackageEndpoint();

module.exports = dxDemoPackageEndpointInstance;