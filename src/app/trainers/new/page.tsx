import { FormContainer } from "@/components/FormContainer";

interface TrainersPageProps {
  searchParams: {
    search?: string;
    name?: string;
  };
}

export default async function NewTrainerPage({
  searchParams: { search = "", name = "" },
}: TrainersPageProps) {
  return <FormContainer search={search} name={name} />;
}
