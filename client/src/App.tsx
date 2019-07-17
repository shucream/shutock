import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ShopListScreen from './screens/ShopListScreen'
import ShopRegisterScreen from './screens/ShopRegisterScreen'
import ShopDetailScreen from './screens/ShopDetailScreen'
import ProductRegisterScreen from './screens/ProductRegisterScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import SearchResultScreen from './screens/SearchResultScreen'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/shops" component={ShopListScreen} />
      <Route exact path="/shops/new" component={ShopRegisterScreen} />
      <Route exact path="/shops/:id" component={ShopDetailScreen} />
      <Route exact path="/products/new" component={ProductRegisterScreen} />
      <Route exact path="/products/:id" component={ProductDetailScreen} />
      <Route exact path="/search?q=:keyword" component={SearchResultScreen} />
    </BrowserRouter>
  )
}

export default App
