import { FunctionComponent } from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

const Loading: FunctionComponent = (): JSX.Element => (
  <div className='loading'>
    <h4>rooms data loading....</h4>
    <img src={loadingGif} alt='' />
  </div>
)

export default Loading
