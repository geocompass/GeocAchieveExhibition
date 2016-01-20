module.exports = function($filter) {

    var sortJsonArrayByProperty = function(objArray, sort1, sort2) {
        if (arguments.length < 2) throw new Error("sortJsonArrayByProp requires 2 arguments");

        if (objArray && objArray.constructor === Array) {
            //第一个排序参数
            if (sort1.length != 2) {
                return;
            }
            var sort1Name = (sort1.constructor === Array) ? sort1[0] : ""; //1:ascending, 0:descending
            var direct1 = (sort1.constructor === Array) && (sort1.length === 2) ? sort1[1] : 1; //1:ascending, 0:descending
            //第二个排序参数
            var sort2Name = "";
            var direct2 = 1;

            if (arguments.length === 3) {
                sort2Name = (sort1.constructor === Array) ? sort2[0] : "";
                direct2 = (sort2.constructor === Array) && (sort2.length === 2) ? sort2[1] : 1; //1:ascending, 0:descending
            }
            objArray.sort(function(a, b) {
                var comp = ((a[sort1Name] < b[sort1Name]) ? -1 * direct1 : ((a[sort1Name] > b[sort1Name]) ? 1 * direct1 : 0));
                if (comp === 0 && sort2Name) {
                    comp = ((a[sort2Name] < b[sort2Name]) ? -1 * direct2 : ((a[sort2Name] > b[sort2Name]) ? 1 * direct2 : 0));
                }
                return comp;
            });
            return objArray;
        }
    };

    return {
        sortByDate: function(data, keyword) {
            var results = data;
            return sortJsonArrayByProperty(results, ['date', 0], ['type', 1]);
        },
        sortByType: function(data, keyword) {
            var results = data;
            return sortJsonArrayByProperty(results, ['type', 1], ['date', 0]);
        },
    };
};
