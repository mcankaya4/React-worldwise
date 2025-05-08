import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityProvider } from "./contexts/CityContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

// import Home from "./pages/Home.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Product from "./pages/Product.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import Login from "./pages/Login.jsx";

const Home = lazy(() => import("./pages/Home"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

import Form from "./components/Form.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

function App() {
  // Context gelecek buraya!!!!!!!1
  return (
    <AuthProvider>
      {/* Cities ve isLoading state'leri context ile bu kısımlara aktarılıyor.*/}
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* Main rota tanımı, index yazmak ile path="" aynı anlama gelir. */}
              <Route index element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* App rotası varken farklı bir rota yoksa cities aktif olsun. */}
                {/* App zaten görünmeye devam edecek extra olarak içerisinde bir yerde */}
                {/* cities mi görünsün yoksa country'i mi o belirlenecek. */}
                {/* Navigate kullanılma sebebi: rota sadece app olduğunda cities'i aktif
           etmek. replace kullanılma sebebi ise back tuşunun çalışmasını sağlamak. */}
                {/* Bu navigate ile birlikte sadece app rotası açılma durumu bitti direk
           olarak app/cities çalışır. */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* app/cities */}
                <Route path="cities" element={<CityList />} />
                {/* app/cities/123123 gibi url oluşturur. */}
                <Route path="cities/:id" element={<City />} />
                {/* app/countries */}
                <Route path="countries" element={<CountryList />} />
                {/* app/form */}
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              {/* Tanımsız rota'lar için mükkemmel yöntem! */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
