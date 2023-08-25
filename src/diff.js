function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;
    walk(oldTree, newTree, index, patches);
    return patches;
}

function walk(oldNode, newNode, index, patches) {
    //每个节点一个补丁
    let current = [];
    //如果新节点不存在，则直接将type为REMOVE的类型放到补丁里
    if(!newNode) {
        current.push({type: 'REMOVE', index});
    }
    //如果新老节点是文本的话就比较以下文本是否一致，将其放进补丁
    if(isString(oldNode) && isString(newNode)) {
        if(oldNode !== newNode) {
            current.push({type: 'TEXT', text: newNode});
        }
    } else if(oldNode.type === newNode.type) {
        //如果节点类型相同，就比较props，分为属性比较和子节点比较
        //比较新老Attr是否相同
        let attr = diffAttr(oldNode.props, newNode.props);
        if(Object.keys(attr).length > 0) {
            current.push({type: 'ATTR', attr});
        }
        //有子节点，遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else { //说明节点被替换了
        current.push({type: 'REPLACE', newNode});
    }
    //当前元素有补丁存在
    if(current.length){
        patches[index] = current;
    }
}

function isString(obj) {
    return typeof obj === 'string';
}

function diffAttr(oldAttr, newAttr) {
    let patch = {};
    //属性改了
    for(let key in oldAttr) {
        if(oldAttr[key] !== newAttr[key]) {
            patch[key] = newAttr[key];
        }
    }
    //新增属性
    for(let key in newAttr) {
        if(!oldAttr.hasOwnProperty(key)) {
            patch[key] = newAttr[key];
        }
    }
    return patch;
}

let num = 0;
function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, index) => {
        walk(child, newChildren[index], ++num, patches);
    })
}

export default diff;