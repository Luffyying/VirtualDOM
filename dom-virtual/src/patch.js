//补丁 描述为改变的内容 patch方法：用于将补丁更新到DOM
import {Element,render,setAttr} from './element'
let allPatches
// 需要打补丁的索引
let index = 0
function patch(node,patches){
    allPatches = patches
    walk(node)
}
//实际上是后序遍历
function walk(node){
    let current = allPatches[index]
    if(current){
        doPath(node,current,index)
    }
    index++
    let childNodes = node.childNodes
    childNodes.forEach(child=>walk(child))
    
}
function doPath(node,patches,index){
    console.log(patches,index)
    patches.forEach(patch=>{
        switch(patch.type){
            case 'ADD':
                node.parentNode.appendChild(node);
                console.log('====')
                break;
            case 'ATTR':
                for(let key in patch.attr){
                    let value = patch.attr[key]
                    if(value){
                        setAttr(node,key,value)
                    }else{
                        node.removeAttribute(key)
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text
                break;
            case 'REPLACE':
                let newNode = patch.newNode
                newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break;
        }
    })
}
export default patch;
