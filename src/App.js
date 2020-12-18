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


function App() {
  return (
    <Router>
        <Header />
          <main className="py-3" >
            <Container>
            <Switch>
              <Route path='/' component={Homescreen} exact />
              <Route path='/product/:id' component={ProductScreen} exact />
              <Route path='/cart/:id?' component={CartScreen} exact />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/register' component={RegisterScreen} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route path='/shipping' component={ShippingScreen} exact />
            </Switch>
            </Container>
          </main>
        <Footer />
    </Router>
  );
}

export default App;
