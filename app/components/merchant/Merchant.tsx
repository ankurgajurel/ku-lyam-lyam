"use client";

export default function Merchant() {
  async function authorizeFlow({ claims, callbackUrl }: any) {
    try {
      const backendUrl = "https://server-p7.samrid.me";

      const authorizeEndpoint = `${backendUrl}/flow/authorize`;

      const requestData = {
        claims,
        callbackUrl,
      };

      const response = await fetch(authorizeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "InternalKey@1234"
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  function sendData() {
    const claims = ["cln5fmlsy0000tid08s26ga7z", "cln5fn7ob0001tid0mpnv0rkj"];
    const callbackUrl = "https://server-p7.samrid.me";

    authorizeFlow({ claims, callbackUrl })
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  }

  return (
    <div className="py-10 flex items-center flex-col justify-center text-3xl">
      <div>sample merchant</div>
      <button onClick={() => sendData()}>Get Data</button>
    </div>
  );
}
