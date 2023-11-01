import { useRouter } from "next/navigation";
import { useState } from "react";

function useJourneyAPI() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refresh } = useRouter();

  async function response(
    method: "POST" | "PATCH" | "DELETE",
    body: any,
    onSuccess: () => void,
    onError: (e: any) => void
  ) {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/journey", {
        method: method,
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSuccess();
        return await res.json;
      }
    } catch (e) {
      console.log(e);
      onError(e);
    } finally {
      setIsSubmitting(false);
      refresh();
    }
  }

  return { isSubmitting, response };
}

export default useJourneyAPI;
