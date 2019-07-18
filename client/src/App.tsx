import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ShopListScreen from './screens/ShopListScreen'
import ShopRegisterScreen from './screens/ShopRegisterScreen'
import ShopDetailScreen from './screens/ShopDetailScreen'
import ProductRegisterScreen from './screens/ProductRegisterScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import SearchResultScreen from './screens/SearchResultScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import StockRegisterScreen from './screens/StockRegisterScreen'
import ProductListScreen from './screens/ProductListScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/search" component={SearchResultScreen} />
        <Route exact path="/shops" component={ShopListScreen} />
        <Route exact path="/shops/new" component={ShopRegisterScreen} />
        <Route exact path="/shops/:id" component={ShopDetailScreen} />
        <Route exact path="/products/" component={ProductListScreen} />
        <Route exact path="/products/new" component={ProductRegisterScreen} />
        <Route exact path="/products/:id" component={ProductDetailScreen} />
        {/*<Route exact path="/products/:id/edit" component={ProductEditScreen} />*/}
        {/*<Route exact path="/products/:id/delete" component={ProductDeleteCheckScreen} />*/}
        <Route exact path="/stocks/new" component={StockRegisterScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
