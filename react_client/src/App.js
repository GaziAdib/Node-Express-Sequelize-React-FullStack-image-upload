import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddProduct from './screens/AddProduct'
import EditProduct from './screens/EditProduct'
import ProductDetail from './screens/ProductDetail'
import ShowProducts from './screens/ShowProducts'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/addProduct' component={AddProduct} />
        <Route exact path='/products' component={ShowProducts} />
        <Route exact path='/product/edit/:id' component={EditProduct} />
        <Route exact path='/product/:id' component={ProductDetail} />
      </Switch>
    </Router>
  )
}

export default App
