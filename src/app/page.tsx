import { redirect } from 'next/navigation';

export default function Home() {
  redirect(`/surveys/test-survey`);
}
