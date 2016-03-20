/**
 * @ngdoc Controller
 * @name test.neighbor.neighborController
 * @description
 * Controller for search neighbors cell.
 *
 * @author natalya.fominyh@gmail.com
 */

(function () {
    'use strict';

    angular
        .module('test.neighbor')
        .controller('neighborController', neighborController);

    neighborController.$inject = ['NeighborCellFactory'];

    function neighborController (NeighborCellFactory) {
        var neighborCell;

        this.resetCollection = function () {
            this.cellRow = '';
            this.cellColumn = '';
            this.collection = {};
            this.formCell.cellRow.$setValidity('beth', true);
            this.formCell.cellColumn.$setValidity('beth', true);
        };

        this.buildTable = function (row, column, maxNumber) {
            neighborCell = new NeighborCellFactory();
            this.collection = neighborCell.init(row, column, maxNumber);
            this.neighbors = [];
        };

        this.findNeighbors = function (row, column) {
            this.neighbors = neighborCell.getNeighbor(row - 1, column - 1);
        };

        this.handleRow = function () {
            var condition = !this.cellRow ||
                !this.row && this.cellRow > 10 ||
                this.row < this.cellRow ||
                this.cellRow < 0;
            this.formCell.cellRow.$setValidity('beth', !condition);
        };

        this.handleColumn = function () {
            var condition = !this.cellColumn ||
                !this.column && this.cellColumn > 10 ||
                this.column < this.cellColumn ||
                this.cellColumn < 0;
            this.formCell.cellColumn.$setValidity('beth', !condition);
        }
    }
})();
