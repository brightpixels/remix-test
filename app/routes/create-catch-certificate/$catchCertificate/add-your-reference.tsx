import React, { useState } from "react";
import { Form, redirect, json, LoaderFunction, useLoaderData, useCatch } from "remix";
import type { MetaFunction } from "remix";
import { isEmpty } from "lodash";
import { IAction } from "../../../../interfaces/action.interface";
import { IError, IErrorTransformed } from "../../../../interfaces/errors.interface";
import { getErrorMessage, getTransformedError } from "../../../../data/lookupErrorText";
import { 
  BackButton,
  Help,
  HintTextInput,
  PrimaryButton,
  SecondaryButton
} from "../../../components";
import { ErrorSummary } from "~/components/errorSummary";

interface IUserReferenceProps {
  userReference?: string;
  errors?: IErrorTransformed;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Add your reference for this export - Create a UK catch certificate - GOV.UK",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export const loader: LoaderFunction = async ({ params }) => {
  const { catchCertificate = '' } = params;
  const response = await fetch("http://localhost:3001/orchestration/api/v1/userReference", {
    method: 'GET',
    headers: {
      documentnumber: catchCertificate
    }
  });
  const userReference: string = await response.text();
  return json({ userReference });
};

export const action = async ({ request, params }: IAction) => {
  const { catchCertificate = '' } = params;
  const form = await request.formData();
  const userReference = form.get('userReference');

  const response = await fetch("http://localhost:3001/orchestration/api/v1/userReference", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      documentnumber: catchCertificate
    },
    body: JSON.stringify({ userReference: userReference })
  });

  if (response.status === 400) {
    const data = await response.json();
    throw json({ userReferenceError: data['userReference'], userReference }, 400);
  }
  
  return redirect(`/create-catch-certificate/${catchCertificate}/what-are-you-exporting`);
}

export function CatchBoundary() {
  const caught = useCatch();
  const lookupErrorMessage: IError[] = [{
    key: 'userReference',
    message: getErrorMessage(caught.data.userReferenceError)
  }]
  const errorUserReference: string = caught.data.userReference;
  return <UserReferencePage errors={getTransformedError(lookupErrorMessage)} userReference={errorUserReference}/>
}


const UserReferencePage: React.FC<IUserReferenceProps> = ({ errors = {}, userReference }: React.PropsWithChildren<IUserReferenceProps>) => {
  const data: { userReference: string } = useLoaderData<{ userReference: string }>() || { userReference };
  const [userRefernce, setUserReference] = useState<string>(data.userReference);

  const onChangeUserReference: React.FormEventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserReference(event.currentTarget.value);
  }

  return (
    <div className="govuk-!-padding-top-6">
      {!isEmpty(errors) && <ErrorSummary errors={Object.keys(errors).flatMap((key: string) => errors[key])} />}
      <BackButton href='/create-catch-certificate/catch-certificates'/>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Add your reference for this export</h1>
      <Form method="post">
        <HintTextInput 
          hint="Enter a reference to help you identify this catch certificate within the service. This reference is for your own use and will not appear on the final certificate. For example, you could choose a reference number from your organisation."
          id="userReference"
          label="Your reference (optional)"
          id_hint="userReferenceHint"
          value={userRefernce}
          onChange={onChangeUserReference}
          error={errors.userReference}
        />
        <SecondaryButton>Save as draft</SecondaryButton>
        <PrimaryButton>Save and continue</PrimaryButton>
      </Form>
      <Help />
    </div>
  )
};

export default UserReferencePage;