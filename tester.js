const json = require("./roam.json")



const tree = { children: 
    [{ id: 10, children: [{ id: 34, children: [], title: "yolo" }, 
    { id: 35, children: [] }, { id: 36, children: [] }] }, { id: 10, children: [{ id: 34, children: [{ id: 345, children: 
        [{id: 200, title: "jew"}] }] }, { id: 35, children: [] }, 
        { id: 36, children: [] }] }, { id: 11, children: [{ id: 30, children: [] }, 
        { id: 33, children: [] }, { id: 3109, children: [] }] }], id: 45 }


getNodeByValue = (tree, value, key="id", childKey="children" ) => {
        var temp;
        return tree[key] === value
            ? tree
            : (tree[[childKey]] || []).some(o => temp = getNodeByValue(o, value, key, childKey)) && temp;
};
console.log(json[0] , "json")
console.log(getNodeByValue(tree, 200));
console.log(getNodeByValue(tree, 34));
console.log(getNodeByValue(tree, 213123));
