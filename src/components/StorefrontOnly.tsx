import { useLocation } from "react-router-dom";

/**
 * Renders its children on shop pages only.
 *
 * The chatbot widget sits outside <Routes> so it floats over every page, which
 * is right for the shop and wrong for the admin console — staff do not need a
 * customer support bubble over the order pipeline. Wrapping it here keeps the
 * widget global without letting it leak into /admin.
 */
const StorefrontOnly = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;

  return <>{children}</>;
};

export default StorefrontOnly;
