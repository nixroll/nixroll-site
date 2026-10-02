import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageShell } from "@/components/PageShell";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <PageShell>
      <Header />
      <Timeline />
      <Divider />
      <Footer />
    </PageShell>
  );
}
