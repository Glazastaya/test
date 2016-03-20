/**
 * @ngdoc factory
 * @name test.neighbor.NeighborCellFactory
 * @description
 * Search for the neighboring cells
 * @author natalya.fominyh@gmail.com
 **/

(function () {
    'use strict';

    angular.module('test.neighbor')
        .factory('NeighborCellFactory', NeighborCellFactory);

    NeighborCellFactory.$inject = [];

    function NeighborCellFactory () {
        /**
         * @constructor
         * @description
         * find a block of neighbor cells with the same value in a 2­dimensional array for a
         * cell with specific coordinates
         **/
        function Neighborcell() {
            this.collection = [];
            this.neighbors = [];
            this.searchValue = '';
            this.defaultOptions = {
                row: 10,
                column: 10,
                maxNumber: 10
            };
            this.options = {};
        }

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#init
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Create the collection from random values
         *
         * @param {Number} row Amount of rows in the collection
         * @param {Number} column Amount of columns in the collection
         * @param {Number} maxNumber Maximum number to generate random numbers
         * @return {Array} collection
         */
        Neighborcell.prototype.init = function (row, column, maxNumber) {
            this.options = {
                row: row || this.defaultOptions.row,
                column: column || this.defaultOptions.column,
                maxNumber: maxNumber || this.defaultOptions.maxNumber
            };
            for (var i = 0;  i < this.options.row; i++) {
                this.collection[i] = [];
                for (var j = 0; j < this.options.column; j++) {
                    this.collection[i][j] = Math.floor(Math.random() * this.options.maxNumber + 1);
                }
            }
            return this.collection;
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_topNeighbor
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Search top neighbor with same value
         *
         * @param {Number} row Row which start search
         * @param {Number} column Column which start search
         */
        Neighborcell.prototype._topNeighbor = function (row, column) {
            if (row !== 0 && this.collection[row - 1][column] == this.searchValue) {
                this._findNeighbors([row - 1, column], {bottom: true});
            }
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_bottomNeighbor
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Search bottom neighbor with same value
         *
         * @param {Number} row Row which start search
         * @param {Number} column Column which start search
         */
        Neighborcell.prototype._bottomNeighbor = function (row, column) {
            if (row !== this.options.row - 1 && this.collection[row + 1][column] == this.searchValue) {
                this._findNeighbors([row + 1, column], {top: true});
            }
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_leftNeighbor
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Search left neighbor with same value
         *
         * @param {Number} row Row which start search
         * @param {Number} column Column which start search
         */
        Neighborcell.prototype._leftNeighbor = function (row, column) {
            if (column !== this.options.column - 1 && this.collection[row][column + 1] == this.searchValue) {
                this._findNeighbors([row, column + 1], {right: true});
            }
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_rightNeighbor
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Search right neighbor with same value
         *
         * @param {Number} row Row which start search
         * @param {Number} column Column which start search
         */
        Neighborcell.prototype._rightNeighbor = function (row, column) {
            if (column !== 0 && this.collection[row][column - 1] == this.searchValue) {
                this._findNeighbors([row, column - 1], {left: true});
            }
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_isContains
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * Exists the new column in found or not
         *
         * @param {Array} collection List of found cells
         * @param {Number} sector New cell
         */
        Neighborcell.prototype._isContains = function (collection, sector) {
            var check = false;
            angular.forEach(collection, function(col) {
                if (((col[0] == sector[0]) && col[1] == sector[1])) {
                    check = true;
                }
            });
            return check;
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#_findNeighbors
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * If new cell doesn't exist in found cells then search her neighbors
         *
         * @param {Array} sector New cell
         * @param {Object} directions Direction that need to check
         */
        Neighborcell.prototype._findNeighbors = function (sector, directions) {
            if (!this._isContains(this.neighbors, sector)) {
                this.neighbors.push(sector);
                var row = sector[0];
                var column = sector[1];
                if (!directions.top) {
                    this._topNeighbor(row, column);
                }
                if (!directions.bottom) {
                    this._bottomNeighbor(row, column);
                }
                if (!directions.left) {
                    this._leftNeighbor(row, column);
                }
                if (!directions.right) {
                    this._rightNeighbor(row, column);
                }
            }
        };

        /**
         * @ngdoc method
         * @name test.neighbor.NeighborCellFactory#getNeighbor
         * @methodOf test.neighbor.NeighborCellFactory
         * @description
         * return the list of neighbors
         *
         * @param {Number} row Row cell that need to check for neighbors
         * @param {Number} column Column cell that need to check for neighbors
         * @return {Array} Array with neighbors
         */
        Neighborcell.prototype.getNeighbor = function (row, column) {
            if (row > this.options.row || row < 0) {
                throw new Error(row + ' row does not exist in cells collection');
            }
            if (column > this.options.column || column < 0) {
                throw new Error(column + ' column does not exist in cells collection');
            }
            this.neighbors = [];
            this.searchValue = this.collection[row][column];
            this._findNeighbors([row, column], {});
            return this.neighbors;
        };

        return Neighborcell;
    }
})();