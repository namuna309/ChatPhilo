import { useNavigate } from "react-router-dom";

function CounselorBox(props) {

    const navigate = useNavigate();
    
    function requsetChat(e) {
        fetch(`http://localhost:8080/c/request?csl=${props.counselor}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: 'include',
        })
        .then((res) => {return res.json()})
        .then((res) => {navigate(`?rid=${res}`)});
    }

    return (
        <div className='counselor-container'>
            <button type='button' className='counselor-box btn btn-dark' onClick={(e) => requsetChat(e)}>
                <div className='counselor-img-box btn'>
                    <div className='counselor-img'></div>
                </div>
                <div className='counselor-name'>
                    {props.counselor}
                </div>
                <div className='counselor-link-box'>
                    <div className='counselor-link-img'></div>
                </div>
            </button>
        </div>
    )
}

export default CounselorBox;