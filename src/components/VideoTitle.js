import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay , faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title , overview }) => {
    return <div className='px-24 absolute pt-[15%]  aspect-video bg-gradient-to-r from-black text-white '>
    <h1 className="font-bold text-3xl py-2 " >{title}</h1>
    <p className="text-lg w-1/3 py-2" >{overview}</p>
    <div>
        <button className='m-2 p-4 text-center px-12 w-auto text-lg bg-blue-500 text-white  hover:opacity-80 hover:text-black rounded-xl'>
        <FontAwesomeIcon icon={faPlay} className="mx-2" />
            Play
        </button>
        <button className='m-2 p-4 text-center px-12 w-auto text-lg bg-blue-200 text-black opacity-75 hover:bg-blue-500 hover:text-white rounded-xl'>
        <FontAwesomeIcon icon={faCircleInfo} className="mx-2" />
            More Info
        </button>
    </div>
    </div>
    }

export default VideoTitle;