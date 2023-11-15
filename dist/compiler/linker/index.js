"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkUnbound = void 0;
const function_collecting_visitor_1 = require("./visitor/function-collecting-visitor");
const type_name_indexing_visitor_1 = require("./visitor/type-name-indexing-visitor");
const reference_expression_visitor_1 = require("./visitor/reference-expression-visitor");
const reference_type_visitor_1 = require("./visitor/reference-type-visitor");
const function_flattening_visitor_1 = require("./visitor/function-flattening-visitor");
const store_type_visitor_1 = require("./visitor/store-type-visitor");
const name_flattening_visitor_1 = require("./visitor/name-flattening-visitor");
function LinkUnbound(ast) {
    const function_collector = new function_collecting_visitor_1.FunctionCollectingVisitor();
    const type_collector = new type_name_indexing_visitor_1.TypeNameIndexingVisitor();
    return ast
        .visited(function_collector)
        .visited(type_collector)
        .visited(new reference_expression_visitor_1.ReferenceExpressionVisitor(function_collector.Functions))
        .visited(new reference_type_visitor_1.ReferenceTypeVisitor(type_collector.Types))
        .visited(new function_flattening_visitor_1.FunctionFlatteningVisitor(function_collector.Functions))
        .visited(new store_type_visitor_1.StoreTypeVisitor(type_collector.Types))
        .visited(new name_flattening_visitor_1.NameFlatteningVisitor());
}
exports.LinkUnbound = LinkUnbound;
//# sourceMappingURL=index.js.map