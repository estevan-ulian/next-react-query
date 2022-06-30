import type { NextPage } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'

type SpaceXData = {
  name: string
  links: {
    patch: {
      large: string
    }
  }
}

const getSpaceXData = async () => await (await fetch('https://api.spacexdata.com/v5/launches/latest')).json()

const Home: NextPage = () => {
  const { data } = useQuery<SpaceXData>('spacex', getSpaceXData)

  if(!data) return <div>Sem dados!</div>

  return (
    <div>
      <ul>
        <li>
          <h2>{data?.name}</h2>
          <img src={data?.links.patch.large} alt='patch image' className='w-auto' />
        </li>
      </ul>      
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<SpaceXData>('spacex', getSpaceXData)

  return {
    props: {
      dehydrate: dehydrate(queryClient)
    }
  }
}
