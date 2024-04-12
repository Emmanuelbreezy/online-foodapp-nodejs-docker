"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = void 0;
function validateRequiredFields(fields, data) {
    return fields.find((field) => !data[field]);
}
exports.validateRequiredFields = validateRequiredFields;
