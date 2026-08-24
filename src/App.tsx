import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import Category from "./pages/Category.tsx";
import Brand from "./pages/Brand.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import Login from "./pages/Login.tsx";
import VerifyOtp from "./pages/VerifyOtp.tsx";
import VerifyDevice from "./pages/VerifyDevice.tsx";
import Buyback from "./pages/Buyback.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Account from "./pages/Account.tsx";
import Profile from "./pages/Profile.tsx";
import Orders from "./pages/Orders.tsx";
import OrderDetails from "./pages/OrderDetails.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Notifications from "./pages/Notifications.tsx";
import Rewards from "./pages/Rewards.tsx";
import Reviews from "./pages/Reviews.tsx";
import PriceAlerts from "./pages/PriceAlerts.tsx";

import Returns from "./pages/Returns.tsx";
import Warranty from "./pages/Warranty.tsx";
import TradeIn from "./pages/TradeIn.tsx";
import FAQ from "./pages/FAQ.tsx";
import Help from "./pages/Help.tsx";
import Compare from "./pages/Compare.tsx";
import PreOrders from "./pages/PreOrders.tsx";
import ReturnsPolicy from "./pages/ReturnsPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ChatbotWidget from "./components/NexZon/ChatbotWidget.tsx";
import StorefrontOnly from "./components/StorefrontOnly.tsx";

// Admin console. Everything under /admin renders inside AdminLayout, behind the
// staff route guard, with no storefront header, footer, promo bar or chatbot.
import AdminLayout from "./components/admin/AdminLayout.tsx";
import RequireAdmin from "./components/admin/RequireAdmin.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminProducts from "./pages/admin/Products.tsx";
import AdminProductForm from "./pages/admin/ProductForm.tsx";
import AdminInventory from "./pages/admin/Inventory.tsx";
import AdminOrders from "./pages/admin/Orders.tsx";
import AdminOrderDetail from "./pages/admin/OrderDetail.tsx";
import AdminFulfilment from "./pages/admin/Fulfilment.tsx";
import AdminCustomers from "./pages/admin/Customers.tsx";
import AdminCustomerDetail from "./pages/admin/CustomerDetail.tsx";
import AdminPreOrders from "./pages/admin/PreOrders.tsx";
import AdminPreOrderDetail from "./pages/admin/PreOrderDetail.tsx";
import AdminPromotions from "./pages/admin/Promotions.tsx";
import AdminReviews from "./pages/admin/Reviews.tsx";
import AdminService from "./pages/admin/Service.tsx";
import AdminContent from "./pages/admin/Content.tsx";
import AdminSettings from "./pages/admin/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/brand/:slug" element={<Brand />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/orders/:id" element={<OrderDetails />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/account/wishlist" element={<Wishlist />} />
          <Route path="/account/notifications" element={<Notifications />} />
          <Route path="/account/rewards" element={<Rewards />} />
          <Route path="/account/reviews" element={<Reviews />} />
          <Route path="/account/price-alerts" element={<PriceAlerts />} />
          
          <Route path="/account/returns" element={<Returns />} />
          <Route path="/account/warranty" element={<Warranty />} />
          <Route path="/account/trade-in" element={<TradeIn />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/verify" element={<VerifyDevice />} />
          <Route path="/buyback" element={<Buyback />} />
          <Route path="/pre-orders" element={<PreOrders />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />

          {/* Admin console — 17 pages across 18 routes. Login sits outside the
              layout so a signed-out staff member has somewhere to land. */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
            <Route path="fulfilment" element={<AdminFulfilment />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="customers/:id" element={<AdminCustomerDetail />} />
            <Route path="pre-orders" element={<AdminPreOrders />} />
            <Route path="pre-orders/:id" element={<AdminPreOrderDetail />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="service" element={<AdminService />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <StorefrontOnly>
          <ChatbotWidget />
        </StorefrontOnly>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
