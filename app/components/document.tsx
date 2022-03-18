import { Outlet } from "remix";
import { Banner } from "./banner";

export const Document = () => (
  <div className="govuk-width-container">
    <main className="govuk-main-wrapper" id="main-content" role="main">
      <Banner />
      <Outlet />
    </main>
  </div>
);
