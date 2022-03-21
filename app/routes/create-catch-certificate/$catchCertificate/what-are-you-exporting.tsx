import { json, LoaderFunction, useLoaderData } from "remix";
import { Tab, TabGroup } from "@capgeminiuk/dcx-react-library";
import { BackButton } from "../../../components";

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.catchCertificate);
};

const $catchCertificate = () => {
  const ccNumber = useLoaderData();
  const limitAddSpecies = (typeof window !== "undefined") ? (window as any).ENV.LIMIT_ADD_SPECIES : '';
  return (
    <>
      <BackButton href={`/create-catch-certificate/${ccNumber}/add-your-reference`} />
      <div className="govuk-!-padding-top-6">
        <div className="govuk-inset-text govuk-!-margin-top-0">
          <p>Please Note:</p>
          <ul>
            <li>Each product must have at least one landing.</li>
            <li>{`A maximum of ${limitAddSpecies} landings is allowed per certificate`}.</li>
          </ul>
        </div>
        <h1 className="govuk-heading-xl">What are you exporting?</h1>
        <TabGroup
          containerClassName="govuk-tabs"
          className="govuk-tabs__list"
          tabClassName="govuk-tabs__list-item"
          tabLinkClassName="govuk-tabs__tab"
          activeTabClassName="govuk-tabs__list-item--selected"
          contentClassName="govuk-tabs__panel"
        >
          <Tab label="Add products" eventKey="tab-pane-add-products">
            <>
              <h2 className="govuk-heading-l">Add products</h2>
              <div>I'm the content of the tab Add products</div>
            </>
          </Tab>
          <Tab
            label="Add products from favourites"
            eventKey="tab-pane-add-products-from-favourites"
          >
            <>
              <h2 className="govuk-heading-l">Add products from favourites</h2>
              <div>I'm the content of the tab from favourites</div>
            </>
          </Tab>
        </TabGroup>
      </div>
    </>
  );
};

export default $catchCertificate;