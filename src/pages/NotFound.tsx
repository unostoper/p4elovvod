import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteFooter from "@/components/zeroblog/SiteFooter";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container py-4 max-w-5xl">
    <SiteHeader />
    <div className="bevel bg-black/85 p-8 mt-4 text-center space-y-3">
      <h1 className="font-impact text-7xl text-rainbow blink">404</h1>
      <p className="font-vt text-2xl text-neon-yellow">
        Page not found · возможно, эта страница ещё{" "}
        <span className="text-neon-pink">UNDER CONSTRUCTION 🚧</span>
      </p>
      <Link to="/" className="underline-link font-vt text-xl">
        ← back to homepage
      </Link>
    </div>
    <SiteFooter />
  </div>
);

export default NotFound;
