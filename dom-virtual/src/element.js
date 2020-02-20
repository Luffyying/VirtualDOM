//虚拟DOM元素的类，构建实例对象
class Element{
    constructor(type,props,children){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
//设置属性
function setAttr(node,key,value){
    switch(key){
        case 'style':
            node.style.cssText = value;
            break;
        case 'value':
            if(node.tagName.toUpperCase() === 'INPUT' ||
            node.tagName.toUpperCase() === 'TEXTAREA'){
                node.value = value;
            }else {
                node.setAttribute(key,value)
            }
            break;
        default:
            node.setAttribute(key,value);
            break;
    }
}
function createElement(type,props,children){
    return new Element(type,props,children)
}
//将虚拟节点转换为真实节点  
function render(vNode){
    let el = document.createElement(vNode.type || 'div')
    for(let key in vNode.props){
        setAttr(el,key,vNode.props[key])
    }
    vNode.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el;
}
//插入页面
function renderDom(el,target){
    console.log()
    window.el = el;
    target.appendChild(el)
}
export {createElement,render,renderDom}