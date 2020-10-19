// const roamdb = require("./roam.json")
import fetchRoamResearch from "fetch-roamresearch"
const fs = require('fs');

const saveJSON = jsonContent => fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
//! import instead of require needs to use:: node -r esm index.js

//TODO remove [[]] of all NON-PUBLIC page refs
//     2nd Order refs

const getValueInsideBrackets = txt => {
    var regExp = /\(([^()]*)\)/g;
    var matches = txt.match(regExp) || [];
    return matches.map(matchstr => matchstr.slice(1, - 1) )
}

// 
const getUIDNode = (trees, values, key="uid", childKey="children", nodes=[] ) => {
     trees.forEach(
        tree => {
            if ( values.includes(tree[key])) {
            console.log(tree[key])
            nodes.push(tree)
            }
            if (tree[childKey]) {
                getUIDNode(tree[childKey], values, key, childKey, nodes)
            }}
    )
    return nodes
};



console.log(fetchRoamResearch, typeof (fetchRoamResearch))
const ROAM_URL = "https://roamresearch.com/#/app/markus";
const ROAM_EMAIL = "strasser.ms@gmail.com";
const ROAM_PASSWORD = "your_password!";


const getFirstChild = node => node.children ? node.children[0] : {string: "nope"}
const hasPublicTag = node => getFirstChild(node)["string"].includes("#[[public]]") ||  getFirstChild(node)["string"].includes("#public")
const publicOnly = pages => pages.filter(hasPublicTag)


function flatten(array) {
    return array.reduce( (acc, e) => {
      if(Array.isArray(e.children)) {
        // if the element is an array, fall flatten on it again and then take the returned value and concat it.
        return acc.concat(flatten(e.children));
      } else {
        // otherwise just concat the value.
        return acc.concat(e);
      }
    }, [] ) // initial value for the accumulator is []
  };




const getBlockRefs = (nodes, roamdb, flat=true) => {
    //flatten here causes trouble
    const ns = flat ? flatten(nodes) : nodes
    const flatStrings = ns.map(node => node["string"] ? node["string"] : (node["children"] ? "no children no string" + node.uid : "children but no string" + node.uid))
    console.log(ns, "nodes")
    console.log(flatStrings, "flatStrings")


    const uids = flatStrings.map(getValueInsideBrackets).filter(e => e.length > 0)
    console.log(uids, "UIDS")
    return getUIDNode(roamdb, flatten(uids)).filter(e=> e)
}





// console.log("publics", publics)
// console.log("flat", flatStrings)
// console.log("uids", uids, flatten(uids))
// console.log("refnodes", referenceBlockNodes(flatten(uids)))
// console.log("roamdb find", flatten(roamdb).find(n => n["uid"] === "W3miO3A3o"))
// console.log("try two", roamdb.map(node => getNodeByUID(node, flatten(uids))))//.filter(e => e.length > 0))
//console.log("try two", roamdb.map(node => getNodeByValue(node, "aGSplMmjW")))//.filter(e => e.length > 0))

// console.log(fin.length)



//get all references
//flatten and process
// const getStringsFlat = nodes => {
//     nodes.reduce()
// }



async function asyncCall() {
    const roamdb = await fetchRoamResearch(ROAM_URL, {
        email: ROAM_EMAIL,
        password: ROAM_PASSWORD,
      });
      
      console.log("PAGE 0", roamdb[111])
    
      const publics = publicOnly(roamdb)
    const firstOrder = getBlockRefs(publics, roamdb)
    const secondOrder = getBlockRefs(firstOrder, roamdb)
    const fin = [...firstOrder, ...secondOrder, ...publics]
    //another one without flattening
    const f2 = getBlockRefs(fin, roamdb, false)
    const finfin = [...f2, ...fin]
    console.log(finfin, finfin.length)

    saveJSON(JSON.stringify(finfin))

}

asyncCall()

// const referenceBlockNodes = uids => {

//     return flatten(roamdb).filter(node => uids.includes(node.uid))
// }

// const getNodeByUID = (tree, values, key="uid", childKey="children" ) => {
//     var temp;
//     return values.includes(tree[key])
//         ? tree
//         : (tree[childKey] || []).some(o => temp = getNodeByUID(o, values, key, childKey)) && temp;
// };

//const getNodeByValue = (tree, value, key="uid", childKey="children" ) => {
    //     var temp;
    //     return tree[key] === value
    //         ? tree
    //         : (tree[childKey] || []).some(o => temp = getNodeByValue(o, value, key, childKey)) && temp;
    // };
