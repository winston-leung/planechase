import { useContext } from 'react';
import { PlanesContext } from './PlanesContext';
import './smallplane.css';
import useMountTransition from './useMoutTransition'

const SmallPlane = ({ planeId }) => {
  const { state } = useContext(PlanesContext)

  // check if the component is mounted and apply a transition
  // not in use currently
  const isMounted = Boolean(planeId || planeId === 0);
  const hasTransitionedIn = useMountTransition(isMounted, 500);

  // extract the chaos text if it exists
  const chaosIndex = state.planes[planeId].oracle_text.indexOf("Whenever chaos ensues")
  let oracleText = "";
  let chaosText = "";
  if (chaosIndex !== -1) {
    oracleText = state.planes[planeId].oracle_text.slice(0, chaosIndex);
    chaosText = state.planes[planeId].oracle_text.slice(chaosIndex)
  } else {
    oracleText = state.planes[planeId].oracle_text;
  }


  return (
    <a className={`main_card ${hasTransitionedIn && 'show'}`} href={`/plane/${state.planes[planeId].id}`} >
      <div className='main_card_border'>
        <div className='main_card_image move_up'>
          <img loading="lazy" src={state.planes[planeId].image_uris.small} alt={state.planes[planeId].name} />
        </div>
        <div className='main_card_textbox'>
          <p className='main_card_name move_up2'>
            {state.planes[planeId].name}
          </p>
          <p className='main_card_type move_up2'>
            Type: {state.planes[planeId].type_line}
          </p>
          <hr className='move_up2' />
          <div className='main_card_oracle move_up2'>
            <p>
              {oracleText}
            </p>
            {chaosIndex !== -1 && (
              <p>
                {chaosText}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

export default SmallPlane;