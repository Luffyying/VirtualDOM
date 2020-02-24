// import { walk } from "./element"

//virtualDOM 存在的含义：先序遍历深度优先搜索，比较2个对象，创建出补丁（描述改变的内容），使用补丁来更新DOM
function diff(oldTree,newTree){
    //声明变量patches用来存放补丁的对象
    let patches = {}
    //第一次比较应该是树的第0个索引
    let index = 0
    walk(oldTree,newTree,index,patches)
    return patches
}
function walk(oldNode,newNode,index,patches){
    //每个元素都有一个补丁
    let current = [];
    if(!newNode){
        //新节点直接被移除了
        current.push({type:'REMOVE',index})
    }else if(!oldNode){
        //增加节点
        current.push({type:'ADD',index})
        console.log('--new')
    }else if(newNode && oldNode){
        if(isString(oldNode) && isString(newNode)){
            //判断文本节点是否一致
            if(oldNode !== newNode){
                current.push({type:'TEXT',text:newNode})
            }
        }else if(oldNode.type === newNode.type){
            //比较属性是否有更改
            let attr = diffAttr(oldNode.props,newNode.props)
            if(Object.keys(attr).length>0){
                current.push({
                    type:'ATTR',
                    attr
                })
            }
            //如果有子节点，遍历子节点
            diffChildren(oldNode.children,newNode.children,patches)
        }
    }
    if(current.length){
        console.log(index)
        patches[index] = current
    }
}
function isString(obj){
    return typeof obj === 'string'
}
function diffAttr(oldAttrs,newAttrs){
    let patch = {}
    //以新节点属性为主，展开2次遍历
    //消失的属性、内容不一致的属性
    for(let key in oldAttrs){
        if(oldAttrs[key] !== newAttrs[key]){
            patch[key] = newAttrs[key]
        }
    }
    //增加的属性
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key]
        }
    }
    return patch
}
let num = 0
function diffChildren(oldChildren,newChildren,patches){
    //？不应该以newChildren为主
    newChildren.forEach((child,index)=>{
        walk(oldChildren[index],child,++num,patches)
    })
}
export default diff;
//diff和patch以同一种遍历方式
