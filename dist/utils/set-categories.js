"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setCategories;
function setCategories(categories) {
    return Array.isArray(categories) ? categories.join(",") : "";
}