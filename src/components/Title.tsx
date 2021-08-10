import { FunctionComponent } from "react"

type props_type = {
  title: string
}

const Title: FunctionComponent<props_type> = ({ title }): JSX.Element => {
  return (
    <div className='section-title'>
      <h4>{title}</h4>
      <div />
    </div>
  )
}

export default Title
