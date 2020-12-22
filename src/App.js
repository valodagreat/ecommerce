import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Container } from 'react-bootstrap';
import Homescreen from "./screens/Homescreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


function App() {
  return (
    <Router>
        <Header />
          <main className="py-3" >
            <Container>
            <Switch>
              <Route path='/' component={Homescreen} exact />
              <Route path='/order/:id' component={OrderScreen} exact />
              <Route path='/product/:id' component={ProductScreen} exact />
              <Route path='/cart/:id?' component={CartScreen} exact />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/register' component={RegisterScreen} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route path='/shipping' component={ShippingScreen} exact />
              <Route path='/payment' component={PaymentMethodScreen} exact />
              <Route path='/placeorder' component={PlaceOrderScreen} exact />
              <Route path='/admin/userlist' component={UserListScreen} exact />
              <Route path='/admin/productlist' component={ProductListScreen} exact />
              <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
              <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact />
            </Switch>
            </Container>
          </main>
        <Footer />
    </Router>
  );
}

export default App;
