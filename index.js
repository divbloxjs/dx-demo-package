const divbloxPackageControllerBase = require('divbloxjs/dx-core-modules/package-controller-base');
const ExampleEntityOne = require('divbloxjs/dx-orm/generated/example-entity-one');
const ExampleEntityTwo = require('divbloxjs/dx-orm/generated/example-entity-two');
const exampleEntityOneSchema = require('divbloxjs/dx-orm/generated/schemas/example-entity-one-schema');

class DxDemoPackage extends divbloxPackageControllerBase {
    constructor(dxInstance = null) {
        super(dxInstance);
        // TODO: Override as required
    }
    // TODO: Add package specific functionality below
    getExample = async(id = -1) => {
        const exampleEntityOne = new ExampleEntityOne(this.dxInstance);
        if (!await exampleEntityOne.load(id)) {
            this.populateError("Invalid id provided", true, true);
        }
        return exampleEntityOne.data;
    }

    createExample = async (entityData = {}) => {
        const exampleEntityOne = new ExampleEntityOne(this.dxInstance);

        // If we just start adding data, we will be creating a new entry in the database
        for (const key of Object.keys(entityData)) {
            if (typeof exampleEntityOne.data[key] !== "undefined") {
                exampleEntityOne.data[key] = entityData[key];
            }
        }

        const saveResult = await exampleEntityOne.save();
        if (!saveResult) {
            this.populateError(exampleEntityOne.getError(), true, true);
            this.populateError("Error creating exampleEntityOne:", true);
            return -1;
        }

        return exampleEntityOne.data.id;
    }

    updateExample = async (entityData = {}) => {
        const exampleEntityOne = new ExampleEntityOne(this.dxInstance);

        if (typeof entityData["id"] === "undefined") {
            this.populateError("No id provided");
            return false;
        }

        if (!await exampleEntityOne.load(entityData["id"])) {
            this.populateError("Invalid id provided");
            this.populateError(exampleEntityOne.getError());
            return false;
        }

        // If we just start adding data, we will be creating a new entry in the database
        for (const key of Object.keys(entityData)) {
            if (key === "id") {continue;}

            if (typeof exampleEntityOne.data[key] !== "undefined") {
                exampleEntityOne.data[key] = entityData[key];
            }
        }

        const saveResult = await exampleEntityOne.save();
        if (!saveResult) {
            console.log(JSON.stringify(exampleEntityOne.getError(),null,2));
            this.populateError(exampleEntityOne.getError(), true, true);
            this.populateError("Error saving exampleEntityOne:", true);
            return false;
        }

        return true;
    }

    deleteExample = async (id = -1) => {
        const exampleEntityOne = new ExampleEntityOne(this.dxInstance);

        if (!await exampleEntityOne.load(id)) {
            this.populateError("Invalid id provided",true,true);
            return false;
        }

        if (!await exampleEntityOne.delete()) {
            this.populateError(exampleEntityOne.getError(), true, true);
            return false;
        }

        return true;
    }
}

module.exports = DxDemoPackage;