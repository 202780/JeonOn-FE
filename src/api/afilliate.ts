import { api } from "@/utils/customAxios";

type AffiliateData = {
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    images?: File[];
}

export default async function postAffiliate(data: AffiliateData) {
    try {
        const formData = new FormData();

        const requestBlob = new Blob(
            [JSON.stringify({
              name: data.name,
              location: data.location,
              start_date: data.start_date,
              end_date: data.end_date,
              description: data.description,
            })],
            { type: "application/json" }
          );
          formData.append("request", requestBlob);

        data.images?.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        const result = await api.post("admins/partners", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        console.log("Affiliate registered: ", result);
        return result;
    } catch (error) {
        console.error("Affilliate registeration failed: ", error);
        throw error;
    }
}