import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// import { Menu } from "./components/nav";
import { Cart, CategoriesList, CategoryView, Home, Login, ProductView, Register, Search, Shop } from "./pages";
import { Toaster } from "react-hot-toast";
import { UserDashboard, UserOrders, UserProfile } from "./pages/user";
import { AdminDashboard, AdminCategory, AdminProduct, AdminOrder } from "./pages/admin"
import { AdminRoute, PrivateRoute } from "./components/routes";
import { AppMenu } from "./components/nav";

const PageNotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <NavLink to="/" className="inline-flex text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</NavLink>
        </div>
      </div>
    </section>

  );
};


function App() {
  return (
    <BrowserRouter>
       <AppMenu /> 
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/orders" element={<AdminOrder />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
    // <div className="text-3xl font-bold underline">
    //   <h1>This is App Component</h1>
    // </div>
  );
}

export default App;
