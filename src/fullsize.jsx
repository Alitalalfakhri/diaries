import {useNavigate} from 'react-router-dom'

export default function fullSize(props){
  const center = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
  const navigate = useNavigate()
  console.log(props)
  function returnHome(){

    navigate('/')
  }
  return(
    <>
      <div style={center}>
        <h1 style={{ color: '#9dbd00' }}>{props.data.date}</h1> 
      </div>
     <p>{props.data.diary}</p>
      <div style={center}>
        <button className='back-home' onClick={returnHome}>الصفحة الرئيسية</button>
      </div>

    </>

  )
}