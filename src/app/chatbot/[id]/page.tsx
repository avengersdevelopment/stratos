import Container from "@/app/chatbot/_components/container";
import Header from "@/components/header";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
    <Header />
    <Container chapterId={params.id} />;
    </>
  )
}
