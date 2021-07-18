import {useCallback} from 'react';
import {useEffect} from 'react';
const Alert = ({msg,alertMsg,timeOutNotification,alerts}) => {
	const data = useCallback(() => {

		setTimeout(()=>{
			timeOutNotification()
		},1800)
	},[timeOutNotification])		
 useEffect(()=> {
		data()
	},[alerts,data])
	return (
		<div style= {{marginBottom:'2.5rem'}} >
			<p className= {`alert alert-${alertMsg}`} >{msg}</p>
		</div>

		)
}
export default Alert;