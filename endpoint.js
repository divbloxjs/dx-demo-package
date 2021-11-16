const dxDemoPackageController = require('./index');
const divbloxEndpointBase = require('divbloxjs/dx-core-modules/endpoint-base');

class DxDemoPackageEndpoint extends divbloxEndpointBase {
    constructor(dxInstance = null) {
        super(dxInstance);

        this.endpointName = "dxDemoPackage"; // Change this to set the actual url endpoint
        this.endpointDescription = "dxDemoPackage endpoint"; // Change this to be more descriptive of the endpoint

        this.controller = new dxDemoPackageController(dxInstance);

        // TODO: Declare any additional operations here
        const getEntityOne = this.getOperationDefinition(
            {
                "operationName": "entityOne",
                "allowedAccess": ["anonymous"], // If this array does not contain "anonymous", a JWT token will be expected in the Auth header
                "operationSummary": "Gets an instance of ExampleEntityOne",
                "operationDescription": "Returns the exampleEntityOne that matches the provide id",
                "parameters": [
                    this.getInputParameter({"name":"id","type":"path"})
                ], // An array of this.getInputParameter()
                "requestType": "GET", // GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE
                "requestSchema": {}, // this.getSchema()
                "responseSchema": this.dxInstance.getEntitySchema("exampleEntityOne"), // this.getSchema()
            }
        );

        const createEntityOne = this.getOperationDefinition(
            {
                "operationName": "entityOne",
                "allowedAccess": ["anonymous"], // If this array does not contain "anonymous", a JWT token will be expected in the Auth header
                "operationSummary": "Creates an instance of ExampleEntityOne",
                "operationDescription": "Returns the id of the newly created exampleEntityOne",
                "parameters": [], // An array of this.getInputParameter()
                "requestType": "PUT", // GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE
                "requestSchema": this.dxInstance.getEntitySchema("exampleEntityOne",true), // this.getSchema()
                "responseSchema": this.getSchema({"id":"int"}), // this.getSchema()
            }
        );

        const updateEntityOne = this.getOperationDefinition(
            {
                "operationName": "entityOne",
                "allowedAccess": ["anonymous"], // If this array does not contain "anonymous", a JWT token will be expected in the Auth header
                "operationSummary": "Updates an instance of ExampleEntityOne with the data provided",
                "operationDescription": "The field 'id' is required in order to identify the object that needs to be " +
                    "updated<br>All other fields are optional",
                "parameters": [], // An array of this.getInputParameter()
                "requestType": "POST", // GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE
                "requestSchema": this.dxInstance.getEntitySchema("exampleEntityOne"), // this.getSchema()
                "responseSchema": {}//
            }
        );

        const deleteEntityOne = this.getOperationDefinition(
            {
                "operationName": "entityOne",
                "allowedAccess": ["super user"], // If this array does not contain "anonymous", a JWT token will be expected in the Auth header
                "operationSummary": "Deletes an instance of ExampleEntityOne",
                "operationDescription": "Deletes the exampleEntityOne that matches the provide id",
                "parameters": [
                    this.getInputParameter({"name":"id","type":"path"})
                ], // An array of this.getInputParameter()
                "requestType": "DELETE", // GET|POST|PUT|DELETE|OPTIONS|HEAD|PATCH|TRACE
                "requestSchema": {}, // this.getSchema()
                "responseSchema": {},
            }
        );

        // You need to do this in order for the operation to be available on the endpoint.
        // Also, this declaration provides the necessary input for swagger ui present the docs for this
        this.declareOperations([getEntityOne, createEntityOne, updateEntityOne, deleteEntityOne]);

        // TODO: Declare any entity schemas here if needed
        // An example of how to declare entity schemas for swagger ui
        this.declareEntitySchemas(["exampleEntityOne"]);
    }

    async executeOperation(operation, request) {
        if (!await super.executeOperation(operation, request)) {
            return false;
        }
        
        // Here we have to deal with our custom operations
        if (operation === 'entityOne') {
            const operationDefinition = this.getDeclaredOperation(operation);

            switch (request.method.toLowerCase()) {
                case "get": await this.getEntityOne(request["path"]);
                    break;
                case "put": await this.createEntityOne(request["body"]);
                    break;
                case "post": await this.updateEntityOne(request["body"]);
                    break;
                case "delete": await this.deleteEntityOne(request["path"]);
                    break;
            }
        }
        switch(operation) {
            // TODO: Add additional cases here for each declared operation
        }

        return true;
    }

    async getEntityOne(id = -1) {
        const entityData = await this.controller.getExample(id);
        if (entityData["id"] === -1) {
            const errorMessage = this.controller.getError().length > 0 ? this.controller.getError()[0] : "unknown";
            this.setResult(false, errorMessage);
        } else {
            this.addResultDetail(entityData);
            this.setResult(true);
        }
    }

    async createEntityOne(entityData = {}) {
        const id = await this.controller.createExample(entityData);
        if (id === -1) {
            const errorMessage = this.controller.getError().length > 0 ? this.controller.getError()[0] : "unknown";
            this.setResult(false, errorMessage);
        } else {
            this.addResultDetail({"id":id});
            this.setResult(true);
        }

    }

    async updateEntityOne(entityData = {}) {
        if (!await this.controller.updateExample(entityData)) {
            const errorMessage = this.controller.getError().length > 0 ? this.controller.getError()[0] : "unknown";
            this.setResult(false, errorMessage);
        } else {
            this.setResult(true, "Updated!");
        }
    }

    async deleteEntityOne(id = -1) {
        if (!await this.controller.deleteExample(id)) {
            const errorMessage = this.controller.getError().length > 0 ? this.controller.getError()[0] : "unknown";
            this.setResult(false, errorMessage);
        } else {
            this.setResult(true, "Deleted!");
        }
    }
    // TODO: Add implementations for each declared operation below
}

module.exports = DxDemoPackageEndpoint;