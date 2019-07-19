import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ShopListScreen from './screens/ShopListScreen'
import ShopFormScreen from './screens/ShopFormScreen'
import ShopDetailScreen from './screens/ShopDetailScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import SearchResultScreen from './screens/SearchResultScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import StockFormScreen from './screens/StockFormScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductFormScreen from './screens/ProductFormScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/search" component={SearchResultScreen} />
        <Route exact path="/shops" component={ShopListScreen} />
        <Route exact path="/shops/new" component={ShopFormScreen} />
        <Route exact path="/shops/:id" component={ShopDetailScreen} />
        <Route exact path="/shops/:id/edit" component={ShopFormScreen} />
        <Route exact path="/products/" component={ProductListScreen} />
        <Route exact path="/products/new" component={ProductFormScreen} />
        <Route exact path="/products/:id" component={ProductDetailScreen} />
        <Route exact path="/products/:id/edit" component={ProductFormScreen} />
        <Route exact path="/stocks/new" component={StockFormScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
