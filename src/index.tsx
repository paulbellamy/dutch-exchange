import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import 'less/style.less'

import AppRouter from 'router'

import walletIntegrationCallback from 'integrations/WalletIntegration'
import * as walletIntegrations from 'integrations/'

import createStoreWithHistory from 'store'
const history = createHistory()
const store = createStoreWithHistory(history)

// load data from localstorage
store.dispatch({ type: 'INIT' })

/* global document */
const rootElement = document.getElementById('root')

const initializer: any = () => new walletIntegrationCallback(walletIntegrations, store)

const render = (App: React.SFC<any> | React.ComponentClass<any>, cb?: any) => {
  ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        rootElement,
        cb,
    )
}

render(AppRouter, initializer)

if (module.hot) {
  module.hot.accept('./router', () =>
    render(require('./router').default))
}
