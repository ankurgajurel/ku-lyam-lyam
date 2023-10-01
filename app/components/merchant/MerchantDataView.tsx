"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ClaimType {
  id: string;
  name: string;
  description: string;
}

interface Claim {
  id: string;
  claimTypeId: string;
  userId: string;
  value: boolean;
}

export default function MerchantDataView() {
  const searchParams = useSearchParams();
  const claims = searchParams.get("claims");
  if (!claims) {
    return <>No claims found</>;
  }

  const decodedClaims: Claim[] = JSON.parse(atob(claims));
  const [claimTypes, setClaimTypes] = useState<ClaimType[]>();

  useEffect(() => {
    fetch("https://server-p7.samrid.me/claims/types")
      .then((response) => response.json())
      .then((data) => {
        setClaimTypes(data.claimTypes);
      });
  }, []);

  return (
    <>
      <div className="py-10 flex items-center flex-col justify-center text-3xl">
        Claims Data:
        {decodedClaims.map((claim, index) => (
          <div key={index} className="text-sm">
            <div>Claim ID: {claim.id}</div>
            <div>
              Name:{" "}
              {claimTypes?.find((ct) => ct.id === claim.claimTypeId)?.name}
            </div>
            <div>Value: {claim.value.toString()}</div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
