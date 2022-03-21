import { ReactElement } from "react"
import { Link } from "remix";
import { CatchCertificate } from "~/routes/create-catch-certificate/catchCertificate";
import { ProcessingStatement } from "~/routes/processing-statements/processingStatement";
import { StorageDocument } from "~/routes/storage-documents/storageDocument";
import { Journeys } from "../../data/constants";

interface ProgressTableProps {
  certificates: CatchCertificate[] | ProcessingStatement[] | StorageDocument[];
  journey: Journeys;
};

export const ProgressTable = ({ certificates, journey }: ProgressTableProps): ReactElement => {
  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Document number
          </th>
          <th scope="col" className="govuk-table__header">
            Your reference
          </th>
          <th scope="col" className="govuk-table__header">
            Date started
          </th>
          {
            journey === Journeys.CatchCertificate && (
              <th scope="col" className="govuk-table__header">
                Status
              </th>
            )
          }
          <th scope="col" className="govuk-table__header">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {certificates.map((certificate: CatchCertificate | ProcessingStatement | StorageDocument) => (
          <tr key={certificate.documentNumber} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {certificate.documentNumber}
            </td>
            <td className="govuk-table__cell">{certificate.userReference}</td>
            <td className="govuk-table__cell">{certificate.startedAt}</td>
            {
              'status' in certificate && (
                <td className="govuk-table__cell">
                  <strong className="govuk-tag govuk-tag--grey">{certificate.status}</strong>
                </td>
              )
          }
            <td className="govuk-table__cell">
              <Link
                to={`/create-catch-certificate/${certificate.documentNumber}/add-your-reference`}
                className="govuk-link"
              >
                Continue
              </Link>
              <br />
              <Link
                to="/"
                className="govuk-link"
              >
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}