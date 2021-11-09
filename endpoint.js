const DivbloxDemoPackageController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class DivbloxDemoPackage extends divbloxEndpointBase {
    constructor(dxInstance = null) {
        super(dxInstance);

        this.controller = new DivbloxDemoPackageController(this.dxInstance);

        this.endpointName = "dx-demo";
        this.endpointDescription = "An example endpoint to demonstrate divblox api's";

        // We add a custom operation declaration here
        const testOperation = this.getOperationDefinition(
            {
                "operationName": "getEntityOne",
                "allowedAccess": ["anonymous"],
                "operationDescription": "Returns the instance of ExampleEntityOne that matches the provided id",
                "parameters": [
                    this.getInputParameter({"name":"test","type":"header"}),
                    this.getInputParameter({"name":"id","type":"path"})
                ],
                "requestType": "GET",
                "requestSchema": {},
                "responseSchema": this.dxInstance.getEntitySchema("exampleEntityOne")
            }
        );

        // An example of how to declare operations. You need to do this in order for the operation to be available on
        // the endpoint. Also, this declaration provides the necessary input for swagger ui present the docs for this
        this.declareOperations([testOperation]);

        // An example of how to declare entity schemas for swagger ui
        this.declareEntitySchemas(["exampleEntityOne","exampleEntityTwo"]);
    }

    async executeOperation(operation, request) {
        if (!await super.executeOperation(operation, request)) {
            return false;
        }

        // Here we have to deal with our custom operations
        switch(operation) {
            case 'getEntityOne': await this.getEntityOne(request.path);
                break;
        }

        return true;
    }

    /**
     * Our custom operation's implementation
     * @return {Promise<void>}
     */
    async getEntityOne(id = -1) {
        const entityData = await this.controller.getEntityOne(id);
        this.setResult(true, "You called the test operation");
        this.addResultDetail(entityData);
    }
}
module.exports = DivbloxDemoPackage;