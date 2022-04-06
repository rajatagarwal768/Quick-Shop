import React from 'react';
import './App.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import { LoginScreen } from './screens/Loginscreen';
import { RegisterScreen } from './screens/Registerscreen';
import { ProfileScreen } from './screens/Profilescreen';
import { ShippingScreen } from './screens/Shippingscreen';
import { PaymentScreen } from './screens/Paymentscreen';
import { PlaceOrderScreen } from './screens/PlaceOrderscreen';
import { OrderScreen } from './screens/Orderscreen';
import { UserListScreen } from './screens/UserListscreen';
import { UserEditScreen } from './screens/UserEditscreen';
import { ProductListScreen } from './screens/ProductListscreen';
import { ProductEditScreen } from './screens/ProductEditscreen';
import { OrderListScreen } from './screens/OrderListscreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/orders/:id' component={OrderScreen}></Route>
        <Route path='/admin/userlist' component={UserListScreen}></Route>
        <Route path='/admin/orderlist' component={OrderListScreen}></Route>
        <Route path='/admin/products/:id/edit' component={ProductEditScreen} />
        <Route path='/search/:keyword' component={Homescreen} />
        <Route path='/admin/productlist' component={ProductListScreen}></Route>
        <Route path='/placeorder' component={PlaceOrderScreen}/>
        <Route path='/payment' component={PaymentScreen}/>
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/product/:id' component={Productscreen} exact/>
        <Route path='/cart/:id?' component={Cartscreen} />
        <Route path='/admin/users/:id/edit' component={UserEditScreen} />
        <Route path='/' component={Homescreen} exact/>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
