// # Library
import Router from 'next/router';

export const handelRouter = (name) => {
    let page = name;
    if (page == undefined) {
        page = '/';
    } else {
        page = `/${name}`;
    }

    Router.push(page);
};

export const handelRouterIndex = (name, index) => {
    console.log('gtg', name, index);
    Router.push(`/${name}?index=${index}`);
};
