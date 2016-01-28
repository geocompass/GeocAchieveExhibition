module.exports = function($filter) {
    // json 排序，支持两个属性
    var sortJsonArray = function(objArray, sort1, sort2) {
        if (arguments.length < 2) throw new Error("sortJsonArrayByProp requires 2 arguments");

        if (objArray && objArray.constructor === Array) {
            // 第一个排序参数
            if (sort1.length != 2) {
                return;
            }
            var sort1Name = (sort1.constructor === Array) ? sort1[0] : "";
            var direct1 = (sort1.constructor === Array) && (sort1.length === 2) ? sort1[1] : 1; // 1:ascending, -1:descending
            // 第二个排序参数
            var sort2Name = "";
            var direct2 = 1;
            if (arguments.length === 3) {
                sort2Name = (sort1.constructor === Array) ? sort2[0] : "";
                direct2 = (sort2.constructor === Array) && (sort2.length === 2) ? sort2[1] : 1; // 1:ascending, -1:descending
            }
            // 排序
            var result = objArray.sort(function(a, b) {
                var comp = ((a[sort1Name] < b[sort1Name]) ? -1 * direct1 : ((a[sort1Name] > b[sort1Name]) ? 1 * direct1 : 0));
                if (comp === 0 && sort2Name) {
                    comp = ((a[sort2Name] < b[sort2Name]) ? -1 * direct2 : ((a[sort2Name] > b[sort2Name]) ? 1 * direct2 : 0));
                }
                return comp;
            });
            return result;
        }
    };

    // json 过滤搜索
    var filterJsonArray = function(objArray, filterKey) {
        if (objArray && objArray.constructor === Array) {
            if (filterKey) {
                var result = objArray.filter(function(obj) {
                    var result = obj.title.indexOf(filterKey) >= 0;
                    return result;
                });
                console.log("filter:", result);
                return result;
            }
        }
    };

    // 重新塑造结构
    var reconstructData = function(data, catagory) {
        var objArray = data;
        if (objArray && objArray.constructor === Array && catagory) {
            var result = [];
            var curCatagory = {};
            var curCtg;
            for (var obj in objArray) {
                var prj = objArray[obj];
                if (!prj) {
                    continue;
                }
                if (curCtg != prj[catagory]) {
                    if (curCatagory && Object.keys(curCatagory).length !== 0) {
                        result.push(curCatagory);
                    }
                    curCatagory = {};
                    if (catagory === "year") {
                        curCatagory.name = prj.year;
                        curCatagory.type = "year";
                    } else if (catagory === "type") {
                    	curCatagory.name = prj.typename;
                    	curCatagory.type = prj.type;
                    }
                    curCatagory.data = [];
                } else {
                    if (curCatagory && Object.keys(curCatagory).length !== 0) {
                        curCatagory.data.push(prj);
                    }
                }
                curCtg = prj[catagory];
            }
            return result;
        }
    };

    return {
        // 排序
        sortByAttr: function(data, sort1, sort2) {
            var results = data;
            return sortJsonArray(results, sort1, sort2);
        },
        // 搜索
        filterByKey: function(data, filterKey) {
            var results = data;
            return filterJsonArray(results, filterKey);
        },
        // 拼接结构
        reconstructData: function(data, catagory) {
            return reconstructData(data, catagory);
        }
    };
};
