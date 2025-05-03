import { useEffect, useState } from "react";
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

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // json-server'a istek atıyoruz ve verileri cities'e depoluyoruz.
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        if (!res.ok) throw new Error("Error fetching cities.");
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main rota tanımı, index yazmak ile path="" aynı anlama gelir. */}
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />}>
          {/* App rotası varken farklı bir rota yoksa cities aktif olsun. */}
          {/* App zaten görünmeye devam edecek extra olarak içerisinde bir yerde */}
          {/* cities mi görünsün yoksa country'i mi o belirlenecek. */}
          {/* Navigate kullanılma sebebi: rota sadece app olduğunda cities'i aktif
           etmek. replace kullanılma sebebi ise back tuşunun çalışmasını sağlamak. */}
          {/* Bu navigate ile birlikte sadece app rotası açılma durumu bitti direk
           olarak app/cities çalışır. */}
          <Route index element={<Navigate replace to="cities" />} />
          {/* app/cities */}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* app/cities/123123 gibi url oluşturur. */}
          <Route path="cities/:id" element={<City />} />
          {/* app/countries */}
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          {/* app/form */}
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        {/* Tanımsız rota'lar için mükkemmel yöntem! */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
