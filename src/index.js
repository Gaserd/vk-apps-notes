import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'
import createStore from 'storeon'
import tasks from './tasks'
import StoreContext from 'storeon/react/context'

connect.send('VKWebAppInit', {});


const router = createRouter()
const store = createStore([tasks])

router.start(() => {
    ReactDOM.render((
        <RouterProvider router={router}>
            <StoreContext.Provider value={store}>
                <App router={router}/>
            </StoreContext.Provider>
        </RouterProvider>
    ), document.getElementById('root'))
})
