import { Metadata } from 'next'
import Preferences from '@/components/pages/Preferences'

export const metadata: Metadata = {
  title: 'Preferências',
  description: "Escolha de preferências",
}

const Home = () => {

  return (
    <Preferences />
  )

}

export default Home