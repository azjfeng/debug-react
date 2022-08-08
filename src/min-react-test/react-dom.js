
import { createRoot } from './fiber'

function render(element, container) {
    createRoot(element, container)
}

export function renderDom(element) {
    // console.log('element',element)
    let dom = null;

    //如果是空直接返回
    if (!element && element !== 0) {
        return null
    }

    //如果是数字就创建文本节点
    if (typeof element == 'number') {
        dom = document.createTextNode(String(element))
        return dom
    }

    //如果是字符串就创建文本节点
    if (typeof element == 'string') {
        dom = document.createTextNode(element)
        return dom
    }

    // if (Array.isArray(element)) {
    //     // 列表渲染
    //     dom = document.createDocumentFragment();
    //     console.log(dom)
    //     for (let item of element) {
    //         const child = renderDom(item);
    //         console.log('child', child)
    //         if (child) {
    //             dom.appendChild(child);
    //         }
    //     }
    //     return dom;
    // }

    const { type, props: { children, ...attributes } } = element
    if (typeof type === 'string') {
        dom = document.createElement(type)
    }
    else if (typeof type === 'function') {
        dom = document.createDocumentFragment()
    }
    else {
        // 其他情况暂不考虑
        return null;
    }
    // if (children) {
    //     const childrenDom = renderDom(children)
    //     if (childrenDom) {
    //         dom.appendChild(childrenDom)
    //     }
    // }
    updateAttributes(dom, attributes)
    // console.log(dom)
    return dom
}

export function updateAttributes(dom, attributes, oldAttributes) {
    if (oldAttributes) {
        // 有旧属性，移除旧属性
        Object.keys(oldAttributes).forEach((key) => {
            if (key.startsWith('on')) {
                // 移除旧事件
                const eventName = key.slice(2).toLowerCase();
                dom.removeEventListener(eventName, oldAttributes[key]);
            } else if (key === 'className') {
                // className 的处理
                const classes = oldAttributes[key].split(' ');
                classes.forEach((classKey) => {
                    dom.classList.remove(classKey);
                });
            } else if (key === 'style') {
                // style处理
                const style = oldAttributes[key];
                Object.keys(style).forEach((styleName) => {
                    dom.style[styleName] = 'initial';
                });
            } else {
                // 其他属性的处理
                dom[key] = '';
            }
        });
    }


    Object.keys(attributes).forEach((key) => {
        if (key.startsWith("on")) {
            // 事件的处理
            const eventName = key.slice(2).toLowerCase();
            dom.addEventListener(eventName, attributes[key]);
        } else if (key === 'className') {
            const list = attributes[key].split(' ')
            list.forEach((item) => {
                dom.classList.add(item)
            })
        } else if (key === 'style') {
            // style处理
            const style = attributes[key];
            Object.keys(style).forEach((styleName) => {
                dom.style[styleName] = style[styleName];
            });
        } else {
            // 其他属性的处理
            dom[key] = attributes[key];
        }
    })
}


const ReactDOM = {
    render,
};
export default ReactDOM;