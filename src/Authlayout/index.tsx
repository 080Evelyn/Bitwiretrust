import { Outlet } from 'react-router-dom'

type Props = {}

const Authlayout = (_props: Props) => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default Authlayout