const dx = require('../../dx-app');
const dxDemoPackageController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class DxDemoPackageEndpoint extends divbloxEndpointBase {
    constructor() {
        super();
        // TODO: Declare any additional operations here
        this.addOperations(["getPackageName"]);
    }

    async executeOperation(operation, request) {
        await super.executeOperation(operation, request);

        switch(operation) {
            case 'getPackageName': await this.getPackageName();
                break;
            // TODO: Add additional cases here for each declared operation
        }
    }

    async getPackageName() {
        this.setResult(true, "Package name is dxDemoPackage");
    }

    // TODO: Add implementations for each declared operation below
}
const dxDemoPackageEndpointInstance = new DxDemoPackageEndpoint();

module.exports = dxDemoPackageEndpointInstance;