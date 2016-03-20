/**
 * @ngdoc directive
 * @name test.neighbor.testPickNeighbors
 * @scope
 * @description
 * Directive for highlights neighboring cells.
 * @author natalya.fominyh@gmail.com
 */

(function () {
    'use strict';

    angular
        .module('test.neighbor')
        .directive('testPickNeighbors', testPickNeighbors);

    testPickNeighbors.$inject = [];

    function testPickNeighbors () {
        return {
            scope: {
                testPickNeighbors: '=?'
            },
            link: function (scope) {
                scope.$watch('testPickNeighbors', function (newVal) {
                    $('.pick').removeClass('pick');
                    if (newVal) {
                        var rowClass,
                            cellClass,
                            length = scope.testPickNeighbors.length;
                        for (var i = 0; i < length; i++) {
                            rowClass = 'tr.' + scope.testPickNeighbors[i][0];
                            cellClass = 'td.' + scope.testPickNeighbors[i][1];
                            $(rowClass).find(cellClass).addClass('pick');
                        }
                    }
                })
            }
        }
    }
})();
