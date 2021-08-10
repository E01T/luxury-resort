import { FunctionComponent } from "react"

type props_type = {
  hero?: string
  children: React.ReactChild | React.ReactChild [],
}

const Hero: FunctionComponent<props_type> = ({ hero, children }): JSX.Element => <header className={hero || 'defaultHero'}>{children}</header>

export default Hero
