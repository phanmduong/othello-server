import React from "react";

export function URL_add_parameter(param, value) {
    let hash = {};
    let url = window.location.href;

    let parameters = url.split(/\?|&/);

    for (let i = 0; i < parameters.length; i++) {
        if (!parameters[i]) continue;

        let ary = parameters[i].split("=");
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    let list = [];
    Object.keys(hash).forEach(function (key) {
        if (hash[key]) {
            list.push(key + "=" + hash[key]);
        }
    });

    url = window.location.pathname + "?" + list.join("&");
    return url;
}

export function reload_url(url) {
    window.location.href = url;
}

export function isEmpty(data) {
    return data == undefined || data == null || data == "";
}

/**
 * Add props to view
 * @param {*} beforeProps
 * @param {*} props
 * @param {*} component
 * @param {*} keyComponent
 */
export function addPropsComponent(beforeProps, props = {}, component = null, keyComponent = null) {
    if (component && keyComponent) {
        component = React.cloneElement(component, props);
        return {
            ...beforeProps,
            [keyComponent]: component
        };
    }
    return beforeProps;
}

/**
 * remove property in props
 * @param {*} props
 * @param {*} key
 */
export function removeProp(props, key = null) {
    let newProps = {};
    if (key) {
        Object.keys({...props}).forEach((keyProp) => {
            if (keyProp !== key) {
                newProps[keyProp] = props[keyProp];
            }
        });
        return newProps;
    }
    return props;

}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPagination(pagination) {
    return {
        pageSize: parseInt(pagination.per_page),
        current: pagination.current_page,
        total: pagination.total
    };
}

/**
 * convert data sort of ant table with server sort
 * @param {*} sorter sorter of ant table
 * @param {*} key key of object need sort in server
 */
export function formatSortTable(sorter, key) {
    if (key == sorter.field) {
        if (sorter.order == "ascend") return "asc";
        else {
            return "desc";
        }
    }
    return "";
}

/**
 *
 * @param location = props.location
 * @param key params
 * @returns {string || null} value params
 */

export function redirectURL(url) {
    window.location.replace(url);
}


export function getLastArr(arr) {
    if (!isEmptyArr(arr)) {
        return arr[arr.length - 1];
    }
    return null;
}

export function getFirstArr(arr) {
    if (!isEmptyArr(arr)) {
        return arr[0];
    }
    return null;
}

export function isEmptyArr(arr) {
    if (arr && arr.length > 0) {
        return false;
    }
    return true;
}

export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

/**
 *
 * @param array array need to check
 * @param item empty if use filter custom
 * @param key empty if use filter custom
 * @param filter filter custom
 * @returns {boolean}
 */
export function isExistArray(array, item, key, filter) {
    if (!isEmptyArr(array) && !isEmpty(item) && !isEmpty(key)) {
        if (filter) {
            return array.filter(filter).length > 0;
        } else {
            return array.filter((dataItem) => dataItem[key] == item[key]).length > 0;
        }
    }

    return false;
}

export function convertUrlImageBackground(url) {
    return `url(${url}) center center / cover`;
}

export function clearArray(arr) {
    while (arr.length) {
        arr.pop();
    }
}

export function linkRoute(rootLink, data) {
    let link = rootLink;
    Object.keys(data).forEach((key) => {
        const re = new RegExp(`:${key}`, 'g');
        link = link.replace(re, data[key]);
    });

    return link;
}

export function checkLink(routeLink, link) {
    return routeLink == link;
}

/**
 * get value of object with string key
 * @param object example: {post: {creator: 'A'}}
 * @param strKey example: "post.creator"
 * @returns {*} example: A
 */

export function getValueObjectFromStringKey(object, strKey) {
    let arrKey = strKey.split('.');
    let objectData = {...object};
    arrKey.forEach((key) => {
        if (isEmpty(objectData)) return;

        objectData = objectData[key];
    });
    return objectData;
}

export function randomStr() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}