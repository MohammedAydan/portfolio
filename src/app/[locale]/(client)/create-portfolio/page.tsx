import { getSession } from '@/actions/auth-action'
import { redirect } from 'next/navigation'
import CreatePortfolioComponent from './_CreatePortfolioComponent'

const CreatePortfolio = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth")
  }

  return (
    <CreatePortfolioComponent />
  )
}


export default CreatePortfolio;