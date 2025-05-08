import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";
import NotFound from "./NotFound.jsx";
import Login from "./pages/Login.jsx";
import Form from "./components/Form.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import { CityProvider } from "./contexts/CityContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  // Context gelecek buraya!!!!!!!1

  return (
    <AuthProvider>
      // Cities ve isLoading state'leri context ile bu kısımlara aktarılıyor.
      <CityProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
