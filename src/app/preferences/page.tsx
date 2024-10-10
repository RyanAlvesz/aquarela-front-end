import { Metadata } from 'next'
import Preferences from '@/components/pages/Preferences';

export const metadata: Metadata = {
  title: 'Preferências',
  description: "Escolhe de preferências",
}

export default function Home() {
    return (
        <Preferences />
    );
}
  